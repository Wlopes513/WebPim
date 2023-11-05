using Microsoft.AspNetCore.Mvc;
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
    [Route("departament")]
    public class DepartamentController : ControllerBase
    {
        private readonly ILogger<DepartamentController> _logger;

        public List<DepartamentInfo> listDepartament = new List<DepartamentInfo>();

        public void GetDepartament()
        {
            try
            {
                String connectionString = "Data Source=\"(localdb)\\Folha de pagamento\";Initial Catalog=PagamentoRH;Integrated Security=True";
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    String sql = "SELECT * FROM Departamento";
                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                DepartamentInfo departamentInfo = new DepartamentInfo();
                                departamentInfo.id = reader.GetInt32(0);
                                departamentInfo.name = reader.GetString(1);

                                listDepartament.Add(departamentInfo);
                            };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception: " + ex.ToString());
            }
        }

        public DepartamentController(ILogger<DepartamentController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<DepartamentInfo> Get()
        {
            GetDepartament();

            return listDepartament;
        }
    }
}
