using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.IO.Ports;
using System.Data;


namespace TopScore
{
    /// <summary>
    /// Interaction logic for SensorWindow.xaml
    /// </summary>
    public partial class SensorWindow : Window
    {

        string Username = "";
        private string databaseFilePath = Environment.CurrentDirectory + "\\Support Files\\SQLLiteDB\\TopScore.sqlite";
        public string darkBg { get; set; } = Environment.CurrentDirectory + "\\Support Files\\Images\\darkBg.png";
        public SensorWindow(string username)
        {
            InitializeComponent();
            DataContext = this;
            Username = username;
            SetComboBoxValues();
            CheckVailablePortsData();
        }

        /// <summary>
        /// This Method Will Adds the Available COM ports to COM Port Dropdown
        /// </summary>
        private void SetComboBoxValues()
        {
            try
            {
                List<string> availableComPorts = GetAvailableComPorts();
                foreach (string comPort in availableComPorts)
                {
                    ComPort.Items.Add(comPort);
                }
            } catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
           
        }

        private void CheckVailablePortsData()
        {
            try
            {
                using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
                {
                    DataTable result = dbHelper.ExecuteQuery("SELECT * FROM Sensors LIMIT 1");

                    if (result.Rows.Count > 0)
                    {
                        DataRow row = result.Rows[0];

                        string port = row[1].ToString();
                        string baudRate = row[2].ToString();

                        // Set selected value using SelectedValuePath
                        ComPort.SelectedValue = port;
                        BaudRate.SelectedValue = baudRate;
                        hiddenId.Text = row[0].ToString();
                        SaveBtn.Content = "Update";
                        // Set selected index if exact match is not found
                        if (ComPort.SelectedValue == null && ComPort.Items.Contains(port))
                        {
                            ComPort.SelectedIndex = ComPort.Items.IndexOf(port);
                        }

                        if (BaudRate.SelectedValue == null && BaudRate.Items.Contains(baudRate))
                        {
                            BaudRate.SelectedIndex = BaudRate.Items.IndexOf(baudRate);
                        }
                    }
                }
            }
            catch (Exception ex) {
                MessageBox.Show(ex.Message);
            }
        }
        private List<string> GetAvailableComPorts()
        {
            List<string> availableComPorts = new List<string>();

            // Get a list of all available COM ports
            string[] comPorts = SerialPort.GetPortNames();

            // Check if each COM port is available
            foreach (string comPort in comPorts)
            {
               availableComPorts.Add(comPort);
            }

            return availableComPorts;
        }


        private void CheckConnection(object sender, RoutedEventArgs e)
        {
            try
            {
                string? selectedComPort = ComPort.SelectedItem as string;
                ComboBoxItem baudRateItem = (ComboBoxItem)BaudRate.SelectedItem;
                string? selectedBaudRate = baudRateItem != null ? baudRateItem.Content.ToString() : "";
                SerialPort serialPort = new SerialPort(selectedComPort, int.Parse(selectedBaudRate));

                serialPort.Open();
                if (serialPort.IsOpen)
                {
                    MessageBox.Show("Serial port is connected.");
                    serialPort.Close();
                }
                else
                {
                    MessageBox.Show("Serial port is Not Connected.");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Exception Occured Serial port Connection Failed."+ex.Message);
            }

        }


        private void Button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                string? selectedComPort = ComPort.SelectedItem as string;
                string? selectedBaudRate = BaudRate.SelectedValue.ToString();
                string Qry = "";

                if (selectedComPort != string.Empty && selectedBaudRate != string.Empty)
                {

                    // Create a DatabaseHelper instance and execute a query
                    using (DatabaseHelper dbHelper = new DatabaseHelper(databaseFilePath))
                    {
                        if (hiddenId.Text == "" || hiddenId.Text == "0")
                        {
                            Qry = "INSERT INTO Sensors (BAUDRATE,COMPORT) VALUES('" + selectedBaudRate + "','" + selectedComPort + "')";
                        }
                        else
                        {
                            Qry = "UPDATE Sensors SET BAUDRATE = '" + selectedBaudRate + "', COMPORT = '" + selectedComPort + "' WHERE ID = " + hiddenId.Text;

                        }

                        dbHelper.ExecuteNonQuery(Qry);

                        MessageBox.Show("Data Saved Successfully");
                        GOBackScreen();
                    }
                }
                else if (selectedComPort == "")
                {
                    MessageBox.Show("Please Select Com Port");
                    BaudRate.Focus();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            } 
        }

        private void BaudRate_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }

        protected override void OnKeyDown(KeyEventArgs e)
        {
            if (e.Key == Key.Escape)
            {
                GOBackScreen();
            }
        }


        private void GOBackScreen()
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
