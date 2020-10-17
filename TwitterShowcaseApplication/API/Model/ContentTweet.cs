using System.Collections.Generic;

namespace API.Model
{
    public class ContentTweet
    {
        public List<Status> statuses { get; set; }
        public Search_Metadata search_metadata { get; set; }
    }
    public class Search_Metadata
    {
        public float completed_in { get; set; }
        public string max_id_str { get; set; }
        public string next_results { get; set; }
        public string query { get; set; }
        public string refresh_url { get; set; }
        public int count { get; set; }
        public int since_id { get; set; }
        public string since_id_str { get; set; }
    }

    public class Status
    {
        public string created_at { get; set; }
        public string id_str { get; set; }
        public string full_text { get; set; }
        public User2 user { get; set; }
        public Entities2 entities { get; set; }
        public Extended_Entities2 extended_entities { get; set; }
        public Retweeted_Status2 retweeted_status { get; set; }
        public int retweet_count { get; set; }
        public int favorite_count { get; set; }
        public bool favorited { get; set; }
        public bool retweeted { get; set; }
    }
    public class Entities2
    {
        public Hashtag2[] hashtags { get; set; }
        public User_Mentions2[] user_mentions { get; set; }
        public Url2[] urls { get; set; }
    }

    public class Hashtag2
    {
        public string text { get; set; }
        public int[] indices { get; set; }
    }

    public class User_Mentions2
    {
        public string screen_name { get; set; }
        public string name { get; set; }
        public int[] indices { get; set; }
    }

    public class Url2
    {
        public string url { get; set; }
        public string expanded_url { get; set; }
        public string display_url { get; set; }
        public int[] indices { get; set; }
    }

    public class Extended_Entities2
    {
        public Medium4[] media { get; set; }
    }

    public class Medium4
    {
        public string id_str { get; set; }
        public int[] indices { get; set; }
        public string media_url { get; set; }
        public string media_url_https { get; set; }
        public string url { get; set; }
        public string display_url { get; set; }
        public string expanded_url { get; set; }
        public string type { get; set; }
        public Sizes2 sizes { get; set; }
        public Video_Info2 video_info { get; set; }
    }

    public class Sizes2
    {
        public Large2 large { get; set; }
        public Thumb2 thumb { get; set; }
        public Medium5 medium { get; set; }
        public Small2 small { get; set; }
    }

    public class Large2
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }

    public class Thumb2
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }

    public class Medium5
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }

    public class Small2
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }

    public class Video_Info2
    {
        public int[] aspect_ratio { get; set; }
        public int duration_millis { get; set; }
        public Variant2[] variants { get; set; }
    }

    public class Variant2
    {
        public int bitrate { get; set; }
        public string content_type { get; set; }
        public string url { get; set; }
    }

    public class User2
    {
        public string name { get; set; }
        public string screen_name { get; set; }
        public string profile_image_url_https { get; set; }
    }
    public class Retweeted_Status2
    {
        public string created_at { get; set; }
        public string full_text { get; set; }
        public Entities3 entities { get; set; }
        public Extended_Entities3 extended_entities { get; set; }
        public User3 user { get; set; }
        public int retweet_count { get; set; }
        public int favorite_count { get; set; }
    }
    public class Entities3
    {
        public Hashtag3[] hashtags { get; set; }
        public User_Mentions3[] user_mentions { get; set; }
        public Url3[] urls { get; set; }
    }

    public class Hashtag3
    {
        public string text { get; set; }
        public int[] indices { get; set; }
    }

    public class User_Mentions3
    {
        public string screen_name { get; set; }
        public string name { get; set; }
        public int[] indices { get; set; }
    }

    public class Url3
    {
        public string url { get; set; }
        public string expanded_url { get; set; }
        public string display_url { get; set; }
        public int[] indices { get; set; }
    }

    public class Extended_Entities3
    {
        public Medium6[] media { get; set; }
    }

    public class Medium6
    {
        public string id_str { get; set; }
        public int[] indices { get; set; }
        public string media_url { get; set; }
        public string media_url_https { get; set; }
        public string url { get; set; }
        public string display_url { get; set; }
        public string expanded_url { get; set; }
        public string type { get; set; }
        public Sizes3 sizes { get; set; }
        public Video_Info3 video_info { get; set; }
    }

    public class Sizes3
    {
        public Small3 small { get; set; }
        public Thumb3 thumb { get; set; }
        public Medium7 medium { get; set; }
        public Large3 large { get; set; }
    }

    public class Small3
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }

    public class Thumb3
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }

    public class Medium7
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }

    public class Large3
    {
        public int w { get; set; }
        public int h { get; set; }
        public string resize { get; set; }
    }

    public class Video_Info3
    {
        public int[] aspect_ratio { get; set; }
        public Variant3[] variants { get; set; }
        public int duration_millis { get; set; }
    }

    public class Variant3
    {
        public int bitrate { get; set; }
        public string content_type { get; set; }
        public string url { get; set; }
    }

    public class User3
    {
        public string name { get; set; }
        public string screen_name { get; set; }
        public string profile_image_url_https { get; set; }
    }
}