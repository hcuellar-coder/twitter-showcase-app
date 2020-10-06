using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using API.Model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TweetsController : ControllerBase
    {
        List<Tweet> _tweets = new List<Tweet>() {
            new Tweet {id = 1, text = "Hello World"},
            new Tweet {id = 2, text = "Hello Worlds"}
        };

         private readonly ITwitterModel _twitterModel;

         public TweetsController(ITwitterModel twittermodel)
         {
             _twitterModel = twittermodel;
         }


        [HttpGet]
        public IActionResult Get()
        {
            Console.WriteLine("In Get()");
            if (_tweets.Count == 0)
            {
                return NotFound("No List Found");
            }
            return Ok(_tweets);
        }

        [HttpGet("timeline")]
        public Task<object> Get(string user)
        {
            Console.WriteLine("This is the user = " + user);
            return _twitterModel.GetUserTimeline(user);
        }
    }
}
