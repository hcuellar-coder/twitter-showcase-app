﻿using API.Model;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace API.Services
{

    public interface ITwitterTimelineService
    {
        Task<List<Tweet>> GetUserTimeline(string user, long? lastId = null, int? maxResults = null);

        Task<Tweet> GetRandomTweet(string user);
    }
    public class TwitterTimelineService : ITwitterTimelineService
    {
        private readonly IHttpClientFactory _clientFactory;

        public TwitterTimelineService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<List<Tweet>> GetUserTimeline(string user, long? lastId = null, int? maxResults = null)
        {
            var queryStrings = new Dictionary<string, string>()
            {
                {"count", lastId == null ? "10" : "5" },
                {"tweet_mode", "extended" },
                {"screen_name", user }
            };

            if (maxResults != null)
            {
                queryStrings["count"] = maxResults.Value.ToString();
            }

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


        public async Task<Tweet> GetRandomTweet(string user)
        {
            var rand = new Random();
            int num = rand.Next(0, 25);

            var tweets = await GetUserTimeline(user, maxResults: 25);

            return tweets[num];

           
            
        }
    }
}
