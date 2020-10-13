export default async function parseResults(results) {
    let tempTweets = results;
    let text = '';
    let iteration = 0;
    let last_id = '';

    if (tempTweets.statuses !== undefined) {
        tempTweets = tempTweets.statuses;
    }
    // console.log('tempTweets = ', tempTweets);
    for (let tweet of tempTweets) {
        // console.log(tweet);
        last_id = tweet.id_str;
        if (tweet.retweeted_status !== null) {
            let searchedUserName = tweet.user.name;
            tempTweets[iteration] = tweet.retweeted_status;
            tempTweets[iteration].retweet = true;
            tempTweets[iteration].searchedUserName = searchedUserName;
            tweet = tweet.retweeted_status;
        }
        console.log(tweet);
        tempTweets[iteration].timestamp = convertTime(tweet.created_at);
        text = tweet.full_text;
        if (tweet.entities && tweet.entities !== null) {
            if (tweet.entities.hashtags && tweet.entities.hashtags !== null) {
                for (let hashtag of tweet.entities.hashtags) {
                    text = text.replace(`#${hashtag.text}`, `<a href="https://twitter.com/hashtag/
                        ${hashtag.text}?src=hashtag_click">#${hashtag.text}</a>`);
                    tempTweets[iteration].full_text = text;
                }
            }
            if (tweet.entities.urls && tweet.entities.urls !== null) {
                for (let urls of tweet.entities.urls) {
                    text = text.replace(`${urls.url}`, `<a href="${urls.expanded_url}">${urls.display_url}</a>`);
                    tempTweets[iteration].full_text = text;
                }
            }
            if (tweet.entities.user_mentions && tweet.entities.user_mentions !== null) {
                for (let user_mentions of tweet.entities.user_mentions) {
                    let screenNameCaseInsensitive = new RegExp(`${user_mentions.screen_name}`, 'ig');
                    text = text.replace(screenNameCaseInsensitive, `${user_mentions.screen_name}`);
                    text = text.replace(`@${user_mentions.screen_name}`, `<a href="https://twitter.com/
                        ${user_mentions.screen_name}">@${user_mentions.screen_name}</a>`);
                    tempTweets[iteration].full_text = text;
                }
            }
        } if (tweet.extended_entities && tweet.extended_entities !== null) {
            if (tweet.extended_entities.media && tweet.extended_entities.media !== null) {
                for (let media of tweet.extended_entities.media) {
                    let url = '';
                    let format = '';
                    let video = '';
                    let videoContentType = '';
                    let height = 383;
                    let width = 680;
                    switch (media.type) {
                        case 'photo':
                            url = (media.media_url_https).slice(0, -4);
                            format = (media.media_url_https).slice(-3);
                            text = text.replace(`${media.url}`, `<div class="media_photo"><Image 
                                src="${url}?format=${format}&name=small" fluid/></div>`);
                            tempTweets[iteration].full_text = text;
                            break;
                        case 'video':
                            for (let variant of media.video_info.variants) {
                                let bitrate = 0;
                                if (variant.content_type === 'video/mp4') {
                                    if (variant.bitrate > bitrate) {
                                        bitrate = variant.bitrate;
                                        video = variant.url;
                                        videoContentType = variant.content_type;
                                    }
                                }
                            }
                            url = (media.media_url_https).slice(0, -4);
                            format = (media.media_url_https).slice(-3);
                            text = text.replace(`${media.url}`, `<div><video width="${width}" height="${height}"
                                preload="none" playsinline controls poster="${url}?format=${format}&name=small">
                                <source src="${video}" type="${videoContentType}"></video></div>`);
                            tempTweets[iteration].full_text = text;
                            break;
                        case 'animated_gif':
                            text = text.replace(`${media.url}`, `<div><video autoplay loop muted width="${width}" height="${height}"
                                preload="auto" playsinline poster="${media.media_url_https}" src="${media.video_info.variants[0].url}"
                                type="${media.video_info.variants[0].content_type}" autoplay></video></div>`);
                            tempTweets[iteration].full_text = text;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        iteration++;
    }
    return [tempTweets, last_id];
}


function convertTime(textTime) {
    const tweetTime = new Date(textTime);
    const difference = new Date() - tweetTime;

    const seconds = (difference / 1000).toFixed(0);
    const minutes = (difference / (1000 * 60)).toFixed(0);
    const hours = Math.floor((difference / (1000 * 60 * 60)));

    const month = tweetTime.toLocaleString('default', { month: 'short' });
    const day = tweetTime.toLocaleString('default', { day: 'numeric' });

    if (seconds < 60) {
        return seconds + "s";
    } else if (minutes < 60) {
        return minutes + "m";
    } else if (hours < 24) {
        return hours + "h";
    } else {
        return month + " " + day;
    }
}
