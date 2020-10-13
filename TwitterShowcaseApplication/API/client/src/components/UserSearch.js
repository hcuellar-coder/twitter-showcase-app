import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import parseResults from '../services/ParseResults';
import parse from 'html-react-parser';

function UserSearch() {
    const [search, setSearch] = useState('');
    const [userTweets, setUserTweets] = useState([]);
    const [lastId, setLastId] = useState('');
    const [userSearchBool, setUserSearchBool] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    async function fetchUserTweets(e) {
        setUserSearchBool(true);
        console.log('fetchUserTweets');
        let searchInput = search;
        searchInput = searchInput.split(" ").join('');
        await fetch(`api/tweets/timeline?user=${searchInput}`).then(async (results) => {
            await (results.json()).then(async (results) => {
                console.log('before parse = ', results);
                await parseResults(results).then((results) => {
                    console.log(results);
                    setUserTweets(results[0]);
                    setLastId(results[1]);
                });
            })
        });
    }

    async function fetchCursorUserTweets(e) {
        console.log('fetchCursorUserTweets');
        setIsFetching(false);
        let searchInput = search;
        searchInput = searchInput.split(" ").join('');
        await fetch(`api/tweets/cursor_timeline?user=${searchInput}&lastId=${lastId}`).then(async (results) => {
            await (results.json()).then(async (results) => {
                console.log('before parse = ', results);
                await parseResults(results).then((results) => {
                    const newList = [...userTweets, ...results[0]];
                    setUserTweets(newList);
                    setLastId(results[1]);
                });
            })
        });
    }

    async function fetchContentTweets(e) {
        setUserSearchBool(false);
        console.log('fetchContentTweets');
        let searchInput = search;
        await fetch(`api/tweets/search?content=${searchInput}`).then(async (results) => {
            await (results.json()).then(async (results) => {
                await parseResults(results).then((results) => {
                    setUserTweets(results[0]);
                    setLastId(results[1]);
                });
            })
        });
    }

    async function fetchCursorContentTweets(e) {
        console.log('fetchCursorContentTweets');
        setIsFetching(false);
        let searchInput = search;
        await fetch(`api/tweets/cursor_search?content=${searchInput}&lastId=${lastId}`).then(async (results) => {
            await (results.json()).then(async (results) => {
                console.log('before parse = ', results);
                await parseResults(results).then((results) => {
                    console.log('after parse = ', results);
                    const newList = [...userTweets, ...results[0]];
                    setUserTweets(newList);
                    setLastId(results[1]);
                });
            })
        });
    }

    function handleOnChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setIsFetching(true);
        console.log('Fetch more list items!');
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    useEffect(() => {
        if (!isFetching) return;
        console.log('userSearchBool = ', userSearchBool);
        userSearchBool ? fetchCursorUserTweets() : fetchCursorContentTweets()
    }, [isFetching])

    const Tweets = () => (
        <div>
            {userTweets.length === 0
                ? <div></div>
                : userTweets.map
                    ((tweet, index) =>
                        (
                            <Card key={index}>
                                <div>
                                    <Card.Title>
                                        {tweet.retweet === undefined
                                            ? <div></div>
                                            : <span><FontAwesomeIcon icon={faRetweet} />{tweet.searchedUserName} Retweeted</span>
                                        }
                                        <div>
                                            <Image src={tweet.user.profile_image_url_https} roundedCircle />
                                            <span>{tweet.user.name}</span>
                                            <span>@{tweet.user.screen_name}</span>
                                        </div>
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
                            </Card>
                        )
                    )
            }
        </div>
    )

    return (
        <div>
            <h2>Lets search for a twitter user or content</h2>
            <div id="search-bar-div">
                <Form.Control type="text" placeholder="Search" className="mr-sm-2" onChange={handleOnChange} value={search} />
                <Button variant="outline-success" onClick={fetchUserTweets}>Search User</Button>
                <Button variant="outline-success" onClick={fetchContentTweets}>Search Content</Button>
            </div>
            <Tweets />
        </div>
    )
}

export default UserSearch;