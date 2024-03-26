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
    /// Interaction logic for WinOverallReportScreen.xaml
    /// </summary>
    public partial class WinOverallReportScreen : Window
    {
        private string databaseFilePath = Environment.CurrentDirectory + "\\Support Files\\SQLLiteDB\\TopScore.sqlite";
        public string continueImg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\continue.png";
        public string darkBg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\darkBg.jpg";

       
        public WinOverallReportScreen(string kps, string pls, string tb, string playerName)
        {
            InitializeComponent();
            DataContext = this;
            displyeScore(kps,pls,tb,playerName);
        }

        private void displyeScore(string kps, string pls, string tb, string playerName)
        {
            string Img = "";
            string WinStatus = "";
            int ks = int.Parse(kps);
            int ps = int.Parse(pls);


            if (ks < ps)
            {
                WinStatus = "Congratulations " + playerName + " You Won The Match!";
                Img = "Win.png";
            }
            else
            {
                WinStatus = "Ooh...! You lost the match, " + playerName + ". Better luck next time";

                Img = "Lose.png";
            }

            string imagePath = Environment.CurrentDirectory + "\\Support Files\\Images\\" + Img;
            WinStatusImage.Source = new BitmapImage(new Uri(imagePath));
            WinStatusContent.Text = WinStatus;
            PlayerScr.Text = ps.ToString();
            KeeperScr.Text = ks.ToString();
            TotalBalls.Text = tb;



            using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
            {
                string ScoreDetailsTab = "INSERT INTO ScoreDetails (PLAYER_NAME, P_SCORE, K_SCORE, BALLS, DATE) VALUES ('" + playerName + "', '" + ps + "', '" + ks + "', '" + tb + "', CURRENT_DATE)";
                dbHelper.ExecuteNonQuery(ScoreDetailsTab);
            }
        }


        protected override void OnKeyDown(KeyEventArgs e)
        {
            try
            {
              
                if (e.Key == Key.Enter)
                {
                    mainScreen();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }



        private void Button_Click(object sender, RoutedEventArgs e)
        {
            mainScreen();
        }

        private void mainScreen()
        {
            MainWindow window = new MainWindow();
            this.Close();
            window.Show();
        }
    }
}
