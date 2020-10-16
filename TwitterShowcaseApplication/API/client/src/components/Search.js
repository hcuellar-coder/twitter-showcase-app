import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import parseResults from '../services/ParseResults';
import Tweets from './Tweets';


function Search() {
    const [search, setSearch] = useState('');
    const [fetchedTweets, setFetchedTweets] = useState([]);
    const [lastId, setLastId] = useState('');
    const [userSearchBool, setUserSearchBool] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    async function fetchUserTweets(e) {
        if (search !== '') {
            setUserSearchBool(true);
            let searchInput = search;
            localStorage.setItem('searchInput', searchInput);
            localStorage.setItem('UserSearchBool', true);
            searchInput = searchInput.split(" ").join('');
            await fetch(`api/tweets/timeline?user=${searchInput}`).then(async (results) => {
                await (results.json()).then(async (results) => {
                    await parseResults(results).then((results) => {
                        setFetchedTweets(results[0]);
                        setLastId(results[1]);
                        localStorage.setItem('searchResults', JSON.stringify(results[0]));
                        localStorage.setItem('lastId', results[1]);
                    });
                })
            });
        }
    }

    async function fetchCursorUserTweets(e) {
        setIsFetching(false);
        let searchInput = search;
        searchInput = searchInput.split(" ").join('');
        await fetch(`api/tweets/cursor_timeline?user=${searchInput}&lastId=${lastId}`).then(async (results) => {
            await (results.json()).then(async (results) => {
                await parseResults(results).then((results) => {
                    const newList = [...fetchedTweets, ...results[0]];
                    setFetchedTweets(newList);
                    setLastId(results[1]);
                });
            })
        });
    }

    async function fetchContentTweets(e) {
        if (search !== '') {
            setUserSearchBool(false);
            let searchInput = search;
            localStorage.setItem('searchInput', searchInput);
            localStorage.setItem('UserSearchBool', false);
            await fetch(`api/tweets/search?content=${searchInput}`).then(async (results) => {
                await (results.json()).then(async (results) => {
                    await parseResults(results).then((results) => {
                        setFetchedTweets(results[0]);
                        setLastId(results[1]);
                        localStorage.setItem('searchResults', JSON.stringify(results[0]));
                        localStorage.setItem('lastId', results[1]);
                    });
                })
            });
        }
    }

    async function fetchCursorContentTweets(e) {
        setIsFetching(false);
        let searchInput = search;
        await fetch(`api/tweets/cursor_search?content=${searchInput}&lastId=${lastId}`).then(async (results) => {
            await (results.json()).then(async (results) => {
                await parseResults(results).then((results) => {
                    const newList = [...fetchedTweets, ...results[0]];
                    setFetchedTweets(newList);
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
    }

    function handleLocalStorage() {
        console.log('handling localstorage');
        if (localStorage.getItem('searchInput')) {
            setSearch(localStorage.getItem('searchInput'));
            setFetchedTweets(JSON.parse(localStorage.getItem('searchResults')));
            setLastId(localStorage.getItem('lastId'));
            setUserSearchBool(localStorage.getItem('UserSearchBool'));
        }
    }

    useEffect(() => {
        handleLocalStorage();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    useEffect(() => {
        if (!isFetching) return;
        userSearchBool ? fetchCursorUserTweets() : fetchCursorContentTweets()
    }, [isFetching])

    return (
        <div>
            <h2 id="user-search-h2">Search for User or Content Tweets</h2>
            <div id="search-bar-div">
                <Form.Control id="searchBar" type="text" placeholder="Search" onChange={handleOnChange} value={search} autoComplete="off" />
                <div id="buttons-div">
                    <Button className="button" variant="primary" onClick={fetchUserTweets}>User</Button>
                    <Button className="button" variant="success" onClick={fetchContentTweets}>Content</Button>
                </div>
            </div>
            <Tweets fetchedTweets={fetchedTweets} />
        </div>
    )
}

export default Search;