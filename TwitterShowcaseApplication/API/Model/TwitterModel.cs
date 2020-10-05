using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace API.Model
{
    public interface ITwitterModel
    {
        Task GetUserTimeline(string user);
    }
    public class TwitterModel : ITwitterModel
    {
        private readonly IHttpClientFactory _clientFactory;
       
        public IEnumerable<Tweet> Tweets { get; private set; }
        public bool GetTweetError { get; set; }

        public TwitterModel(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task GetUserTimeline(string user)
        {
            Console.WriteLine("in GetuserTimeline");
            var request = new HttpRequestMessage(HttpMethod.Get,
                "statuses/user_timeline.json?screen_name=" + user);
            var client = _clientFactory.CreateClient("twitter");

            var response = await client.SendAsync(request);
            Console.WriteLine(response);

            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                Tweets = await JsonSerializer.DeserializeAsync<IEnumerable<Tweet>>(responseStream);
                Console.WriteLine(Tweets);
            }
            else
            {
                GetTweetError = true;
                Tweets = Array.Empty<Tweet>();
                Console.WriteLine(Tweets);
            }
        }
    }
}
