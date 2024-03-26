using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Data;
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


namespace TopScore
{
    public partial class SiteInfo : Window
    {
        string Username = "";
        public string darkBg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\darkBg.png";
        public SiteInfo(string username)
        {
            InitializeComponent();
            Username = username;
            DataContext = this;
            displyEditData();
        }

        private void displyEditData()
        {
            try
            {
                string databaseFilePath = Environment.CurrentDirectory + "\\Support Files\\SQLLiteDB\\TopScore.sqlite";
                using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
                {
                    string sql = "SELECT * FROM SiteInfo ORDER BY ID DESC LIMIT 1";
                    DataTable result = dbHelper.ExecuteQuery(sql);
                    string? logopath = result.Rows[0]["IMAGE"].ToString();
                    string? WelcomeText = result.Rows[0]["WLCMLINEONE"].ToString();
                    string? WelcomeText2 = result.Rows[0]["WLCMLINETWO"].ToString();
                    WelNote.Text = WelcomeText;
                    WelNote2.Text = WelcomeText2;
                }
            }
            catch (Exception ex){
                MessageBox.Show(ex.Message);
            }
        }

        private void UploadImageButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                OpenFileDialog openFileDialog = new OpenFileDialog
                {
                    Title = "Select an Image",
                    Filter = "Image Files (*.png; *.jpg; *.jpeg; *.gif; *.bmp)|*.png; *.jpg; *.jpeg; *.gif; *.bmp|All Files (*.*)|*.*"
                };

                if (openFileDialog.ShowDialog() == true)
                {
                    string selectedImagePath = openFileDialog.FileName;

                    LogoImage.Text = selectedImagePath.ToString();
                }
            }catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void DisplayImage(string imagePath)
        {
            try
            {
                string fileName = System.IO.Path.GetFileName(imagePath);
                string destinationFolderPath = Environment.CurrentDirectory + "\\Support Files\\Images\\";
                // Combine the destination folder path with the file name
                string destinationFilePath = System.IO.Path.Combine(destinationFolderPath, fileName);

                // Copy the file to the destination folder
                if(System.IO.File.Exists(destinationFilePath) == false)
                {
                    System.IO.File.Copy(imagePath, destinationFilePath, true);
                }
                LogoImage.Text = fileName;
            }  
            catch (Exception ex)
            {
                MessageBox.Show("Error displaying/moving the image: " + ex.Message);
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                string image = LogoImage.Text;
                string welnote = WelNote.Text;
                string wlcmLineTwo = WelNote2.Text;

                if (image != string.Empty && welnote != string.Empty)
                {
                    string databaseFilePath = Environment.CurrentDirectory + "\\Support Files\\SQLLiteDB\\TopScore.sqlite";

                    // Create a DatabaseHelper instance and execute a query
                    using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
                    {
                        DisplayImage(image);
                        string destImage = LogoImage.Text;
                        string sql = "UPDATE SiteInfo SET WLCMLINEONE = '" + welnote + "', WLCMLINETWO = '" + wlcmLineTwo + "',IMAGE = '" + destImage + "'";
                        dbHelper.ExecuteNonQuery(sql);
                        MessageBox.Show("Data Saved Successfully");
                        this.Hide();
                        AdminHome adminHome = new AdminHome("");
                        adminHome.Show();
                    }
                }
                else if (image == string.Empty)
                {
                    MessageBox.Show("Please Select Image");
                }
                else if (welnote == string.Empty)
                {
                    MessageBox.Show("Please Enter Welcome Note");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
           
        }


        protected override void OnKeyDown(KeyEventArgs e)
        {
            try
            {
                if (e.Key == Key.Escape)
                {
                    AdminHome AHome = new AdminHome(Username);
                    this.Close();
                    AHome.Show();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void CancelPage(object sender, RoutedEventArgs e)
        {
            try
            {
                AdminHome AHome = new AdminHome(Username);
                this.Close();
                AHome.Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
    }
}

