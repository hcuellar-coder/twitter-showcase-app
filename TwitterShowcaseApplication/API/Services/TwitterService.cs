using API.Model;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ITwitterService
    {
        Task<List<Tweet>> GetUserTimeline(string user, long? lastId = null);
        Task<ContentTweet> GetContentSearch(string content);
        Task<ContentTweet> GetCursorContentSearch(string content, long lastId);
        Task<User> GetUser(string user);
        Task<Tweet> GetUsersRandom(string user);
    }
    public class TwitterService : ITwitterService
    {
        List<Tweet> tweets;
        ContentTweet ContentTweets;
        User userInfo;
        string errorString;
        Tweet randomTweet;
        private readonly IHttpClientFactory _clientFactory;

        public TwitterService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<List<Tweet>> GetUserTimeline(string user, long? lastId = null)
        {
            var queryStrings = new Dictionary<string, string>()
            {
                {"count", lastId == null ? "10" : "5" },
                {"tweet_mode", "extended" },
                {"screen_name", user }
            };

            if (lastId != null)
            {
                queryStrings.Add("max_id", lastId.Value.ToString());
            }

            var requestUri = QueryHelpers.AddQueryString("statuses/user_timeline.json", queryStrings);

            var request = new HttpRequestMessage(HttpMethod.Get, requestUri);
            var client = _clientFactory.CreateClient("twitter");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode == false)
            {
                var errorString = $"There was an error getting our tweets: {response.ReasonPhrase}";
                throw new Exception(errorString);
            }

            var responseStream = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<List<Tweet>>(responseStream);
        }


        public async Task<ContentTweet> GetContentSearch(string content)
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

        public async Task<ContentTweet> GetCursorContentSearch(string content, long lastId)
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

        public async Task<User> GetUser(string user)
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

        public async Task<Tweet> GetUsersRandom(string user)
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
