namespace API.Model
{
    public class User
    {
        public string id_str { get; set; }
        public string name { get; set; }
        public string screen_name { get; set; }
        public string description { get; set; }
        public int followers_count { get; set; }
        public int friends_count { get; set; }
        public string profile_image_url_https { get; set; }
        public string profile_banner_url { get; set; }
    }

}