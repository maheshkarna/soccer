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

namespace TopScore
{
    /// <summary>
    /// Interaction logic for AdminLogin.xaml
    /// </summary>
    public partial class AdminLogin : Window
    {
        public string darkBg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\darkBg.png";

        public AdminLogin()
        {
            InitializeComponent();
            DataContext = this;
            Username.Focus();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (Username.Text != string.Empty && Password.Password != string.Empty)
                {

                    string databaseFilePath = Environment.CurrentDirectory + "\\Support Files\\SQLLiteDB\\TopScore.sqlite";

                    // Create a DatabaseHelper instance and execute a query
                    using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
                    {
                        string sql = "SELECT count(*) FROM UserLogins WHERE USERNAME='" + Username.Text + "' AND PASSWORD = '" + Password.Password + "'";
                        var count = dbHelper.ExecuteScalar(sql);
                        int data = Convert.ToInt32(count);
                        if (data > 0)
                        {
                            MessageBox.Show("Login Successful");
                            this.Hide();
                            AdminHome AdminHome = new AdminHome(Username.Text);
                            AdminHome.Show();
                        }
                        else
                        {
                            MessageBox.Show("Invalid Logins");
                        }

                    }
                }
                else if (Username.Text == string.Empty)
                {
                    MessageBox.Show("Enter Username");
                }
                else if (Password.Password == string.Empty)
                {
                    MessageBox.Show("Enter Password");
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);

            }

          
        }

        private void Username_TextChanged(object sender, TextChangedEventArgs e)
        {

        }

        private void Username_TextChanged_1(object sender, TextChangedEventArgs e)
        {

        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            try
            {
                MainWindow mainWindow = new MainWindow();
                this.Close();
                mainWindow.Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
          
        }
       
    }
}
