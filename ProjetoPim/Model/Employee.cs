using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System;
using System.Data.SqlClient;

namespace ProjetoPim.Model
{
    public class EmployeeModel : PageModel
    {
        public List<EmployeeInfo> listEmployees = new List<EmployeeInfo>();
        public void OnGet()
        {
            try
            {
                String connectionString = "Data Source=\"(localdb)\\Folha de pagamento\";Initial Catalog=PagamentoRH;Integrated Security=True";
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    String sql = "SELECT * FROM Funcionario";
                    using (SqlCommand command = new SqlCommand(sql, connection)) {
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
                                employeeInfo.salary = reader.GetString(6);

                                listEmployees.Add(employeeInfo);
                            };
                        }
                    }
                }
            } catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.ToString());
            } 
        }
    }

    public class EmployeeInfo
    {
        public int id { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string address { get; set; }
        public string cpf { get; set; }
        public string responsability { get; set; }
        public string salary { get; set; }
    }
}
