using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System;
using System.Data.SqlClient;

namespace ProjetoPim.Model
{
    public class Historic
    {
        public int id { get; set; }
        public string date { get; set; }
        public decimal value { get; set; }
    }
}
