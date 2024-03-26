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
    /// Interaction logic for AdminHome.xaml
    /// </summary>
    public partial class AdminHome : Window
    {
        private string Username = "";
        public string darkBg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\darkBg.png";
        public AdminHome(string username)
        {
            InitializeComponent();
            Username = username;
            DataContext = this;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                this.Hide();
                LicenseWindow licenseWindow = new LicenseWindow(Username);
                licenseWindow.Show();
            }
            catch(Exception ex) 
            {
                MessageBox.Show(ex.Message);
            }
           
        }

        /// <summary>
        /// <Added By Mahesh>This 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            try
            {
                this.Hide();
                SensorWindow sensorWindow = new SensorWindow(Username);
                sensorWindow.Show();
            }
            catch (Exception ex)
            {
                HandleException(ex);
            }
           
        }

        private void HandleException(Exception ex)
        {
            MessageBox.Show(ex.Message);
        }
        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            try
            {
              GameDetails gameDetails = new GameDetails(Username);
                  this.Hide();
                  gameDetails.Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
          
        }



        private void Button_Click_3(object sender, RoutedEventArgs e)
        {
            try
            {
                this.Hide();
                SiteInfo siteInfo = new SiteInfo(Username);
                siteInfo.Show();
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
                    AdminLogin AHome = new AdminLogin();
                    this.Close();
                    AHome.Show();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
           
        }

        private void screenSensorConfig(object sender, RoutedEventArgs e)
        {
            try
            {
                this.Hide();
                ScreenSensor ss = new ScreenSensor(Username);
                ss.Show();
            }
            catch (Exception ex)
            {
                HandleException(ex);
            }
        }
    }
}
