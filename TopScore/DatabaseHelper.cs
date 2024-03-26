using System;
using System.Data;
using System.Data.SQLite;
using System.Windows;

public class DatabaseHelper : IDisposable
{
    private SQLiteConnection connection;

    public DatabaseHelper(string databaseFilePath)
    {
        // Set up the SQLite connection
        string connectionString = $"Data Source={databaseFilePath};Version=3;";
        connection = new SQLiteConnection(connectionString);
        connection.Open();
    }

    public void ExecuteNonQuery(string query)
    {
        using (SQLiteCommand command = new SQLiteCommand(query, connection))
        {
            command.ExecuteNonQuery();
        }
    }

    public object ExecuteScalar(string query)
    {
        using (SQLiteCommand command = new SQLiteCommand(query, connection))
        {
            return command.ExecuteScalar();
        }
    }

    public DataTable ExecuteQuery(string query)
    {
        DataTable dataTable = new DataTable();
        using (SQLiteCommand command = new SQLiteCommand(query, connection))
        {
            using (SQLiteDataAdapter adapter = new SQLiteDataAdapter(command))
            {
                adapter.Fill(dataTable);
            }
        }
        return dataTable;
    }

    public void Dispose()
    {
        if (connection.State != ConnectionState.Closed)
        {
            connection.Close();
        }
    }
}
