using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Linq;


namespace TopScore
{
    /// <summary>
    /// Interaction logic for ballsCount.xaml
    /// </summary>
    public partial class ballsCount : Window
    {
        private string playerName;
        public string continueImg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\continue.png";

        public string darkBg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\lightBg.jpg";

        public ballsCount(string playerName)
        {
            try
            {
                InitializeComponent();
                this.playerName = playerName;
                LoadData();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);

            }
        }

        private async void LoadData()
        {
            BallCountTextBox.Focus();

            await Dispatcher.InvokeAsync(() =>
            {
                DataContext = this;
            });
        }
        private void changeActiveColoClickOnNo(object sender, RoutedEventArgs e)
        {
            try
            {
                string textValue = ((TextBlock)sender).Tag.ToString();

                Color newColor = Colors.Green;
                SolidColorBrush activecolor = new SolidColorBrush(newColor);

                Color oldColor = Colors.LightSkyBlue;
                SolidColorBrush inactiveColor = new SolidColorBrush(oldColor);

                if (textValue == "5")
                {
                    ellipse5.Fill = activecolor;
                    ellipse10.Fill = inactiveColor;
                    ellipse15.Fill = inactiveColor;
                    BallCountTextBox.Text = "5";

                }

                if (textValue == "10")
                {
                    ellipse5.Fill = inactiveColor;
                    ellipse10.Fill = activecolor;
                    ellipse15.Fill = inactiveColor;
                    BallCountTextBox.Text = "10";

                }

                if (textValue == "15")
                {
                    ellipse5.Fill = inactiveColor;
                    ellipse10.Fill = inactiveColor;
                    ellipse15.Fill = activecolor;
                    BallCountTextBox.Text = "15";

                }
            }catch (Exception ex){
                MessageBox.Show(ex.Message);

            }
        }


        private void changeActiveColor(object sender, RoutedEventArgs e)
        {

            try
            {
                string tagValue = "";

                if (sender is Ellipse)
                {
                    tagValue = (string)((Ellipse)sender).Tag;
                    // Further processing for Ellipse
                }
                else if (sender is TextBlock)
                {
                    tagValue = (string)((TextBlock)sender).Tag;
                    // Further processing for TextBlock
                }


                /*string tagValue = (string)((Ellipse)sender).Tag;*/

                Color newColor = Colors.Green;
                SolidColorBrush activecolor = new SolidColorBrush(newColor);

                Color oldColor = Colors.LightSkyBlue;
                SolidColorBrush inactiveColor = new SolidColorBrush(oldColor);


                if (tagValue == "5")
                {
                    ellipse5.Fill = activecolor;
                    ellipse10.Fill = inactiveColor;
                    ellipse15.Fill = inactiveColor;
                    BallCountTextBox.Text = "5";

                }

                if (tagValue == "10")
                {
                    ellipse5.Fill = inactiveColor;
                    ellipse10.Fill = activecolor;
                    ellipse15.Fill = inactiveColor;
                    BallCountTextBox.Text = "10";

                }

                if (tagValue == "15")
                {
                    ellipse5.Fill = inactiveColor;
                    ellipse10.Fill = inactiveColor;
                    ellipse15.Fill = activecolor;
                    BallCountTextBox.Text = "15";

                }
            }
            catch (Exception ex){
                MessageBox.Show(ex.Message);

            }

        }

        static string[] GetMp4FileNames(string folderPath)
        {


            // Get all .mp4 file paths in the folder
            string[] mp4Files = Directory.GetFiles(folderPath, "*.mp4", SearchOption.TopDirectoryOnly);
            
            string[] fileNamesOnly = new string[mp4Files.Length];
            for (int i = 0; i < mp4Files.Length; i++)
            {
                fileNamesOnly[i] = System.IO.Path.GetFileName(mp4Files[i]);
            }

            return fileNamesOnly;
        
        }

        private void OnImageClick(object sender, RoutedEventArgs e)
        {
            nextScreen();
        }



        private void nextScreen()
        {
            try
            {

                string balCount = BallCountTextBox.Text;
                bool realVideos = true;
                bool animationVideos = true;
                string confirmMsg = string.Empty;

                string folderPath1 = Environment.CurrentDirectory + "\\Support Files\\Videos\\AnimatedVideos\\";
                string folderPath2 = Environment.CurrentDirectory + "\\Support Files\\Videos\\RealVideos\\";

                if (chkSecondTeam.IsChecked == false)
                {
                    realVideos = false;
                    if (balCount != "0")
                    {
                        PrintEllipseColors(balCount, animationVideos, realVideos);
                    }
                    else
                    {
                        MessageBox.Show("Please Select Balls");
                    }
                }

                else if (chkFirstTeam.IsChecked == false)
                {
                    if (Directory.Exists(folderPath1) && Directory.Exists(folderPath2))
                    {
                        string[] mp4Files1 = GetMp4FileNames(folderPath1);
                        string[] mp4Files2 = GetMp4FileNames(folderPath2);

                        if (mp4Files2.Length == mp4Files1.Length)
                        {
                            if (mp4Files1.SequenceEqual(mp4Files2))
                            {
                                animationVideos = false;
                                if (balCount != "0")
                                {
                                    PrintEllipseColors(balCount, animationVideos, realVideos);
                                }
                                else
                                {
                                    MessageBox.Show("Please Select Balls");
                                }
                            }
                            else
                            {
                                confirmMsg = "RealVideos Folder do not have the same File Names of .mp4 files.";
                                ConfirmPop(confirmMsg);
                            }
                        }
                        else
                        {
                            confirmMsg = "RealVideos Folder do not have requred number of Videos ";
                            ConfirmPop(confirmMsg);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void ConfirmPop(string msg)
        {
            try
            {
                string ballsCount = BallCountTextBox.Text;
                MessageBoxResult result = MessageBox.Show(msg + "Do you want to proceed With animated Videos?", "Confirmation", MessageBoxButton.YesNo, MessageBoxImage.Question);

                if (result == MessageBoxResult.Yes)
                {
                    if (ballsCount != "0")
                    {
                        PrintEllipseColors(ballsCount, true, false);
                    }
                    else
                    {
                        MessageBox.Show("Please Select Balls");
                    }
                }
            }
            catch (Exception ex) { 
                MessageBox.Show(ex.Message); 
            }
          
        }

        private void PrintEllipseColors(string e,bool animationVideos,bool realVideos )
        {
            try {
                this.Hide();
                PlayWindow playWindow = new PlayWindow(e, playerName, animationVideos, realVideos);
                playWindow.Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void CheckBox_Checked(object sender, RoutedEventArgs e)
        {

        }

        private void CheckBox_Checked_1(object sender, RoutedEventArgs e)
        {
          
        }

        private void ChkSecondTeam_OnChecked(object sender, RoutedEventArgs e)
        {
            try{

                if (chkSecondTeam.IsChecked ?? false)
                {
                    chkFirstTeam.IsChecked = false;
                }
                else
                {
                    chkFirstTeam.IsChecked = true;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }

        private void ChkFirstTeam_OnChecked(object sender, RoutedEventArgs e)
        {
            try{
                if (chkFirstTeam.IsChecked ?? false)
                {
                    chkSecondTeam.IsChecked = false;
                }
                else
                {
                    chkSecondTeam.IsChecked = true;
                }
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
           
        }

        private void BallCountTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            try
            {
                TextBox BallCountTextBox = (TextBox)sender;
                string text = BallCountTextBox.Text;

                // Use a regular expression to check if the text contains only numeric characters
                if (!Regex.IsMatch(text, "^[0-9]+$"))
                {
                    MessageBox.Show("Please enter only numeric values.");
                    BallCountTextBox.Text = string.Empty;
                }

            }
            catch(Exception ex)
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
                    UsernameWindow usernameWindow = new UsernameWindow();
                    this.Close();
                    usernameWindow.Show();
                }
                if (e.Key == Key.Enter) {

                    nextScreen();
                }
            }
            catch (Exception ex) { 
            MessageBox.Show(ex.Message);
            }
            
        }

        private void chkSecondTeam_Checked(object sender, RoutedEventArgs e)
        {

        }
    }
}
