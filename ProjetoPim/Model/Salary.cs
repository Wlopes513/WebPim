using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System;
using System.Data.SqlClient;

namespace ProjetoPim.Model
{
    public class Salary
    {
        public int NomeCompleto { get; set; }
        public decimal SalarioLiquido { get; set; }
    }
}
