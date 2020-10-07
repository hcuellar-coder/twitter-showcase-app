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

         private readonly ITwitterModel _twitterModel;

         public TweetsController(ITwitterModel twittermodel)
         {
             _twitterModel = twittermodel;
         }


        [HttpGet("timeline")]
        public Task<object> Get(string user)
        {
            Console.WriteLine("This is the user = " + user);
            return _twitterModel.GetUserTimeline(user);
        }
    }
}
