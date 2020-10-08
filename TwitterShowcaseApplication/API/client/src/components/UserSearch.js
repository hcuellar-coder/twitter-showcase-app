import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Image } from 'react-bootstrap';
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

        for (let tweet of tempTweets) {
            if (tweet.retweeted_status !== null) {
                retweet = true;
                tweet = tweet.retweeted_status;
            }
            text = tweet.full_text;
            if (tweet.entities && tweet.entities !== null) {
                if (tweet.entities.hashtags && tweet.entities.hashtags !== null) {
                    for (let hashtag of tweet.entities.hashtags) {
                        text = text.replace("#" + `${hashtag.text}`, "<a href=\"https://twitter.com/hashtag/" + `${hashtag.text}` + "?src=hashtag_click\">#" + `${hashtag.text}` + "</a>");
                        retweet ? tempTweets[iteration].retweeted_status.full_text = text : tempTweets[iteration].full_text = text;
                    }
                }
                if (tweet.entities.media && tweet.entities.media !== null) {
                    for (let media of tweet.entities.media) {
                        // text = text.replace("#" + `${hashtag.text}`, "<a href=\"https://twitter.com/hashtag/" + `${hashtag.text}` + "?src=hashtag_click\">#" + `${hashtag.text}` + "</a>");
                        // tempTweets[iteration].full_text = text;
                        //#ieatelk  https://twitter.com/hashtag/ieatelk?src=hashtag_click
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
                        text = text.replace("@" + `${user_mentions.screen_name}`, "<a href=\"https://twitter.com/" + `${user_mentions.screen_name}` + "\">@" + `${user_mentions.screen_name}` + "</a>");
                        retweet ? tempTweets[iteration].retweeted_status.full_text = text : tempTweets[iteration].full_text = text;
                    }
                }
                console.log('media', tweet.entities.media);
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
                <Button variant="outline-success" onClick={fetchUserTweets}>Search</Button>
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
                                            <Card.Body>{parse(tweet.full_text)}</Card.Body>
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
                                            <Card.Body>{parse(tweet.retweeted_status.full_text)}</Card.Body>
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