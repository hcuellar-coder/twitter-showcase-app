import React, { useEffect, useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

function UserSearch() {
    const [search, setSearch] = useState('');
    const [userTweets, setUserTweets] = useState([]);

    useEffect(() => {
        console.log('running UserSearch!');
    })

    async function fetchUserTweets() {
        await fetch(`api/tweets/timeline?user=${search}`).then(async (results) => {
            await (results.json()).then((results) => {

                console.log(results);
                setUserTweets(results);
            })
        });

        // await fetch('api/tweets').then(async (results) => {
        //     await (results.json()).then((results) => {
        //         console.log(results);
        //         setUserTweets(results);
        //     })
        // })
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
                : userTweets.map((tweet, index) => (<div key={index}>{tweet.id}</div>))
            }
        </div>
    )
}

export default UserSearch;