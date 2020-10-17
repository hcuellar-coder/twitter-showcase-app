namespace API.Model
{
    public class Tweet
    {
        public string created_at { get; set; }
        public string id_str { get; set; }
        public string full_text { get; set; }
        public Tweet_User user { get; set; }
        public Entities entities { get; set; }
        public Extended_Entities extended_entities { get; set; }
        public Retweeted_Status retweeted_status { get; set; }
        public int retweet_count { get; set; }
        public int favorite_count { get; set; }
        public bool favorited { get; set; }
        public bool retweeted { get; set; }
    }
    public class Entities
    {
        public Hashtag[] hashtags { get; set; }
        public User_Mentions[] user_mentions { get; set; }
        public Url[] urls { get; set; }
    }

    public class Hashtag
    {
        public string text { get; set; }
        public int[] indices { get; set; }
    }

    public class User_Mentions
    {
        public string screen_name { get; set; }
        public string name { get; set; }
        public int[] indices { get; set; }
    }

    public class Url
    {
        public string url { get; set; }
        public string expanded_url { get; set; }
        public string display_url { get; set; }
        public int[] indices { get; set; }
    }
    public class Extended_Entities
    {
        public Medium[] media { get; set; }
    }

    public class Medium
    {
        public string id_str { get; set; }
        public int[] indices { get; set; }
        public string media_url { get; set; }
        public string media_url_https { get; set; }
        public string url { get; set; }
        public string display_url { get; set; }
        public string expanded_url { get; set; }
        public string type { get; set; }
        public Sizes sizes { get; set; }
        public Video_Info video_info { get; set; }
    }
    public class Sizes
    {
        public Large large { get; set; }
        public Thumb thumb { get; set; }
        public Medium1 medium { get; set; }
        public Small small { get; set; }
    }

    public class Large
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }
    public class Thumb
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }
    public class Medium1
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }
    public class Small
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }
    public class Video_Info
    {
        public int[] aspect_ratio { get; set; }
        public int duration_millis { get; set; }
        public Variant[] variants { get; set; }
    }
    public class Variant
    {
        public int bitrate { get; set; }
        public string content_type { get; set; }
        public string url { get; set; }
    }
    public class Tweet_User
    {
        public string name { get; set; }
        public string screen_name { get; set; }
        public string profile_image_url_https { get; set; }
    }
    public class Retweeted_Status
    {
        public string created_at { get; set; }
        public string full_text { get; set; }
        public Entities1 entities { get; set; }
        public Extended_Entities1 extended_entities { get; set; }
        public User1 user { get; set; }
        public int retweet_count { get; set; }
        public int favorite_count { get; set; }
    }
    public class Entities1
    {
        public Hashtag1[] hashtags { get; set; }
        public User_Mentions1[] user_mentions { get; set; }
        public Url1[] urls { get; set; }
    }
    public class Hashtag1
    {
        public string text { get; set; }
        public int[] indices { get; set; }
    }
    public class User_Mentions1
    {
        public string screen_name { get; set; }
        public string name { get; set; }
        public int[] indices { get; set; }
    }
    public class Url1
    {
        public string url { get; set; }
        public string expanded_url { get; set; }
        public string display_url { get; set; }
        public int[] indices { get; set; }
    }
    public class Extended_Entities1
    {
        public Medium2[] media { get; set; }
    }
    public class Medium2
    {
        public string id_str { get; set; }
        public int[] indices { get; set; }
        public string media_url { get; set; }
        public string media_url_https { get; set; }
        public string url { get; set; }
        public string display_url { get; set; }
        public string expanded_url { get; set; }
        public string type { get; set; }
        public Sizes1 sizes { get; set; }
        public Video_Info1 video_info { get; set; }
    }
    public class Sizes1
    {
        public Small1 small { get; set; }
        public Thumb1 thumb { get; set; }
        public Medium3 medium { get; set; }
        public Large1 large { get; set; }
    }
    public class Small1
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }
    public class Thumb1
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }
    public class Medium3
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }
    public class Large1
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }
    public class Video_Info1
    {
        public int[] aspect_ratio { get; set; }
        public Variant1[] variants { get; set; }
        public int duration_millis { get; set; }
    }
    public class Variant1
    {
        public int bitrate { get; set; }
        public string content_type { get; set; }
        public string url { get; set; }
    }
    public class User1
    {
        public string name { get; set; }
        public string screen_name { get; set; }
        public string profile_image_url_https { get; set; }
    }
}