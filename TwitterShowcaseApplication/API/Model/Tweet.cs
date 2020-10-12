using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
/*
public class Rootobject
{
    public Class1[] Property1 { get; set; }
}

public class Class1
{
    public string created_at { get; set; }
    public long id { get; set; }
    public string id_str { get; set; }
    public string full_text { get; set; }
    public bool truncated { get; set; }
    public int[] display_text_range { get; set; }
    public Entities entities { get; set; }
    public Extended_Entities extended_entities { get; set; }
    public string source { get; set; }
    public long? in_reply_to_status_id { get; set; }
    public string in_reply_to_status_id_str { get; set; }
    public long? in_reply_to_user_id { get; set; }
    public string in_reply_to_user_id_str { get; set; }
    public string in_reply_to_screen_name { get; set; }
    public User user { get; set; }
    public object geo { get; set; }
    public object coordinates { get; set; }
    public object place { get; set; }
    public object contributors { get; set; }
    public bool is_quote_status { get; set; }
    public int retweet_count { get; set; }
    public int favorite_count { get; set; }
    public bool favorited { get; set; }
    public bool retweeted { get; set; }
    public bool possibly_sensitive { get; set; }
    public string lang { get; set; }
    public Retweeted_Status retweeted_status { get; set; }
    public long quoted_status_id { get; set; }
    public string quoted_status_id_str { get; set; }
    public Quoted_Status_Permalink quoted_status_permalink { get; set; }
    public Quoted_Status quoted_status { get; set; }
}

public class Entities
{
    public Hashtag[] hashtags { get; set; }
    public object[] symbols { get; set; }
    public User_Mentions[] user_mentions { get; set; }
    public Url[] urls { get; set; }
    public Medium[] media { get; set; }
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
    public long id { get; set; }
    public string id_str { get; set; }
    public int[] indices { get; set; }
}

public class Url
{
    public string url { get; set; }
    public string expanded_url { get; set; }
    public string display_url { get; set; }
    public int[] indices { get; set; }
}

public class Medium
{
    public long id { get; set; }
    public string id_str { get; set; }
    public int[] indices { get; set; }
    public string media_url { get; set; }
    public string media_url_https { get; set; }
    public string url { get; set; }
    public string display_url { get; set; }
    public string expanded_url { get; set; }
    public string type { get; set; }
    public Sizes sizes { get; set; }
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

public class Extended_Entities
{
    public Medium2[] media { get; set; }
}

public class Medium2
{
    public long id { get; set; }
    public string id_str { get; set; }
    public int[] indices { get; set; }
    public string media_url { get; set; }
    public string media_url_https { get; set; }
    public string url { get; set; }
    public string display_url { get; set; }
    public string expanded_url { get; set; }
    public string type { get; set; }
    public Sizes1 sizes { get; set; }
    public Video_Info video_info { get; set; }
    public Additional_Media_Info additional_media_info { get; set; }
}

public class Sizes1
{
    public Large1 large { get; set; }
    public Thumb1 thumb { get; set; }
    public Medium3 medium { get; set; }
    public Small1 small { get; set; }
}

public class Large1
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

public class Small1
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

public class Additional_Media_Info
{
    public string title { get; set; }
    public string description { get; set; }
    public bool monetizable { get; set; }
    public bool embeddable { get; set; }
}

public class User
{
    public int id { get; set; }
    public string id_str { get; set; }
    public string name { get; set; }
    public string screen_name { get; set; }
    public string location { get; set; }
    public string description { get; set; }
    public string url { get; set; }
    public Entities1 entities { get; set; }
    public bool _protected { get; set; }
    public int followers_count { get; set; }
    public int friends_count { get; set; }
    public int listed_count { get; set; }
    public string created_at { get; set; }
    public int favourites_count { get; set; }
    public object utc_offset { get; set; }
    public object time_zone { get; set; }
    public bool geo_enabled { get; set; }
    public bool verified { get; set; }
    public int statuses_count { get; set; }
    public object lang { get; set; }
    public bool contributors_enabled { get; set; }
    public bool is_translator { get; set; }
    public bool is_translation_enabled { get; set; }
    public string profile_background_color { get; set; }
    public string profile_background_image_url { get; set; }
    public string profile_background_image_url_https { get; set; }
    public bool profile_background_tile { get; set; }
    public string profile_image_url { get; set; }
    public string profile_image_url_https { get; set; }
    public string profile_banner_url { get; set; }
    public string profile_link_color { get; set; }
    public string profile_sidebar_border_color { get; set; }
    public string profile_sidebar_fill_color { get; set; }
    public string profile_text_color { get; set; }
    public bool profile_use_background_image { get; set; }
    public bool has_extended_profile { get; set; }
    public bool default_profile { get; set; }
    public bool default_profile_image { get; set; }
    public object following { get; set; }
    public object follow_request_sent { get; set; }
    public object notifications { get; set; }
    public string translator_type { get; set; }
}

public class Entities1
{
    public Url1 url { get; set; }
    public Description description { get; set; }
}

public class Url1
{
    public Url2[] urls { get; set; }
}

public class Url2
{
    public string url { get; set; }
    public string expanded_url { get; set; }
    public string display_url { get; set; }
    public int[] indices { get; set; }
}

public class Description
{
    public object[] urls { get; set; }
}

public class Retweeted_Status
{
    public string created_at { get; set; }
    public long id { get; set; }
    public string id_str { get; set; }
    public string full_text { get; set; }
    public bool truncated { get; set; }
    public int[] display_text_range { get; set; }
    public Entities2 entities { get; set; }
    public Extended_Entities1 extended_entities { get; set; }
    public string source { get; set; }
    public object in_reply_to_status_id { get; set; }
    public object in_reply_to_status_id_str { get; set; }
    public object in_reply_to_user_id { get; set; }
    public object in_reply_to_user_id_str { get; set; }
    public object in_reply_to_screen_name { get; set; }
    public User1 user { get; set; }
    public object geo { get; set; }
    public object coordinates { get; set; }
    public object place { get; set; }
    public object contributors { get; set; }
    public bool is_quote_status { get; set; }
    public int retweet_count { get; set; }
    public int favorite_count { get; set; }
    public bool favorited { get; set; }
    public bool retweeted { get; set; }
    public bool possibly_sensitive { get; set; }
    public string lang { get; set; }
}

public class Entities2
{
    public Hashtag1[] hashtags { get; set; }
    public object[] symbols { get; set; }
    public User_Mentions1[] user_mentions { get; set; }
    public Url3[] urls { get; set; }
    public Medium4[] media { get; set; }
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
    public int id { get; set; }
    public string id_str { get; set; }
    public int[] indices { get; set; }
}

public class Url3
{
    public string url { get; set; }
    public string expanded_url { get; set; }
    public string display_url { get; set; }
    public int[] indices { get; set; }
}

public class Medium4
{
    public long id { get; set; }
    public string id_str { get; set; }
    public int[] indices { get; set; }
    public string media_url { get; set; }
    public string media_url_https { get; set; }
    public string url { get; set; }
    public string display_url { get; set; }
    public string expanded_url { get; set; }
    public string type { get; set; }
    public Sizes2 sizes { get; set; }
}

public class Sizes2
{
    public Small2 small { get; set; }
    public Thumb2 thumb { get; set; }
    public Medium5 medium { get; set; }
    public Large2 large { get; set; }
}

public class Small2
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

public class Large2
{
    public int w { get; set; }
    public int h { get; set; }
    public string resize { get; set; }
}

public class Extended_Entities1
{
    public Medium6[] media { get; set; }
}

public class Medium6
{
    public long id { get; set; }
    public string id_str { get; set; }
    public int[] indices { get; set; }
    public string media_url { get; set; }
    public string media_url_https { get; set; }
    public string url { get; set; }
    public string display_url { get; set; }
    public string expanded_url { get; set; }
    public string type { get; set; }
    public Sizes3 sizes { get; set; }
    public Video_Info1 video_info { get; set; }
    public Additional_Media_Info1 additional_media_info { get; set; }
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

public class Additional_Media_Info1
{
    public bool monetizable { get; set; }
}

public class User1
{
    public long id { get; set; }
    public string id_str { get; set; }
    public string name { get; set; }
    public string screen_name { get; set; }
    public string location { get; set; }
    public string description { get; set; }
    public string url { get; set; }
    public Entities3 entities { get; set; }
    public bool _protected { get; set; }
    public int followers_count { get; set; }
    public int friends_count { get; set; }
    public int listed_count { get; set; }
    public string created_at { get; set; }
    public int favourites_count { get; set; }
    public object utc_offset { get; set; }
    public object time_zone { get; set; }
    public bool geo_enabled { get; set; }
    public bool verified { get; set; }
    public int statuses_count { get; set; }
    public object lang { get; set; }
    public bool contributors_enabled { get; set; }
    public bool is_translator { get; set; }
    public bool is_translation_enabled { get; set; }
    public string profile_background_color { get; set; }
    public string profile_background_image_url { get; set; }
    public string profile_background_image_url_https { get; set; }
    public bool profile_background_tile { get; set; }
    public string profile_image_url { get; set; }
    public string profile_image_url_https { get; set; }
    public string profile_banner_url { get; set; }
    public string profile_link_color { get; set; }
    public string profile_sidebar_border_color { get; set; }
    public string profile_sidebar_fill_color { get; set; }
    public string profile_text_color { get; set; }
    public bool profile_use_background_image { get; set; }
    public bool has_extended_profile { get; set; }
    public bool default_profile { get; set; }
    public bool default_profile_image { get; set; }
    public object following { get; set; }
    public object follow_request_sent { get; set; }
    public object notifications { get; set; }
    public string translator_type { get; set; }
}

public class Entities3
{
    public Url4 url { get; set; }
    public Description1 description { get; set; }
}

public class Url4
{
    public Url5[] urls { get; set; }
}

public class Url5
{
    public string url { get; set; }
    public string expanded_url { get; set; }
    public string display_url { get; set; }
    public int[] indices { get; set; }
}

public class Description1
{
    public Url6[] urls { get; set; }
}

public class Url6
{
    public string url { get; set; }
    public string expanded_url { get; set; }
    public string display_url { get; set; }
    public int[] indices { get; set; }
}

public class Quoted_Status_Permalink
{
    public string url { get; set; }
    public string expanded { get; set; }
    public string display { get; set; }
}

public class Quoted_Status
{
    public string created_at { get; set; }
    public long id { get; set; }
    public string id_str { get; set; }
    public string full_text { get; set; }
    public bool truncated { get; set; }
    public int[] display_text_range { get; set; }
    public Entities4 entities { get; set; }
    public Extended_Entities2 extended_entities { get; set; }
    public string source { get; set; }
    public object in_reply_to_status_id { get; set; }
    public object in_reply_to_status_id_str { get; set; }
    public object in_reply_to_user_id { get; set; }
    public object in_reply_to_user_id_str { get; set; }
    public object in_reply_to_screen_name { get; set; }
    public User2 user { get; set; }
    public object geo { get; set; }
    public object coordinates { get; set; }
    public object place { get; set; }
    public object contributors { get; set; }
    public bool is_quote_status { get; set; }
    public int retweet_count { get; set; }
    public int favorite_count { get; set; }
    public bool favorited { get; set; }
    public bool retweeted { get; set; }
    public bool possibly_sensitive { get; set; }
    public string lang { get; set; }
}

public class Entities4
{
    public object[] hashtags { get; set; }
    public object[] symbols { get; set; }
    public User_Mentions2[] user_mentions { get; set; }
    public Url7[] urls { get; set; }
    public Medium8[] media { get; set; }
}

public class User_Mentions2
{
    public string screen_name { get; set; }
    public string name { get; set; }
    public int id { get; set; }
    public string id_str { get; set; }
    public int[] indices { get; set; }
}

public class Url7
{
    public string url { get; set; }
    public string expanded_url { get; set; }
    public string display_url { get; set; }
    public int[] indices { get; set; }
}

public class Medium8
{
    public long id { get; set; }
    public string id_str { get; set; }
    public int[] indices { get; set; }
    public string media_url { get; set; }
    public string media_url_https { get; set; }
    public string url { get; set; }
    public string display_url { get; set; }
    public string expanded_url { get; set; }
    public string type { get; set; }
    public Sizes4 sizes { get; set; }
}

public class Sizes4
{
    public Thumb4 thumb { get; set; }
    public Medium9 medium { get; set; }
    public Small4 small { get; set; }
    public Large4 large { get; set; }
}

public class Thumb4
{
    public int w { get; set; }
    public int h { get; set; }
    public string resize { get; set; }
}

public class Medium9
{
    public int w { get; set; }
    public int h { get; set; }
    public string resize { get; set; }
}

public class Small4
{
    public int w { get; set; }
    public int h { get; set; }
    public string resize { get; set; }
}

public class Large4
{
    public int w { get; set; }
    public int h { get; set; }
    public string resize { get; set; }
}

public class Extended_Entities2
{
    public Medium10[] media { get; set; }
}

public class Medium10
{
    public long id { get; set; }
    public string id_str { get; set; }
    public int[] indices { get; set; }
    public string media_url { get; set; }
    public string media_url_https { get; set; }
    public string url { get; set; }
    public string display_url { get; set; }
    public string expanded_url { get; set; }
    public string type { get; set; }
    public Sizes5 sizes { get; set; }
    public Video_Info2 video_info { get; set; }
    public Additional_Media_Info2 additional_media_info { get; set; }
}

public class Sizes5
{
    public Thumb5 thumb { get; set; }
    public Medium11 medium { get; set; }
    public Small5 small { get; set; }
    public Large5 large { get; set; }
}

public class Thumb5
{
    public int w { get; set; }
    public int h { get; set; }
    public string resize { get; set; }
}

public class Medium11
{
    public int w { get; set; }
    public int h { get; set; }
    public string resize { get; set; }
}

public class Small5
{
    public int w { get; set; }
    public int h { get; set; }
    public string resize { get; set; }
}

public class Large5
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
    public string content_type { get; set; }
    public string url { get; set; }
    public int bitrate { get; set; }
}

public class Additional_Media_Info2
{
    public string title { get; set; }
    public string description { get; set; }
    public bool embeddable { get; set; }
    public bool monetizable { get; set; }
}

public class User2
{
    public int id { get; set; }
    public string id_str { get; set; }
    public string name { get; set; }
    public string screen_name { get; set; }
    public string location { get; set; }
    public string description { get; set; }
    public string url { get; set; }
    public Entities5 entities { get; set; }
    public bool _protected { get; set; }
    public int followers_count { get; set; }
    public int friends_count { get; set; }
    public int listed_count { get; set; }
    public string created_at { get; set; }
    public int favourites_count { get; set; }
    public object utc_offset { get; set; }
    public object time_zone { get; set; }
    public bool geo_enabled { get; set; }
    public bool verified { get; set; }
    public int statuses_count { get; set; }
    public object lang { get; set; }
    public bool contributors_enabled { get; set; }
    public bool is_translator { get; set; }
    public bool is_translation_enabled { get; set; }
    public string profile_background_color { get; set; }
    public string profile_background_image_url { get; set; }
    public string profile_background_image_url_https { get; set; }
    public bool profile_background_tile { get; set; }
    public string profile_image_url { get; set; }
    public string profile_image_url_https { get; set; }
    public string profile_banner_url { get; set; }
    public string profile_link_color { get; set; }
    public string profile_sidebar_border_color { get; set; }
    public string profile_sidebar_fill_color { get; set; }
    public string profile_text_color { get; set; }
    public bool profile_use_background_image { get; set; }
    public bool has_extended_profile { get; set; }
    public bool default_profile { get; set; }
    public bool default_profile_image { get; set; }
    public object following { get; set; }
    public object follow_request_sent { get; set; }
    public object notifications { get; set; }
    public string translator_type { get; set; }
}

public class Entities5
{
    public Url8 url { get; set; }
    public Description2 description { get; set; }
}

public class Url8
{
    public Url9[] urls { get; set; }
}

public class Url9
{
    public string url { get; set; }
    public string expanded_url { get; set; }
    public string display_url { get; set; }
    public int[] indices { get; set; }
}

public class Description2
{
    public object[] urls { get; set; }
}
*/
