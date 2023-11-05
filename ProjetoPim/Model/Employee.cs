using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System;
using System.Data.SqlClient;

namespace ProjetoPim.Model
{
    public class EmployeeInfo
    {
        public int id { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string address { get; set; }
        public string cpf { get; set; }
        public string responsability { get; set; }
        public int departament { get; set; }
        public string salary { get; set; }
    }
}
