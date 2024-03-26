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
using System.IO;


namespace TopScore
{

/// <summary>
/// Interaction logic for UsernameWindow.xaml
/// </summary>
public partial class UsernameWindow : Window
    {


        #region PRIVATE VARIABLES & CONSTANT
        public string continueImg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\continue.png";
        public string darkBg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\darkBg.jpg";

        #endregion
        public UsernameWindow()
        {
            InitializeComponent();
            PlayerNameTextBox.Focus();
            DataContext = this;

        }

        private void OnImageClick(object sender, MouseButtonEventArgs e)
        {
            nextScreen();

        }

        private void nextScreen()
        {
            try
            {  // Your code for the image click event goes here
                string playerName = PlayerNameTextBox.Text;
                if (playerName != "")
                {
                    ballsCount ballsCount = new ballsCount(playerName);
                    this.Close();
                    ballsCount.Show();
                }
                else
                {
                    MessageBox.Show("Please Enter Plyer Name");
                }

            }
            catch (Exception ex)
            {

                MessageBox.Show(ex.Message);
            }
        }

        protected override void OnKeyDown(KeyEventArgs e)
        {
            try {
                if (e.Key == Key.Escape)
                {
                    MainWindow main = new MainWindow();
                    this.Close();
                    main.Show();
                }
                if (e.Key == Key.Enter) {
                    nextScreen();
                }
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
           
        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {

        }
    }
}
