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
        public decimal baseSalary { get; set; }
        public decimal bonusSalary { get; set; }
        public decimal benefitsSalary { get; set; }
        public decimal taxesDiscount { get; set; }
        public decimal secureDiscount { get; set; }
        public decimal otherDiscount { get; set; }
    }

    public class EmployeeRequest
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Address { get; set; }
        public string Cpf { get; set; }
        public int Departament { get; set; }
        public string Responsability { get; set; }
        public string BaseSalary { get; set; }
        public string BonusSalary { get; set; }
        public string BenefitsSalary { get; set; }
        public string TaxesDiscount { get; set; }
        public string SecureDiscount { get; set; }
        public string OtherDiscount { get; set; }
    }
}
