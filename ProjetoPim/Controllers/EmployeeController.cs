using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjetoPim.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoPim.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmplyeeController : ControllerBase
    {
        private readonly ILogger<EmplyeeController> _logger;

        public EmplyeeController(ILogger<EmplyeeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<EmployeeInfo> Get()
        {
            var rng = new Random();
            return null;
        }
    }
}
