using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjetoPim.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ProjetoPim.Controllers
{
    [ApiController]
    [Route("employee")]
    public class EmplyeeController : ControllerBase
    {
        private readonly ILogger<EmplyeeController> _logger;

        public List<EmployeeInfo> listEmployees = new List<EmployeeInfo>();
        public int lastId;

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
                    foreach (EmployeeInfo employee in listEmployees)
                    {
                        String sql = $"SELECT F.Nome + ' ' + F.Sobrenome AS NomeCompleto, S.SalarioBase AS SalarioBase, S.Bonus AS Bonus, S.BeneficiosAdicionais AS BeneficiosAdicionais, D.Impostos AS Impostos, D.Seguros AS Seguros, D.OutrosDescontos AS OutrosDescontos, S.SalarioBase + S.Bonus + S.BeneficiosAdicionais - D.Impostos - D.Seguros - D.OutrosDescontos AS SalarioLiquido FROM Funcionario F INNER JOIN Salario S ON F.ID = S.IDFuncionario INNER JOIN Descontos D ON F.ID = D.IDFuncionario WHERE F.ID = {employee.id};";
                        using (SqlCommand command = new SqlCommand(sql, connection))
                        {
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    listEmployees.Find(e => e.id == employee.id).salary = reader["SalarioLiquido"].ToString();
                                    listEmployees.Find(e => e.id == employee.id).baseSalary = decimal.Parse(reader["SalarioBase"].ToString());
                                    listEmployees.Find(e => e.id == employee.id).bonusSalary = decimal.Parse(reader["Bonus"].ToString());
                                    listEmployees.Find(e => e.id == employee.id).benefitsSalary = decimal.Parse(reader["BeneficiosAdicionais"].ToString());
                                    listEmployees.Find(e => e.id == employee.id).taxesDiscount = decimal.Parse(reader["Impostos"].ToString());
                                    listEmployees.Find(e => e.id == employee.id).secureDiscount = decimal.Parse(reader["Seguros"].ToString());
                                    listEmployees.Find(e => e.id == employee.id).otherDiscount = decimal.Parse(reader["OutrosDescontos"].ToString());
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
                    String sql = $"DELETE FROM Salario WHERE IDFuncionario = {id}";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                        }
                    }

                    sql = $"DELETE FROM Descontos WHERE IDFuncionario = {id}";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                        }
                    }

                    sql = $"DELETE FROM HistoricoPagamento WHERE IDFuncionario = {id}";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                        }
                    }

                    sql = $"DELETE FROM Funcionario WHERE id = {id}";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                        }
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public Boolean Delete(int id)
        {
            return DeleteEmployee(id);
        }

        public IActionResult PostEmployee(EmployeeRequest employee)
        {
            try
            {
                String connectionString = "Data Source=\"(localdb)\\Folha de pagamento\";Initial Catalog=PagamentoRH;Integrated Security=True";
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    String sql = $"SELECT Max(id) as ID FROM Funcionario;";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                            lastId = reader.GetInt32(0) + 1;
                        }
                    }

                    sql = $"INSERT INTO Funcionario (ID, Nome, Sobrenome, Endereco, CPF, Cargo, DepartamentoID) VALUES ({lastId}, '{employee.Name}', '{employee.Surname}', '{employee.Address}', '{employee.Cpf}', '{employee.Responsability}', {employee.Departament});";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                        }
                    }

                    sql = $"INSERT INTO Salario (IDFuncionario, SalarioBase, Bonus, BeneficiosAdicionais) VALUES ({lastId}, '{employee.BaseSalary}', '{employee.BonusSalary}', '{employee.BenefitsSalary}');";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                        }
                    }

                    sql = $"INSERT INTO Descontos (IDFuncionario, Impostos, Seguros, OutrosDescontos) VALUES ({lastId}, '{employee.TaxesDiscount}', '{employee.SecureDiscount}', '{employee.OtherDiscount}');";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                        }
                    }
                }

                return Ok(true);
            }
            catch (Exception ex)
            {
                return Ok(false);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] EmployeeRequest employee)
        {
            return PostEmployee(employee);
        }

        public IActionResult PostHistoric(EmployeeHistoric employee)
        {
            try
            {
                String connectionString = "Data Source=\"(localdb)\\Folha de pagamento\";Initial Catalog=PagamentoRH;Integrated Security=True";
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    String sql = $"SELECT Max(id) as ID FROM HistoricoPagamento;";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                            lastId = reader.GetInt32(0) + 1;
                        }
                    }

                    sql = $"SELECT * FROM HistoricoPagamento WHERE DataPagamento LIKE '%{employee.date}%' AND IDFuncionario = {employee.idEmployee};";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                            if (reader.HasRows)
                            {
                                return StatusCode(404);
                            }
                        }
                    }

                    string asdasdasdas = decimal.Parse(employee.salary).ToString().Replace(",", ".");

                    sql = $"INSERT INTO HistoricoPagamento (ID, IDFuncionario, DataPagamento, ValorPago, InformacoesAdicionais) VALUES ({lastId}, {employee.idEmployee}, '{employee.dateRegister}', {asdasdasdas}, '{employee.information}');";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            reader.Read();
                        }
                    }
                }

                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(500);
            }
        }

        [Route("historic")]
        [HttpPost]
        public IActionResult HttpPostHistoric([FromBody] EmployeeHistoric employee)
        {
            return PostHistoric(employee);
        }
    }
}
