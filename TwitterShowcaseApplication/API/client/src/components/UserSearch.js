import React, { useEffect, useState } from 'react';
import { Form, FormControl, Button, Card } from 'react-bootstrap';

function UserSearch() {
    const [search, setSearch] = useState('');
    const [userTweets, setUserTweets] = useState([]);

    useEffect(() => {
        console.log('running UserSearch!');
    })

    async function fetchUserTweets() {
        let searchInput = search;
        searchInput = searchInput.split(" ").join('');
        await fetch(`api/tweets/timeline?user=${searchInput}`).then(async (results) => {
             await (results.json()).then((results) => {
                 console.log(results);
                 setUserTweets(results);
             })
         });
    }

    function handleOnChange(e) {
        setSearch(e.target.value);
    }

    // useEffect(() => {
    //     console.log(userTweets);
    // }, [userTweets]);

    // useEffect(() => {
    //     console.log(search);
    // }, [search]);

    return (
        <div>
            <h2>Lets search for a twitter user or content</h2>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={handleOnChange} value={search} />
                <Button variant="outline-success" onClick={fetchUserTweets}>Search</Button>
            </Form>
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
                                                <img src={tweet.user.profile_image_url_https} />
                                                <span>{tweet.user.name}</span>
                                                <span>@{tweet.user.screen_name}</span>
                                            </Card.Title>
                                            <Card.Body>{tweet.text}</Card.Body>
                                        </div>
                                    )
                                    : (
                                        <div>
                                            <Card.Title>
                                                <span>{tweet.user.name} Retweeted</span>
                                                <br/>
                                                <img src={tweet.retweeted_status.user.profile_image_url_https} />
                                                <span>{tweet.retweeted_status.user.name}</span>
                                                <span>@{tweet.retweeted_status.user.screen_name}</span>
                                            </Card.Title>
                                                <Card.Body>{tweet.retweeted_status.text}</Card.Body>
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