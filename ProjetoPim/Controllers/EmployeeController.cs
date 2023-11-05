﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjetoPim.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoPim.Controllers
{
    [ApiController]
    [Route("employee")]
    public class EmplyeeController : ControllerBase
    {
        private readonly ILogger<EmplyeeController> _logger;

        public List<EmployeeInfo> listEmployees = new List<EmployeeInfo>();

        public void GetEmployee()
        {
            try
            {
                String connectionString = "Data Source=\"(localdb)\\Folha de pagamento\";Initial Catalog=PagamentoRH;Integrated Security=True";
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    String sql = "SELECT * FROM Funcionario";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                EmployeeInfo employeeInfo = new EmployeeInfo();
                                employeeInfo.id = reader.GetInt32(0);
                                employeeInfo.name = reader.GetString(1);
                                employeeInfo.surname = reader.GetString(2);
                                employeeInfo.address = reader.GetString(3);
                                employeeInfo.cpf = reader.GetString(4);
                                employeeInfo.responsability = reader.GetString(5);
                                employeeInfo.departament = reader.GetInt32(6);

                                listEmployees.Add(employeeInfo);
                            };
                        }
                    }
                }

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    foreach (EmployeeInfo employee in listEmployees) {
                        String sql = $"SELECT F.Nome + ' ' + F.Sobrenome AS NomeCompleto, S.SalarioBase + S.Bonus + S.BeneficiosAdicionais - D.Impostos - D.Seguros - D.OutrosDescontos AS SalarioLiquido FROM Funcionario F INNER JOIN Salario S ON F.ID = S.IDFuncionario INNER JOIN Descontos D ON F.ID = D.IDFuncionario WHERE F.ID = {employee.id};";
                        using (SqlCommand command = new SqlCommand(sql, connection)) {
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    listEmployees.Find(e => e.id == employee.id).salary = reader["SalarioLiquido"].ToString();
                                };
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.ToString());
            }
        }

        public EmplyeeController(ILogger<EmplyeeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<EmployeeInfo> Get()
        {
            GetEmployee();

            return listEmployees;
        }

        public Boolean DeleteEmployee(int id)
        {
            try
            {
                String connectionString = "Data Source=\"(localdb)\\Folha de pagamento\";Initial Catalog=PagamentoRH;Integrated Security=True";
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    String sql = $"DELETE * FROM Funcionario WHERE id = {id}";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();

                            return true;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [Route("employee/{id}")]
        [HttpDelete]
        public Boolean Delete(int id)
        {
            return DeleteEmployee(id);
        }
    }
}