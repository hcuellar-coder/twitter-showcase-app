using API.Model;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace API.Services
{
    public interface ITwitterSearchService
    {
        Task<ContentTweet> GetContentSearch(string searchTerm, long? lastId = null);

    }
    public class TwitterSearchService : ITwitterSearchService
    {
        private readonly IHttpClientFactory _clientFactory;

        public TwitterSearchService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }


        public async Task<ContentTweet> GetContentSearch(string searchTerm, long? lastId = null)
        {
            var queryStrings = new Dictionary<string, string>()
            {
                {"count", lastId == null ? "10" : "5" },
                {"tweet_mode", "extended" },
                {"q", searchTerm },
                {"result_type", "recent" }
            };

            if (lastId != null)
            {
                queryStrings.Add("max_id", lastId.Value.ToString());
            }

            var requestUri = QueryHelpers.AddQueryString("search/tweets.json", queryStrings);


            var request = new HttpRequestMessage(HttpMethod.Get, requestUri);
            var client = _clientFactory.CreateClient("twitter");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode == false)
            {
                var errorString = $"There was an error getting our tweets: {response.ReasonPhrase}";
                throw new Exception(errorString);
            }

            var responseStream = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<ContentTweet>(responseStream);
            
        }
        
        
        

    }
}
