using System.Data;
using System.Data.SQLite;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.IO;


namespace TopScore
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        #region PRIVATE VARIABLES & CONSTANT
        public string appLogoPath { get; set; }
        public string powerBtn { get; set; }
        public string darkBg { get; set; }
        #endregion

        public MainWindow()
        {
            InitializeComponent();
            Dispatcher.Invoke(new Action(() => {
                InitializeDatabase();
                DataContext = this;
                LogoAndWelcomTextDetails();
            }));
           
        }

        protected override void OnKeyDown(KeyEventArgs e)
        {
            try
            {
                if (e.Key == Key.Escape)
                {
                    this.Close();
                }
                  

                if(e.Key == Key.Enter)
                {
                    nextScreen();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void LogoAndWelcomTextDetails()
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

                    appLogoPath = Environment.CurrentDirectory + "\\Support Files\\Images\\" + logopath;
                    WelcomTextLine1.Text = WelcomeText;
                    WelcomTextLine2.Text = WelcomeText2;

                }
                powerBtn = Environment.CurrentDirectory + "\\Support Files\\Images\\powerBtn.png";
                darkBg = Environment.CurrentDirectory + "\\Support Files\\Images\\darkBg.jpg";
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }


        private void InitializeDatabase()
        {
            try
            {
                // Creating Database File 
                string dbFolderPath = Environment.CurrentDirectory + "\\Support Files\\SQLLiteDB\\";
                string databasePath = System.IO.Path.Combine(dbFolderPath, "TopScore.sqlite");

                if (!File.Exists(databasePath))
                {
                    SQLiteConnection.CreateFile(databasePath);
                }

                string databaseFilePath = dbFolderPath + "TopScore.sqlite";

                // Creating Require Tables in In Database
                using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
                {
                    string ScoreDetailsTab = "CREATE TABLE IF NOT EXISTS ScoreDetails  (ID INTEGER PRIMARY KEY AUTOINCREMENT, PLAYER_NAME TEXT, P_SCORE TEXT, K_SCORE TEXT, BALLS TEXT, DATE TEXT)";
                    dbHelper.ExecuteNonQuery(ScoreDetailsTab);
                    dbHelper.ExecuteNonQuery("CREATE TABLE IF NOT EXISTS UserLogins (Id INTEGER PRIMARY KEY, USERNAME TEXT, PASSWORD TEXT)");
                    dbHelper.ExecuteNonQuery("CREATE TABLE IF NOT EXISTS Sensors (Id INTEGER PRIMARY KEY, BAUDRATE TEXT, COMPORT TEXT)");
                    dbHelper.ExecuteNonQuery("CREATE TABLE IF NOT EXISTS ScreenSensors (Id INTEGER PRIMARY KEY, BAUDRATE TEXT, COMPORT TEXT)");

                    dbHelper.ExecuteNonQuery("CREATE TABLE IF NOT EXISTS License (ID INTEGER PRIMARY KEY, KEYID TEXT)");
                    dbHelper.ExecuteNonQuery("CREATE TABLE IF NOT EXISTS SiteInfo (ID INTEGER PRIMARY KEY, WLCMLINEONE TEXT,WLCMLINETWO TEXT, IMAGE TEXT)");

                    var count = dbHelper.ExecuteScalar("SELECT count(*) FROM SiteInfo");
                    int data = Convert.ToInt32(count);

                    if (data == 0)
                    {
                        string InsQry = "INSERT INTO SiteInfo (WLCMLINEONE,WLCMLINETWO, IMAGE) VALUES('Welcome to Top score sports','Lets see how much you can score','" + Environment.CurrentDirectory + "\\images\\topscore.png')";
                        dbHelper.ExecuteNonQuery(InsQry);
                    }

                    var Logcount = dbHelper.ExecuteScalar("SELECT count(*) FROM UserLogins");
                    int Logdata = Convert.ToInt32(count);

                    if (Logdata == 0)
                    {
                        string InsQry = "INSERT INTO UserLogins (USERNAME,PASSWORD) VALUES('Admin','123456')";
                        dbHelper.ExecuteNonQuery(InsQry);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            } 
        }


        private void OnImageClick(object sender, MouseButtonEventArgs e)
        {
            nextScreen();
        }

        private void nextScreen()
        {
            try
            {
                /*  Serial_Port Serial_Port = new Serial_Port();
                  this.Close();
                  Serial_Port.Show();*/
                UsernameWindow usernameWindow = new UsernameWindow();
                this.Close();
                usernameWindow.Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void AdminLogin(object sender, RoutedEventArgs e)
        {
            try
            {
                this.Hide();
                AdminLogin adminLogin = new AdminLogin();
                adminLogin.Show();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
          
        }

      
    } 
}