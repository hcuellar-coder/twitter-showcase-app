using API.Model;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace API.Services
{

    public interface ITwitterUserQueryService
    {
        Task<User> Get(string user);
    }
    public class TwitterUserQueryService : ITwitterUserQueryService
    {
        private readonly IHttpClientFactory _clientFactory;

        public TwitterUserQueryService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<User> Get(string user)
        {

            var queryStrings = new Dictionary<string, string>()
            {
                {"screen_name", user }
            };

            var requestUri = QueryHelpers.AddQueryString("users/show.json", queryStrings);

            var request = new HttpRequestMessage(HttpMethod.Get, requestUri);
            var client = _clientFactory.CreateClient("twitter");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode == false)
            {
                var errorString = $"There was an error getting our tweets: {response.ReasonPhrase}";
                throw new Exception(errorString);
            }

            var responseStream = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<User>(responseStream);
        }

    }
}
