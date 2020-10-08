import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Image } from 'react-bootstrap';

function UserSearch() {
    const [search, setSearch] = useState('');
    const [userTweets, setUserTweets] = useState([]);
    const [parsedTweets, setParsedTweets] = useState([]);
    const [mediaText, setMediaText] = useState('');

    async function fetchUserTweets(e) {
        e.preventDefault();
        let searchInput = search;
        searchInput = searchInput.split(" ").join('');
        await fetch(`api/tweets/timeline?user=${searchInput}`).then(async (results) => {
            await (results.json()).then((results) => {
                console.log(results);
                setUserTweets(results);
            })
        });
    }

    // async function parseText() {
    //     for (let tweet of userTweets) {
    //         let text = tweet.full_text.split('');
    //         console.log(text);
    //         if (tweet.entities.media !== null) {
    //             for (let media of tweet.entities.media) {
    //                 console.log(media.indices[0]);
    //                 text.splice(media.indices[0], (media.indices[1] - media.indices[0]), ` <a href="${media.media_url_https}">${media.display_url}<a> `)
    //                 text = text.join('');
    //             }
    //             setMediaText(text);
    //             console.log(text);
    //         }
    //         console.log(tweet.full_text);
    //         console.log(tweet.entities);
    //     }
    // }



    function handleOnChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function handleEnterKey(e) {
        if (e.charCode === 13) {
            fetchUserTweets(e);
        }
    }

    // useEffect(() => {
    //     parseText(userTweets);
    // }, [userTweets]);

    // useEffect(() => {
    //     console.log(search);
    // }, [search]);

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
                                            <Card.Body>{tweet.full_text}</Card.Body>
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
                                            <Card.Body>{tweet.retweeted_status.full_text}</Card.Body>
                                        </div>
                                    )
                                }
                            </Card>
                        )
                    )
            }
            {/* {
                mediaText === ''
                    ? <div></div>
                    : (<Card>
                        <Card.Body>{mediaText}</Card.Body>
                    </Card>)
            } */}

        </div>
    )
}

export default UserSearch;