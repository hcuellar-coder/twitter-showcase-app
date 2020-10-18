using API.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
            return _twitterModel.GetUserTimeline(user);
        }

        [HttpGet("cursor_timeline")]
        public Task<object> GetCursorUser(string user, string lastId)
        {
            long long_lastId = long.Parse(lastId);
            long_lastId = long_lastId - 1;
            return _twitterModel.GetCursorUserTimeline(user, long_lastId);
        }

        [HttpGet("search")]
        public Task<object> GetContent(string content)
        {
            return _twitterModel.GetContentSearch(content);
        }

        [HttpGet("cursor_search")]
        public Task<object> GetCursorContent(string content, string lastId)
        {
            long long_lastId = long.Parse(lastId);
            long_lastId = long_lastId - 1;
            return _twitterModel.GetCursorContentSearch(content, long_lastId);
        }


        [HttpGet("users")]
        public Task<object> GetUsers(string user)
        {
            return _twitterModel.GetUser(user);
        }

        [HttpGet("users_random")]
        public Task<object> GetUsersRandom(string user)
        {
            return _twitterModel.GetUsersRandom(user);
        }
    }
}