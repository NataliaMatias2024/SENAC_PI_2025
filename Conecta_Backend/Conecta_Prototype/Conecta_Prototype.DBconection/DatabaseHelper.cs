using Microsoft.Data.Sqlite;
using System.IO;
using System;

namespace Conecta_Prototype.DBconection
{
    public class DatabaseHelper
    {
        private string _dbPath;

        public DatabaseHelper(string dbName)
        {
            string baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
            _dbPath = Path.Combine(baseDirectory, dbName);
            CreateDatabase();
        }

        public void CreateDatabase()
        {
            Console.WriteLine("DatabaseHelper.CreateDatabase() called.");
            if (!File.Exists(_dbPath))
            {
                try
                {
                    using (var connection = new SqliteConnection($"Data Source={_dbPath}"))
                    {
                        connection.Open();
                    }
                    InitializeDatabase();
                }
                catch (SqliteException ex)
                {
                    Console.WriteLine($"Error creating database: {ex.Message}");
                    throw;
                }
            }
        }

        private void InitializeDatabase()
        {
            Console.WriteLine("DatabaseHelper.InitializeDatabase() called.");
            try
            {
                using (SqliteConnection connection = GetConnection())
                {
                    connection.Open();
                    string createTableQuery = @"
                CREATE TABLE IF NOT EXISTS PrestadoresDeServico (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    CPF TEXT UNIQUE NOT NULL,
                    CNPJ TEXT UNIQUE,
                    Nome TEXT NOT NULL,
                    Endereco TEXT NOT NULL,
                    AreasDeAtuacao TEXT NOT NULL,
                    ImagemLogo TEXT,
                    ImagensTrabalhos TEXT,
                    Cidade TEXT NOT NULL,
                    Estado TEXT NOT NULL,
                    Telefone TEXT,
                    Email TEXT NOT NULL,
                    Senha TEXT NOT NULL,
                    DataNascimento DATE NOT NULL,
                    Genero TEXT NOT NULL,
                    TelefoneCelular TEXT,
                    CEP TEXT NOT NULL
                    );
                ";
                    using (SqliteCommand command = new SqliteCommand(createTableQuery, connection))
                    {
                        command.ExecuteNonQuery();
                        Console.WriteLine("PrestadoresDeServico table created (or already exists).");
                    }
                }
            }
            catch (SqliteException ex)
            {
                Console.WriteLine($"Error initializing database: {ex.Message}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Error initializing database: {ex.Message}");
                throw;
            }
        }

        public SqliteConnection GetConnection()
        {
            return new SqliteConnection($"Data Source={_dbPath}");
        }

        public string GetDatabasePath()
        {
            return _dbPath;
        }
    }
}
