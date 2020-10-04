using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TweetsController : ControllerBase
    {
        List<Tweet> _tweets = new List<Tweet>() {
            new Tweet {id = 1, Text = "Hello World"},
            new Tweet {id = 2, Text = "Hello Worlds"}
        };

        private readonly ILogger<TweetsController> _logger;

        public TweetsController(ILogger<TweetsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if (_tweets.Count == 0)
            {
                return NotFound("No List Found");
            }
            return Ok(_tweets);
        }
    }
}
