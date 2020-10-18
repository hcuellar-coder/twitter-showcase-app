import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import parseResults from '../services/ParseResults';
import Tweets from './Tweets';
import Errors from './Errors';
import TwitterLoading from '../graphics/loading.gif';


function Search() {
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState('');
    const [fetchedTweets, setFetchedTweets] = useState([]);
    const [lastId, setLastId] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchFailed, setFetchFailed] = useState(false);

    async function fetchUserTweets(e) {
        if (search !== '') {
            setFetchFailed(false);
            setIsLoading(true);
            setSearchType('user');
            let searchInput = search;
            sessionStorage.setItem('searchInput', searchInput);
            sessionStorage.setItem('searchType', 'user');
            searchInput = searchInput.split(" ").join('');
            await fetch(`api/tweets/timeline?user=${searchInput}`).then(async (results) => {
                if (results.status >= 200 && results.status <= 299) {
                    await (results.json()).then(async (results) => {
                        await parseResults(results).then((results) => {
                            setFetchedTweets(results[0]);
                            setLastId(results[1]);
                            sessionStorage.setItem('searchResults', JSON.stringify(results[0]));
                            sessionStorage.setItem('lastId', results[1]);
                            setIsLoading(false);
                        });
                    })
                } else {
                    setFetchFailed(true);
                }
            });
        }
    }

    async function fetchCursorUserTweets(e) {
        if (!fetchFailed) {
            setIsFetching(false);
            let searchInput = search;
            searchInput = searchInput.split(" ").join('');
            await fetch(`api/tweets/cursor_timeline?user=${searchInput}&lastId=${lastId}`).then(async (results) => {
                if (results.status >= 200 && results.status <= 299) {
                    await (results.json()).then(async (results) => {
                        await parseResults(results).then((results) => {
                            const newList = [...fetchedTweets, ...results[0]];
                            setFetchedTweets(newList);
                            setLastId(results[1]);
                        });
                    })
                } else {
                    setFetchFailed(true);
                }
            });
        }
    }

    async function fetchContentTweets(e) {
        if (search !== '') {
            setFetchFailed(false);
            setIsLoading(true);
            setSearchType('content');
            let searchInput = search;
            sessionStorage.setItem('searchInput', searchInput);
            sessionStorage.setItem('searchType', 'content');
            await fetch(`api/tweets/search?content=${searchInput}`).then(async (results) => {
                if (results.status >= 200 && results.status <= 299) {
                    await (results.json()).then(async (results) => {
                        await parseResults(results).then((results) => {
                            if (results[0].length === 0) {
                                setFetchFailed(true);
                            } else {
                                setFetchedTweets(results[0]);
                                setLastId(results[1]);
                                sessionStorage.setItem('searchResults', JSON.stringify(results[0]));
                                sessionStorage.setItem('lastId', results[1]);
                                setIsLoading(false);
                            }
                        });
                    })
                } else {
                    setFetchFailed(true);
                }
            });
        }
    }

    async function fetchCursorContentTweets(e) {
        if (!fetchFailed) {
            setIsFetching(false);
            let searchInput = search;
            await fetch(`api/tweets/cursor_search?content=${searchInput}&lastId=${lastId}`).then(async (results) => {
                if (results.status >= 200 && results.status <= 299) {
                    await (results.json()).then(async (results) => {
                        await parseResults(results).then((results) => {
                            const newList = [...fetchedTweets, ...results[0]];
                            setFetchedTweets(newList);
                            setLastId(results[1]);
                        });
                    })
                } else {
                    setFetchFailed(true);
                }
            });
        }
    }

    function handleOnChange(e) {
        e.preventDefault();
        setSearchType('');
        setSearch(e.target.value);
    }

    function handleScroll() {
        let scrollPos = window.innerHeight + document.documentElement.scrollTop;
        let documentHeight = document.documentElement.offsetHeight;


        if (scrollPos >= (documentHeight - 1000)) {
            setIsFetching(true);
        }
    }

    function handleClearButton(e) {
        e.preventDefault();
        setSearch('');
        setFetchedTweets([]);
        setLastId('');
        setSearchType('');
        setIsLoading(false);
        setFetchFailed(false);
        sessionStorage.removeItem('searchInput');
        sessionStorage.removeItem('searchResults');
        sessionStorage.removeItem('lastId');
        sessionStorage.removeItem('searchType');

    }

    function handleSessionStorage() {
        if (sessionStorage.getItem('searchInput')) {
            setSearch(sessionStorage.getItem('searchInput'));
            setFetchedTweets(JSON.parse(sessionStorage.getItem('searchResults')));
            setLastId(sessionStorage.getItem('lastId'));
            setSearchType(sessionStorage.getItem('searchType'));
        }
    }

    useEffect(() => {
        handleSessionStorage();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    useEffect(() => {
        if (!isFetching) {
            return;
        } else {
            if (searchType === 'user') {
                fetchCursorUserTweets();
            } else {
                fetchCursorContentTweets();
            }
        }
    }, [isFetching])

    useEffect(() => {
        if (fetchFailed) {
            sessionStorage.removeItem('searchInput');
            sessionStorage.removeItem('searchType');
        }

    }, [fetchFailed])




    return (
        <div id="search-div">
            <h2 id="user-search-h2">Search for User or Content Tweets</h2>
            <div id="search-bar-div">
                <Form.Control id="search-bar" type="text" placeholder="Search" onChange={handleOnChange} value={search} autoComplete="off" />
                <Button id="search-clear-button" onClick={handleClearButton}><FontAwesomeIcon icon={faTimesCircle} /></Button>
            </div>
            <div id="buttons-div">
                <Button className="button" active={searchType === 'user' ? true : false} variant="secondary" onClick={fetchUserTweets}>User</Button>
                <Button className="button" active={searchType === 'content' ? true : false} variant="secondary" onClick={fetchContentTweets}>Content</Button>
            </div>
            {fetchFailed ?
                <Errors searchType={searchType} />
                :
                (fetchedTweets.length === 0) ?
                    (isLoading ? <Container id="tweet-loading-container" fluid><Image className="media-gif" src={TwitterLoading} /></Container> : <div></div>)
                    :
                    <Tweets fetchedTweets={fetchedTweets} />
            }
        </div>
    )
}

export default Search;