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
    /// <summary>
    /// Interaction logic for GameDetails.xaml
    /// </summary>
    public partial class GameDetails : Window
    {
        private string databaseFilePath = Environment.CurrentDirectory + "\\Support Files\\SQLLiteDB\\TopScore.sqlite";
        public string darkBg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\darkBg.png";
        
        private string Username = "";
        public GameDetails(string username)
        {
            InitializeComponent();
            DataContext = this;

            Username   = username;
            ToDate.SelectedDate = DateTime.Today;
            FromDate.SelectedDate = DateTime.Today;
           
            BallsDopdown();
            ShowScoreData();
        }

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
           
        }
        protected override void OnKeyDown(KeyEventArgs e)
        {
            try {
                if (e.Key == Key.Escape)
                {
                    AdminHome AHome = new AdminHome(Username);
                    this.Close();
                    AHome.Show();
                }
            }
            catch(Exception ex) {
                MessageBox.Show(ex.Message);
            }
           
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            ShowScoreData();
        }

        private void ShowScoreData()
        {

            try {
                string ToDateVal = ToDate.SelectedDate?.ToString("yyyy-MM-dd");
                string FromDateVal = FromDate.SelectedDate?.ToString("yyyy-MM-dd");

                // To get the selected value from ComboBox
                ComboBoxItem selectedComboBoxItem = (ComboBoxItem)BallsComboBox.SelectedItem;
                string selectedBalls = selectedComboBoxItem != null ? selectedComboBoxItem.Content.ToString() : "";

                string BallsConn = "";

                if (selectedBalls != "All")
                {
                    BallsConn = "Where BALLS = '" + selectedBalls + "' and";
                }
                else
                {
                    BallsConn = "Where";
                }
                string SelGameDetails = "Select * From ScoreDetails  " + BallsConn + "  DATE BETWEEN '" + FromDateVal + "' AND '" + ToDateVal + "' ";
                string GetCountOfGames = "SELECT COUNT(BALLS) as GameCount FROM ScoreDetails " + BallsConn + "  DATE BETWEEN '" + FromDateVal + "' AND '" + ToDateVal + "'";

                using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
                {
                    DataTable result = dbHelper.ExecuteQuery(SelGameDetails);

                    for (int i = 0; i < result.Rows.Count; i++)
                    {
                        result.Rows[i]["ID"] = i + 1;
                    }

                    gameDetailsDataGrid.ItemsSource = result.DefaultView;

                    DataTable getCount = dbHelper.ExecuteQuery(GetCountOfGames);
                    if (getCount.Rows.Count > 0)
                    {
                        string gameCount = getCount.Rows[0]["GameCount"].ToString();
                        TotalGamesPlayed.Content = gameCount;
                    }
                    else
                    {
                        TotalGamesPlayed.Content = "0";
                    }

                }

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }


        private void BallsDopdown()
        {
            try {

                using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
                {
                    DataTable result = dbHelper.ExecuteQuery("SELECT DISTINCT(BALLS) FROM ScoreDetails");

                    BallsComboBox.Items.Clear();
                    ComboBoxItem allItem = new ComboBoxItem { Content = "All", Tag = "All" };
                    BallsComboBox.Items.Add(allItem);

                    foreach (DataRow row in result.Rows)
                    {
                        string ballValue = row["BALLS"].ToString();
                        ComboBoxItem newItem = new ComboBoxItem { Content = ballValue, Tag = ballValue };
                        BallsComboBox.Items.Add(newItem);
                    }
                    BallsComboBox.SelectedIndex = 0;

                }

            } catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
          

        } 
     
    }
}