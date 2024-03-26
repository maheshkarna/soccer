using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.IO.Ports;
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
using System.Windows.Threading;
using System.IO;
using System.Reflection.Emit;

namespace TopScore
{
    public partial class PlayWindow : Window
    {
        private string databaseFilePath = Environment.CurrentDirectory + "\\Support Files\\SQLLiteDB\\TopScore.sqlite";
        private SerialPort serialPort;
        private SerialPort serialPort2;

        private BackgroundWorker closePortWorker;
        private int countdown = 0;
        private int status = 0;/// if it is 0 vidoe plays continuasly if 1 play single time   
        private int ballState = 0;
        private int comPOrtReadCount = 0;
        private int nextGoalTime = 0;
       
        private bool shouldRead = true; // For Manage Port Reading  
        private bool realVideos = true;
        private bool animatedVideos = true;
        private int resultVideoState = 0;
        private DispatcherTimer timer;
        private static Dictionary<string, byte[]> videoCache = new Dictionary<string, byte[]>();
        private bool screenSensarStatus = false; // to check Screen Sensor Status 
        private string ballPosition = ""; // to check Screen Sensor Status 
        private string videoDaivingpostion = ""; // to check Screen Sensor Status 


        public PlayWindow(string choosenBalls, string playerName,bool animationVideos, bool realVideoss)
        {
            InitializeComponent();
            SetInitialDatparameters(choosenBalls, playerName, animationVideos, realVideoss);
            StandingPosVideoPlay();
            StartReading_Click();
        }
      

        private void SetInitialDatparameters(string choosenBalls, string playerName, bool animationVideos, bool realVideoss)
        {
            BallsCount.Content = choosenBalls;
            PlayerName.Content = playerName;
            ChoosenBalls.Text = choosenBalls;
            animatedVideos = animationVideos;
            realVideos = realVideoss;
        }

        private void satartCountdown()
        {
            try {
                // Initialize the timer
                timer = new DispatcherTimer();
                timer.Interval = TimeSpan.FromSeconds(1);
                timer.Tick += Timer_Tick;
                countdown = 8;
                timer.Start();

            } catch (Exception ex) {
                MessageBox.Show(ex.Message);
            }
          
        }

        private void Timer_Tick(object sender, EventArgs e)
        {
            try
            {
                if (countdown >= 0)
                {
                    // Update the countdown text block
                    int timerCount = countdown - 5;
                    if (countdown > 5)
                    {
                        CountdownText.Foreground = Brushes.White;
                        CountdownText.Text = timerCount.ToString();
                    }
                    else if (countdown == 5)
                    {
                        CountdownText.Foreground = Brushes.DarkGreen;
                        CountdownText.Text = "Go!";
                    }
                    else if (countdown == 4)
                    {
                        CountdownText.Text = "Go!!";
                    }
                    else if (countdown <=3 && countdown >= 0)
                    {
                        CountdownText.Foreground = Brushes.Red;

                        CountdownText.Text = "Time Up !.";
                        if (countdown == 0)
                        {
                            countdown = 9;  // to restart the timer; 
                        }
                    }

                    countdown--;
                }
            }
            catch (Exception ex){ 
                 MessageBox.Show(ex.Message);
            }
        }

        private void StandingPosVideoPlay()
        {

            try
            {
                Mouse.OverrideCursor = Cursors.Wait;
               
                status = 0;
                string videoPath = string.Empty;

                if (animatedVideos)
                {
                    videoPath = Environment.CurrentDirectory + "\\Support Files\\Videos\\AnimatedVideos\\SP.mp4";
                }
                else if (realVideos)
                {
                    videoPath = Environment.CurrentDirectory + "\\Support Files\\Videos\\RealVideos\\SP.mp4";
                }

                // Check if the file exists before setting the source and playing the video
                if (File.Exists(videoPath))
                {
                    Panel.SetZIndex(backgroundVideo2, 0);
                    Panel.SetZIndex(backgroundVideo1, 0);
                    Panel.SetZIndex(backgroundVideo, 10);

                    backgroundVideo.Source = new Uri(videoPath, UriKind.RelativeOrAbsolute);
                    backgroundVideo.MediaEnded += BackgroundVideo_MediaEnded;
                    backgroundVideo.Play();
                    /*if (backgroundVideo.IsLoaded)
                    {
                        Mouse.OverrideCursor = Cursors.Arrow;
                    }*/
                    backgroundVideo.MediaOpened += MediaPlayer_opened;

                }
                else
                {
                    MessageBox.Show("Video file not found at the specified path.");
                   
                    this.Hide();
                    MainWindow mw = new MainWindow();
                    mw.Show();
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        
        }

        private void MediaPlayer_opened(object sender, RoutedEventArgs e)
        {
            Mouse.OverrideCursor = Cursors.Arrow;
           
        }

        private void GoalToGoalTimeGap(object sender, EventArgs e)
        {
            if (nextGoalTime > 0) {
                nextGoalTime--;
            }else if (nextGoalTime == 0)
            {
                
            }
        }


        /// <summary>
        /// KeyBoard Cliking Events 
        /// </summary>
        /// <param name="e"></param>
        protected override void OnKeyDown(KeyEventArgs e)
        {

            try
            {
                if (e.Key == Key.Escape)
                {
                    GameOver();
                }

                if (e.Key == Key.Down)
                {
                    ChangeVideo("SP.mp4");
                    satartCountdown();
                    status = 0;
                }

                if (e.Key == Key.P)
                {
                    PlayerScoreAdd();
                }

                if (e.Key == Key.K)
                {
                    KeeperScoreAdd();
                }
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
        


        /// <summary>
        /// To Adding A player Score 
        /// </summary>
        private void PlayerScoreAdd()
        {
            try
            {
                int playerScore = int.Parse(PlayerScore.Content.ToString());
                int ballsCount = int.Parse(BallsCount.Content.ToString());
                int result = 1;
                ResultVideosPlay(result);
                if (ballsCount > 0)
                {
                    PlayerScore.Content = (playerScore + 1).ToString();
                    BallsCount.Content = (ballsCount - 1).ToString();

                  /*  if (BallsCount.Content.ToString() == "0")
                    {
                        GameOver();
                    }*/
                }

                shouldRead = true;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
           
        }



        /// <summary>
        /// To Add A Keeper Score 
        /// </summary>
        private void KeeperScoreAdd()
        {
            try
            {
                int keeperScore = int.Parse(KeeperScore.Content.ToString());
                int balsCount = int.Parse(BallsCount.Content.ToString());

                if (balsCount > 0)
                {
                    KeeperScore.Content = (keeperScore + 1).ToString();
                    BallsCount.Content = (balsCount - 1).ToString();
                    int result = 0;
                    ResultVideosPlay(result);

                   /* if (BallsCount.Content.ToString() == "0")
                    {
                        GameOver();
                    }*/
                }
                shouldRead = true;
            }
            catch (Exception ex)
            {
               MessageBox.Show(ex.Message);
            }
         
        }


        /// <summary>
        /// Redirect The Screen To The Game Result After The Game Over  
        /// </summary>
        private void GameOver()
        {
            try
            {
                string? KeepScore = KeeperScore.Content.ToString();
                string? PlyScore = PlayerScore.Content.ToString();
                string? TotalBalls = ChoosenBalls.Text.ToString();
                string? PlyNameContent = PlayerName.Content.ToString();


                WinOverallReportScreen WinScreen = new WinOverallReportScreen(KeepScore, PlyScore, TotalBalls, PlyNameContent);
                this.Close();
                WinScreen.Show();
                if (serialPort.IsOpen)
                {
                    CloseSerialPort();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
           
        }


        private void ClosePortWorker_DoWork(object sender, DoWorkEventArgs e)
        {
            try
            {
                // Close the serial port on a separate thread
                if (serialPort.IsOpen)
                {
                    serialPort.Close();
                }
                // Close the serial port on a separate thread
                if (serialPort2.IsOpen)
                {
                    serialPort2.Close();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }

        private void CloseSerialPort()
        {
            try
            {
                // Start the BackgroundWorker to close the serial port
                if (!closePortWorker.IsBusy)
                {
                    closePortWorker.RunWorkerAsync();
                }

            }catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        /// <summary>
        /// Connectingm Sensor 
        /// </summary>
        private void StartReading_Click()
        {
            try
            {
                serialPort = new SerialPort();
                serialPort2 = new SerialPort();


                // Initialize the BackgroundWorker
                closePortWorker = new BackgroundWorker();
                closePortWorker.DoWork += ClosePortWorker_DoWork;
                // closePortWorker.RunWorkerCompleted += ClosePortWorker_RunWorkerCompleted;

               
                using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
                {
                    ///// Ball Sensor Port Details
                    string getPotsQry = "SELECT * FROM Sensors ORDER BY ID DESC";
                    DataTable result = dbHelper.ExecuteQuery(getPotsQry); 
                    if (result.Rows.Count > 0)
                    {
                        string? portName = result.Rows[0]["COMPORT"] as string;
                        int baudRate = int.Parse(result.Rows[0]["BAUDRATE"] as string);

                        serialPort.PortName = portName;
                        serialPort.BaudRate = baudRate;
                    }
                    else
                    {
                        MessageBox.Show("Plsese Set The Ball Sensor Comports");
                        this.Close();
                        AdminLogin adminLogin = new AdminLogin();
                        adminLogin.Show();
                    }
                    

                    /////Screen Sensor Port Details
                    string getPotsQry2 = "SELECT * FROM ScreenSensors ORDER BY ID DESC";
                    DataTable result2 = dbHelper.ExecuteQuery(getPotsQry2);
                    if (result2.Rows.Count > 0)
                    {
                        string? portName2 = result2.Rows[0]["COMPORT"] as string;
                        int baudRate2 = int.Parse(result2.Rows[0]["BAUDRATE"] as string);

                        serialPort2.PortName = portName2;
                        serialPort2.BaudRate = baudRate2;
                    }
                    else
                    {
                        MessageBox.Show("Plsese Set The Screen Sensor Comports ");
                        this.Close();
                        AdminLogin adminLogin = new AdminLogin();
                        adminLogin.Show();
                    }
                }
            
                if (!serialPort.IsOpen)
                {
                    serialPort.Open();
                    serialPort.DataReceived += SerialPort_DataReceived;
                }


                if (!serialPort2.IsOpen)
                {
                    //Nothing 
                    serialPort2.Open();
                    serialPort2.DataReceived += screenSensorSerialPort_DataReceived;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error connecting: {ex.Message}");

                MainWindow mw = new MainWindow();
                this.Hide();
                mw.Show();
            }
        }

        /// <summary>
        /// To Plyaying Videos Randomly 
        /// </summary>
        private void RandomVideoPlay()
        {
            try {
                string[] videoVal = { "RJ.mp4", "LJ.mp4", "UJ.mp4" };
                int IndexVal = videoVal.Length;
                Random random = new Random();
                int randomIndex = random.Next(IndexVal);
                ChangeVideo(videoVal[randomIndex]);
                status = 1;
                CountdownText.Text = "";
            }
            catch(Exception ex) {
                MessageBox.Show(ex.Message);
            }
        }

        private void ResultVideosPlay(int res)
        {
            try{
                CountdownText.Text = "";
                string resultVideoPath = string.Empty;
                if (res == 0)
                {
                   resultVideoPath = Environment.CurrentDirectory + "\\Support Files\\Videos\\ResulVideos\\NGOAL.mp4";
                }
                else if(res == 1)
                {
                   resultVideoPath = Environment.CurrentDirectory + "\\Support Files\\Videos\\ResulVideos\\GOAL.mp4";
                }

                
                Panel.SetZIndex(backgroundVideo, 0);
                Panel.SetZIndex(backgroundVideo1, 0);
                Panel.SetZIndex(backgroundVideo2, 10);

                this.UpdateLayout();

                backgroundVideo2.Source = new Uri(resultVideoPath, UriKind.RelativeOrAbsolute);
                backgroundVideo2.MediaEnded += BackgroundVideo_MediaEnded2;
                backgroundVideo2.Play();
                resultVideoState = 1;
            }
            catch(Exception e)
            {
                MessageBox.Show(e.Message);
            }
        }

        /// <summary>
        /// Plying Videos Where Gets From The Random Random Paths
        /// </summary>
        /// <param name="newVideoFileName"></param>
        private void ChangeVideo(string newVideoFileName)
        {
            try
            {
                if (newVideoFileName == "LJ.mp4")
                {
                    videoDaivingpostion = "1";
                }
                if (newVideoFileName == "UJ.mp4")
                {
                    videoDaivingpostion = "2";
                }
                if (newVideoFileName == "RJ.mp4")
                {
                    videoDaivingpostion = "3";
                }

                string newVideoPath = string.Empty;
                if (animatedVideos)
                {
                    //Animated Videos
                    newVideoPath = Environment.CurrentDirectory + "\\Support Files\\Videos\\AnimatedVideos\\" + newVideoFileName;
                }
                else if (realVideos)
                {
                    //Real Videos
                    newVideoPath = Environment.CurrentDirectory + "\\Support Files\\Videos\\RealVideos\\" + newVideoFileName;
                }

               /* backgroundVideo1.Visibility = Visibility.Visible;
                backgroundVideo.Visibility = Visibility.Hidden;// Hiding Standing video */
                Panel.SetZIndex(backgroundVideo1, 10);
                Panel.SetZIndex(backgroundVideo2, 0);
                Panel.SetZIndex(backgroundVideo, 0);
                

                backgroundVideo1.Source = new Uri(newVideoPath, UriKind.RelativeOrAbsolute);
                backgroundVideo1.MediaEnded += BackgroundVideo_MediaEnded1;
                backgroundVideo1.Play();
            }
             catch(Exception ex) {
                MessageBox.Show(ex.Message);
            }
        }


        private void BackgroundVideo_MediaEnded2(object sender, RoutedEventArgs e)
        {
            if (resultVideoState == 1)
            {
                try
                {
                    ballState = 0;
                    resultVideoState = 0;
                    Panel.SetZIndex(backgroundVideo1, 0);
                    Panel.SetZIndex(backgroundVideo2, 0);
                    Panel.SetZIndex(backgroundVideo, 10);

                    if (BallsCount.Content.ToString() == "0")
                    {
                        GameOver();
                    }

                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message);
                }
            }
        }
        private void BackgroundVideo_MediaEnded1(object sender, RoutedEventArgs e)
        {
            try
            {
             
                backgroundVideo1.Stop();

                if (!shouldRead)
                {
                    if (videoDaivingpostion != "" && ballPosition != "")
                    {
                        if ((ballPosition == "1" && videoDaivingpostion == "1") || (ballPosition == "2" && videoDaivingpostion == "2") || (ballPosition == "3" && videoDaivingpostion == "3"))
                        {
                            KeeperScoreAdd();
                        }
                        else
                        {
                            PlayerScoreAdd();
                        }
                        videoDaivingpostion = "";
                        ballPosition = "";
                    }
                    else
                    {
                        KeeperScoreAdd();
                    }
                }
               
                

            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void BackgroundVideo_MediaEnded(object sender, RoutedEventArgs e)
        {
            try
            {
                // Restart the video when it ends to create a continuous loop
                backgroundVideo.Position = TimeSpan.Zero;
                backgroundVideo.Play();
            }
             catch(Exception ex) {
                MessageBox.Show(ex.Message);
            }
        }


        private void screenSensorSerialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            try
            {
                int bytesToRead2 = serialPort2.BytesToRead;
                byte[] buffer2 = new byte[bytesToRead2];

                // Read data from the serial port
                serialPort2.Read(buffer2, 0, bytesToRead2);

                // Convert the received bytes to a string using ASCII encoding
                string screenSensorData = Encoding.ASCII.GetString(buffer2);

                // Dispatch UI update (if necessary) using Dispatcher.Invoke
                Dispatcher.Invoke(() =>
                {
                    if (screenSensorData != "" && screenSensarStatus == true)
                    {
                        ballPosition = screenSensorData;
                        screenSensarStatus = false;
                    }
                    // Process the received data here, update UI, etc.
                    // For example:
                    // UpdateUI(receivedData);
                });
            }
            catch(Exception ex)
            {
                MessageBox.Show($"Error processing data: {ex.Message}");
            }

        }

            /// <summary>
            /// Getting  Values From the COM port To Play Videos. in this method Here receivedData  values is 
            /// '1' then  ball is not on sensor if '0' then ball is on sensor 
            /// </summary>
            /// <param name="sender"></param>
            /// <param name="e"></param>
        private void SerialPort_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            try
            {
                int bytesToRead = serialPort.BytesToRead;
                byte[] buffer = new byte[bytesToRead];
                serialPort.Read(buffer, 0, bytesToRead);

                string receivedData = Encoding.ASCII.GetString(buffer);

                Dispatcher.Invoke(async () =>
                {
                    if (shouldRead)
                    {
                        if (receivedData == "0")
                        {
                            if (ballState == 0)
                            {
                                ballState = 1;

                                if (comPOrtReadCount == 0)
                                {
                                    CountdownText.Text = "";
                                    satartCountdown();
                                } 
                            }
                            comPOrtReadCount++;
                        }
                    }

                    if (receivedData == "1")
                    {
                        if (ballState == 0)
                        {
                            CountdownText.Text = "Please Keep The Ball on Sensor";
                            CountdownText.Foreground = new SolidColorBrush(Colors.White);
                        }

                        if (ballState == 1 && comPOrtReadCount > 0 && countdown >= 3)
                        {
                            screenSensarStatus = true;
                            shouldRead = false;
                            RandomVideoPlay();
                            CountdownText.Text = "";
                            countdown = 0;
                            comPOrtReadCount = 0;
                            timer.Stop();
                            /*await Task.Delay(5000);
                            DecisionPending();*/
                        }

                        if (ballState == 1 && comPOrtReadCount > 0 && countdown <= 2 && countdown >= 0)
                        {
                            comPOrtReadCount = 0;
                            countdown = 0;
                            timer.Stop();
                            KeeperScoreAdd();
                            CountdownText.Text = "Attention: This is Paul. Play in time!";
                            CountdownText.Foreground = Brushes.Red;
                            await Task.Delay(3000);
                            ballState = 0;
                        }
                    }
                });
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error processing data: {ex.Message}");
            }
        }
    }
}

