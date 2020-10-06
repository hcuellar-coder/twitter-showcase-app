using Microsoft.AspNetCore.Server.IIS.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace API.Model
{
    public interface ITwitterModel
    {
        Task<object> GetUserTimeline(string user);
    }
    public class TwitterModel : ITwitterModel
    {
        List<Tweet> tweets;
        string errorString;
        private readonly IHttpClientFactory _clientFactory;

        public TwitterModel(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<object> GetUserTimeline(string user)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                "statuses/user_timeline.json?screen_name=" + user);
            var client = _clientFactory.CreateClient("twitter");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();
                tweets = JsonConvert.DeserializeObject<List<Tweet>>(responseStream);
                Console.WriteLine(tweets.Count);
                errorString = null;
                return tweets;
                /*var responseStream = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<object>(responseStream);*/
            }
            else
            {
                errorString = $"There was an error getting our tweets: {response.ReasonPhrase}";
                throw new Exception(errorString);

            }
        }
    }
}
