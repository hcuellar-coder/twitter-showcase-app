import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import parseResults from '../services/ParseResults';
import Tweets from './Tweets';
import './UserSearch.css';


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

    return (
        <div>
            <h2 id="user-search-h2">Search for a Twitter User or Content</h2>
            <div id="search-bar-div">
                <Form.Control id="searchBar" type="text" placeholder="Search" onChange={handleOnChange} value={search} />
                <Button variant="primary" onClick={fetchUserTweets}>User</Button>
                <Button variant="success" onClick={fetchContentTweets}>Content</Button>
            </div>
            <Tweets userTweets={userTweets} />
        </div>
    )
}

export default UserSearch;