import React, { useEffect, useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

function UserSearch() {
    const [userTweets, setUserTweets] = useState([]);

    useEffect(() => {
        console.log('running UserSearch!');
    })

    async function fetchUserTweets() {
        await fetch('api/tweets').then(async (results) => {
            await (results.json()).then((results) => {
                console.log(results);
                setUserTweets(results);
            })
        })
    }

    // useEffect(() => {
    //     console.log(userTweets);
    // }, [userTweets]);


    return (
        <div>
            <h2>Lets search for a twitter user or content</h2>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success" onClick={fetchUserTweets}>Search</Button>
            </Form>
            {userTweets.length === 0
                ? <div>Nothing</div>
                : userTweets.map((tweet, index) => (<div key={index}>{tweet.id}</div>))
            }
        </div>
    )
}

export default UserSearch;