using API.Model;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TweetsController : ControllerBase
    {

        private readonly ITwitterSearchService _twitterSearchService;
        private readonly ITwitterTimelineService _twitterTimelineService;
        private readonly ITwitterUserQueryService _twitterUserQueryService;

        public TweetsController(ITwitterSearchService twitterSearchService,
            ITwitterTimelineService twitterTimelineService,
            ITwitterUserQueryService twitterUserQueryService)
        {
            _twitterSearchService = twitterSearchService;
            _twitterTimelineService = twitterTimelineService;
            _twitterUserQueryService = twitterUserQueryService;
        }


        [HttpGet("timeline")]
        public Task<List<Tweet>> Get(string user)
        {
            return _twitterTimelineService.GetUserTimeline(user);
        }

        [HttpGet("cursor_timeline")]
        public Task<List<Tweet>> GetCursorUser(string user, string lastId)
        {
            long long_lastId = long.Parse(lastId);
            long_lastId = long_lastId - 1;
            return _twitterTimelineService.GetUserTimeline(user, long_lastId);
        }

        [HttpGet("search")]
        public Task<ContentTweet> GetContent(string content)
        {
            return _twitterSearchService.GetContentSearch(content);
        }

        [HttpGet("cursor_search")]
        public Task<ContentTweet> GetCursorContent(string content, string lastId)
        {
            long long_lastId = long.Parse(lastId);
            long_lastId = long_lastId - 1;
            return _twitterSearchService.GetContentSearch(content, long_lastId);
        }

        [HttpGet("users")]
        public Task<User> GetUsers(string user)
        {
            return _twitterUserQueryService.Get(user);
        }

        [HttpGet("users_random")]
        public Task<Tweet> GetUsersRandom(string user)
        {
            return _twitterTimelineService.GetRandomTweet(user);
        }
    }
}