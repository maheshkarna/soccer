using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Management;
using System.Security.Cryptography;
using System.IO;

namespace TopScore
{
    /// <summary>
    /// Interaction logic for LicenseWindow.xaml
    /// </summary>
    public partial class LicenseWindow : Window
    {
        string Username = "";
        public LicenseWindow(string username)
        {
            InitializeComponent();
            string systemUUID = GetSystemUUID();
            string encryptedUUID = EncryptionHelper.Encrypt(systemUUID);
            midTextbox.Text = encryptedUUID;

            string decryptedText = EncryptionHelper.Decrypt(encryptedUUID);
        }

        static string GetSystemUUID()
        {
            try
            {
                using (ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT UUID FROM Win32_ComputerSystemProduct"))
                using (ManagementObjectCollection collection = searcher.Get())
                {
                    foreach (ManagementObject obj in collection)
                    {
                        return obj["UUID"].ToString();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }

            return "System UUID not found";
        }

        private void nextBtn_Click(object sender, RoutedEventArgs e)
        {
            nextBtn.Visibility = Visibility.Collapsed;
            keyLabel.Visibility = Visibility.Visible;
            keyTextbox.Visibility = Visibility.Visible;
            saveBtn.Visibility = Visibility.Visible;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            // Get the text from the TextBox
            string textToCopy = midTextbox.Text;

            // Check if the text is not empty
            if (!string.IsNullOrEmpty(textToCopy))
            {
                // Copy the text to the clipboard
                Clipboard.SetText(textToCopy);
                MessageBox.Show("Text copied to clipboard: " + textToCopy);
            }
            else
            {
                MessageBox.Show("No text to copy.");
            }
        }
        public class EncryptionHelper
        {
            private const string EncryptionKey = "jbvojsv7y08ds7y08dghsdbu*&(^*^%$^#$fhdkjvhbf7686JGVFKHkjnflkvb"; // Replace with your own key
            private const string InitializationVector = "1234567890123456"; // Replace with your own IV

            public static string Encrypt(string plainText)
            {
                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Key = Encoding.UTF8.GetBytes(EncryptionKey.Take(32).ToArray());
                    aesAlg.IV = Encoding.UTF8.GetBytes(InitializationVector);

                    ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                    using (MemoryStream msEncrypt = new MemoryStream())
                    {
                        using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        {
                            using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                            {
                                swEncrypt.Write(plainText);
                            }
                        }
                        return Convert.ToBase64String(msEncrypt.ToArray());
                    }
                }
            }

            public static string Decrypt(string cipherText)
            {
                using (Aes aesAlg = Aes.Create())
                {
                    aesAlg.Key = Encoding.UTF8.GetBytes(EncryptionKey.Take(32).ToArray());
                    aesAlg.IV = Encoding.UTF8.GetBytes(InitializationVector);

                    ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                    using (MemoryStream msDecrypt = new MemoryStream(Convert.FromBase64String(cipherText)))
                    {
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                            {
                                return srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
            }
        }

        private void saveBtn_Click(object sender, RoutedEventArgs e)
        {
            string KeyID = keyTextbox.Text;
            if (KeyID != string.Empty)
            {
                string databaseFilePath = Environment.CurrentDirectory + "\\Support Files\\SQLLiteDB\\TopScore.sqlite";

                // Create a DatabaseHelper instance and execute a query
                using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
                {
                    string sql = "INSERT INTO License (KEYID) VALUES('" + KeyID + "')";
                    dbHelper.ExecuteNonQuery(sql);
                    MessageBox.Show("Data Saved Successfully");
                    keyTextbox.Text = "";
                    midTextbox.Text = "";
                    this.Hide();
                    AdminHome adminHome = new AdminHome("");
                    adminHome.Show();
                }
            }
            else if (KeyID == string.Empty)
            {
                MessageBox.Show("Please Enter The Key ID");
                keyTextbox.Focus();
            }
        }

        protected override void OnKeyDown(KeyEventArgs e)
        {
            if (e.Key == Key.Escape)
            {
                AdminHome AHome = new AdminHome(Username);
                this.Close();
                AHome.Show();
            }
        }
    }
}
