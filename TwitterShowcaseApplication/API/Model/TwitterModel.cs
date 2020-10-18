using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace API.Model
{
    public interface ITwitterModel
    {
        Task<object> GetUserTimeline(string user);
        Task<object> GetCursorUserTimeline(string user, long lastId);
        Task<object> GetContentSearch(string content);
        Task<object> GetCursorContentSearch(string content, long lastId);
        Task<object> GetUser(string user);
        Task<object> GetUsersRandom(string user);
    }
    public class TwitterModel : ITwitterModel
    {
        List<Tweet> tweets;
        ContentTweet ContentTweets;
        User userInfo;
        Tweet randomTweet;
        string errorString;
        private readonly IHttpClientFactory _clientFactory;

        public TwitterModel(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<object> GetUserTimeline(string user)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                "statuses/user_timeline.json?count=10&tweet_mode=extended&screen_name=" + user);
            var client = _clientFactory.CreateClient("twitter");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();
                tweets = JsonConvert.DeserializeObject<List<Tweet>>(responseStream);
                errorString = null;
                return tweets;
            }
            else
            {
                errorString = $"There was an error getting our tweets: {response.ReasonPhrase}";
                throw new Exception(errorString);
            }
        }

        public async Task<object> GetCursorUserTimeline(string user, long lastId)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                "statuses/user_timeline.json?max_id=" + lastId + "&count=5&tweet_mode=extended&screen_name=" + user);
            var client = _clientFactory.CreateClient("twitter");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();
                tweets = JsonConvert.DeserializeObject<List<Tweet>>(responseStream);
                errorString = null;
                return tweets;
            }
            else
            {
                errorString = $"There was an error getting our tweets: {response.ReasonPhrase}";
                throw new Exception(errorString);
            }
        }

        public async Task<object> GetContentSearch(string content)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                "search/tweets.json?count=10&tweet_mode=extended&q=" + content + "&result_type=recent");
            var client = _clientFactory.CreateClient("twitter");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();
                ContentTweets = JsonConvert.DeserializeObject<ContentTweet>(responseStream);
                errorString = null;
                return ContentTweets;
            }
            else
            {
                errorString = $"There was an error getting our tweets: {response.ReasonPhrase}";
                throw new Exception(errorString);
            }
        }

        public async Task<object> GetCursorContentSearch(string content, long lastId)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                "search/tweets.json?max_id=" + lastId + "&count=5&tweet_mode=extended&q=" + content + "&result_type=recent");
            var client = _clientFactory.CreateClient("twitter");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();
                ContentTweets = JsonConvert.DeserializeObject<ContentTweet>(responseStream);
                errorString = null;
                return ContentTweets;
            }
            else
            {
                errorString = $"There was an error getting our tweets: {response.ReasonPhrase}";
                throw new Exception(errorString);
            }
        }

        public async Task<object> GetUser(string user)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                "users/show.json?screen_name=" + user);
            var client = _clientFactory.CreateClient("twitter");
            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();
                userInfo = JsonConvert.DeserializeObject<User>(responseStream);
                errorString = null;
                return userInfo;
            }
            else
            {
                errorString = $"There was an error getting our tweets: {response.ReasonPhrase}";
                throw new Exception(errorString);
            }
        }

        public async Task<object> GetUsersRandom(string user)
        {
            var rand = new Random();
            int num = rand.Next(0, 25);
            var request = new HttpRequestMessage(HttpMethod.Get,
                "statuses/user_timeline.json?count=25&tweet_mode=extended&screen_name=" + user);
            var client = _clientFactory.CreateClient("twitter");
            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();
                tweets = JsonConvert.DeserializeObject<List<Tweet>>(responseStream);
                randomTweet = tweets[num];
                errorString = null;
                return randomTweet;
            }
            else
            {
                errorString = $"There was an error getting our tweets: {response.ReasonPhrase}";
                throw new Exception(errorString);
            }
        }
    }
}
