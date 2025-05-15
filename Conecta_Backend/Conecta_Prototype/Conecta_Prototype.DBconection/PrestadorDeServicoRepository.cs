using Conecta_Prototype.Application.Interfaces;
using Conecta_Prototype.Domain.Entities;
using Microsoft.Data.Sqlite;
using System;
using System.IO;
using System.Linq;

namespace Conecta_Prototype.DBconection
{
    public class PrestadorDeServicoRepository : IPrestadorDeServicoRepository
    {
        private readonly string _dbPath;
        private readonly string _imagesDirectory;

        public PrestadorDeServicoRepository(DatabaseHelper dbHelper)
        {
            _dbPath = dbHelper.GetDatabasePath();
            if (!File.Exists(_dbPath))
            {
                dbHelper.CreateDatabase();
            }
            _imagesDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "uploads");
            if (!Directory.Exists(_imagesDirectory))
            {
                Directory.CreateDirectory(_imagesDirectory);
            }
        }

        public PrestadorDeServico GetById(int id)
        {
            using (SqliteConnection connection = new SqliteConnection($"Data Source={_dbPath}"))
            {
                connection.Open();
                string query = @"
                SELECT Id, CPF, CNPJ, Nome, Endereco, AreasDeAtuacao, ImagemLogo, ImagensTrabalhos, Cidade, Estado, Telefone, Email, Senha, DataNascimento, Genero, TelefoneCelular, CEP
                FROM PrestadoresDeServico
                WHERE Id = @Id;
            ";
                using (SqliteCommand command = new SqliteCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", id);
                    using (SqliteDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return new PrestadorDeServico
                            {
                                Id = reader.GetInt32(0),
                                CPF = reader.GetString(1),
                                CNPJ = reader.GetString(2),
                                Nome = reader.GetString(3),
                                Cidade = reader.GetString(4),
                                Estado = reader.GetString(5),
                                Telefone = reader.GetString(6),
                                Email = reader.GetString(7),
                                Senha = reader.GetString(8),
                                DataNascimento = reader.GetString(9),
                                Genero = reader.GetString(10),
                                TelefoneCelular = reader.GetString(11),
                                CEP = reader.GetString(12),
                                Endereco = reader.GetString(13),
                                AreasDeAtuacao = reader.GetString(14).Split(',').ToList(),
                                ImagemLogo = reader.IsDBNull(15) ? null : reader.GetString(15),
                                ImagensTrabalhos = reader.IsDBNull(16) ? null : reader.GetString(16).Split(',').ToList()
                            };
                        }
                        else
                        {
                            return null;
                        }
                    }
                }
            }
        }
        public List<PrestadorDeServico> GetPS()
        {
            List<PrestadorDeServico> prestadores = new List<PrestadorDeServico>();
            using (SqliteConnection connection = new SqliteConnection($"Data Source={_dbPath}"))
            {
                connection.Open();
                string query = @"
                    SELECT Id, CPF, CNPJ, Nome, Endereco, AreasDeAtuacao, ImagemLogo, ImagensTrabalhos, Cidade, Estado, Telefone, Email, Senha, DataNascimento, Genero, TelefoneCelular, CEP
                    FROM PrestadoresDeServico;
                ";
                using (SqliteCommand command = new SqliteCommand(query, connection))
                {
                    using (SqliteDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            prestadores.Add(new PrestadorDeServico
                            {
                                Id = reader.GetInt32(0),
                                CPF = reader.GetString(1),
                                CNPJ = reader.GetString(2),
                                Nome = reader.GetString(3),
                                Cidade = reader.GetString(4),
                                Estado = reader.GetString(5),
                                Telefone = reader.GetString(6),
                                Email = reader.GetString(7),
                                Senha = reader.GetString(8),
                                DataNascimento = reader.GetString(9),
                                Genero = reader.GetString(10),
                                TelefoneCelular = reader.GetString(11),
                                CEP = reader.GetString(12),
                                Endereco = reader.GetString(13),
                                AreasDeAtuacao = reader.GetString(14).Split(',').ToList(),
                                ImagemLogo = reader.IsDBNull(15) ? null : reader.GetString(15),
                                ImagensTrabalhos = reader.IsDBNull(16) ? null : reader.GetString(16).Split(',').ToList()
                            });
                        }
                    }
                }
            }
            return prestadores;
        }
        public void Add(PrestadorDeServico prestadorDeServico)
        {
            using (SqliteConnection connection = new SqliteConnection($"Data Source={_dbPath}"))
            {
                connection.Open();
                string query = @"
                INSERT INTO PrestadoresDeServico (CPF, CNPJ, Nome, Endereco, AreasDeAtuacao, ImagemLogo, ImagensTrabalhos, Cidade, Estado, Telefone, Email, Senha, DataNascimento, Genero, TelefoneCelular, CEP)
                VALUES (@CPF, @CNPJ, @Nome, @Endereco, @AreasDeAtuacao, @ImagemLogo, @ImagensTrabalhos, @Cidade, @Estado, @Telefone, @Email, @Senha, @DataNascimento, @Genero, @TelefoneCelular, @CEP);
            ";
                using (SqliteCommand command = new SqliteCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@CPF", prestadorDeServico.CPF);
                    command.Parameters.AddWithValue("@CNPJ", prestadorDeServico.CNPJ);
                    command.Parameters.AddWithValue("@Nome", prestadorDeServico.Nome);
                    command.Parameters.AddWithValue("@Endereco", prestadorDeServico.Endereco);
                    command.Parameters.AddWithValue("@AreasDeAtuacao", string.Join(",", prestadorDeServico.AreasDeAtuacao));
                    command.Parameters.AddWithValue("@ImagemLogo", prestadorDeServico.ImagemLogo);
                    command.Parameters.AddWithValue("@ImagensTrabalhos", string.Join(",", prestadorDeServico.ImagensTrabalhos));
                    command.Parameters.AddWithValue("@Cidade", prestadorDeServico.Cidade);
                    command.Parameters.AddWithValue("@Estado", prestadorDeServico.Estado);
                    command.Parameters.AddWithValue("@Telefone", prestadorDeServico.Telefone);
                    command.Parameters.AddWithValue("@Email", prestadorDeServico.Email);
                    command.Parameters.AddWithValue("@Senha", prestadorDeServico.Senha);
                    command.Parameters.AddWithValue("@DataNascimento", prestadorDeServico.DataNascimento);
                    command.Parameters.AddWithValue("@Genero", prestadorDeServico.Genero);
                    command.Parameters.AddWithValue("@TelefoneCelular", prestadorDeServico.TelefoneCelular);
                    command.Parameters.AddWithValue("@CEP", prestadorDeServico.CEP);
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}
