import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import parse from 'html-react-parser';

function UserSearch() {
    const [search, setSearch] = useState('');
    const [userTweets, setUserTweets] = useState([]);

    async function fetchUserTweets(e) {
        e.preventDefault();
        let searchInput = search;
        searchInput = searchInput.split(" ").join('');
        await fetch(`api/tweets/timeline?user=${searchInput}`).then(async (results) => {
            await (results.json()).then(async (results) => {
                console.log(results);
                await parseResults(results).then((results) => {
                    setUserTweets(results);
                });
            })
        });
    }

    async function fetchContentTweets(e) {
        // keep search limited to 10 key words and operators
        e.preventDefault();
        let searchInput = search;
        searchInput = searchInput.split(" ").join('');
        await fetch(`api/tweets/search?content=${searchInput}`).then(async (results) => {
            await (results.json()).then(async (results) => {
                console.log(results);
                await parseResults(results).then((results) => {
                    setUserTweets(results);
                });
            })
        });
    }

    function handleOnChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function handleEnterKey(e) {
        if (e.charCode === 13) {
            fetchUserTweets(e);
        }
    }

    async function parseResults(results) {
        let tempTweets = results;
        let text = '';
        let iteration = 0;
        let retweet = false;

        if (tempTweets.statuses !== undefined) {
            tempTweets = tempTweets.statuses;
        }

        for (let tweet of tempTweets) {
            if (tweet.retweeted_status !== null) {
                retweet = true;
                tweet = tweet.retweeted_status;
            }
            console.log('tweet ', tweet);
            text = tweet.full_text;
            if (tweet.entities && tweet.entities !== null) {
                if (tweet.entities.hashtags && tweet.entities.hashtags !== null) {
                    for (let hashtag of tweet.entities.hashtags) {
                        text = text.replace("#" + `${hashtag.text}`, "<a href=\"https://twitter.com/hashtag/"
                            + `${hashtag.text}` + "?src=hashtag_click\">#" + `${hashtag.text}` + "</a>");
                        retweet ? tempTweets[iteration].retweeted_status.full_text = text : tempTweets[iteration].full_text = text;
                    }
                }
                if (tweet.entities.urls && tweet.entities.urls !== null) {
                    for (let urls of tweet.entities.urls) {
                        text = text.replace(`${urls.url}`, "<a href=\"" + `${urls.url}` + "\">" + `${urls.display_url}` + "</a>");
                        retweet ? tempTweets[iteration].retweeted_status.full_text = text : tempTweets[iteration].full_text = text;
                    }
                }
                if (tweet.entities.user_mentions && tweet.entities.user_mentions !== null) {
                    for (let user_mentions of tweet.entities.user_mentions) {
                        let screenNameCaseInsensitive = new RegExp(`${user_mentions.screen_name}`, 'ig');
                        text = text.replace(screenNameCaseInsensitive, `${user_mentions.screen_name}`);
                        text = text.replace("@" + `${user_mentions.screen_name}`, "<a href=\"https://twitter.com/"
                            + `${user_mentions.screen_name}` + "\">@" + `${user_mentions.screen_name}` + "</a>");
                        retweet ? tempTweets[iteration].retweeted_status.full_text = text : tempTweets[iteration].full_text = text;
                    }
                }
            } if (tweet.extended_entities && tweet.extended_entities !== null) {
                if (tweet.extended_entities.media && tweet.extended_entities.media !== null) {
                    for (let media of tweet.extended_entities.media) {
                        let url = '';
                        let format = '';
                        let height = 383;
                        let width = 680;
                        switch (media.type) {
                            case 'photo':
                                url = (media.media_url_https).slice(0, -4);
                                format = (media.media_url_https).slice(-3);
                                text = text.replace(`${media.url}`, "<div class=\"media_photo\"><Image src=\"" + `${url}`
                                    + "?format=" + `${format}` + "&name=small\" fluid/></div>");
                                retweet ? tempTweets[iteration].retweeted_status.full_text = text : tempTweets[iteration].full_text = text;
                                break;
                            case 'video':
                                url = (media.media_url_https).slice(0, -4);
                                format = (media.media_url_https).slice(-3);
                                text = text.replace(`${media.url}`, "<div><video width=\"" + `${width}` + "\" height=\"" + `${height}`
                                    + "\" preload=\"none\" playsinline controls poster=\"" + `${url}` + "?format=" + `${format}` +
                                    "&name=small\"><source src=\"" + `${media.video_info.variants[3].url}` + "\" type=\"" + `${media.video_info.variants[3].content_type}`
                                    + "\"></video></div>");
                                retweet ? tempTweets[iteration].retweeted_status.full_text = text : tempTweets[iteration].full_text = text;
                                break;
                            case 'animated_gif':
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
            retweet = false;
            iteration++;
        }
        return tempTweets;
    }

    return (
        <div>
            <h2>Lets search for a twitter user or content</h2>
            <div id="search-bar-div">
                <Form.Control type="text" placeholder="Search" className="mr-sm-2" onChange={handleOnChange} value={search} onKeyPress={handleEnterKey} />
                <Button variant="outline-success" onClick={fetchUserTweets}>Search User</Button>
                <Button variant="outline-success" onClick={fetchContentTweets}>Search Content</Button>
            </div>
            {userTweets.length === 0
                ? <div></div>
                : userTweets.map
                    ((tweet, index) =>
                        (
                            <Card key={index}>
                                {tweet.retweeted_status === null
                                    ? (
                                        <div>
                                            <Card.Title>
                                                <Image src={tweet.user.profile_image_url_https} roundedCircle />
                                                <span>{tweet.user.name}</span>
                                                <span>@{tweet.user.screen_name}</span>
                                            </Card.Title>
                                            <Card.Body>
                                                {parse(tweet.full_text)}
                                                <div>
                                                    <FontAwesomeIcon icon={faRetweet} />
                                                    {tweet.retweet_count}
                                                    <FontAwesomeIcon icon={faHeart} />
                                                    {tweet.favorite_count}
                                                </div>
                                            </Card.Body>
                                        </div>
                                    )
                                    : (
                                        <div>
                                            <Card.Title>
                                                <span>{tweet.user.name} Retweeted</span>
                                                <br />
                                                <Image src={tweet.retweeted_status.user.profile_image_url_https} roundedCircle />
                                                <span>{tweet.retweeted_status.user.name}</span>
                                                <span>@{tweet.retweeted_status.user.screen_name}</span>
                                            </Card.Title>
                                            <Card.Body>
                                                {parse(tweet.retweeted_status.full_text)}
                                                <div>
                                                    <FontAwesomeIcon icon={faRetweet} />
                                                    {tweet.retweet_count}
                                                    <FontAwesomeIcon icon={faHeart} />
                                                    {tweet.favorite_count}
                                                </div>
                                            </Card.Body>
                                        </div>
                                    )
                                }
                            </Card>
                        )
                    )
            }
        </div>
    )
}

export default UserSearch;