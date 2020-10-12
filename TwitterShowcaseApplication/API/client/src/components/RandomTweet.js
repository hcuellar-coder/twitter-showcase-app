import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Image, CardDeck } from 'react-bootstrap';

function RandomTweet() {
    const [search, setSearch] = useState('');
    const [userInfo, setUserInfo] = useState([]);
    const [userTweets, setUserTweets] = useState([]);
    const users = ['@NASA', '@joerogan', '@SirPatStew', '@IanMcKellen', '@HenryLovesYou'];

    async function fetchUsers(e) {
        console.log('fetchUsers');
        let tempUsers = [];
        for (let user of users) {
            await fetch(`api/tweets/users?user=${user}`).then(async (results) => {
                await (results.json()).then(async (results) => {
                    tempUsers = [...tempUsers, results];
                })
            });
        }
        setUserInfo(tempUsers);
    }

    // async function fetchUserTweet(e) {
    //     console.log('fetchUserTweet');
    //     let searchInput = search;
    //     searchInput = searchInput.split(" ").join('');
    //     await fetch(`api/tweets/users?user=${searchInput}`).then(async (results) => {
    //         await (results.json()).then(async (results) => {
    //             await parseResults(results).then((results) => {
    //                 setUserTweets(results);
    //             });
    //         })
    //     });
    // }

    useEffect(() => {
        fetchUsers();
    }, [])


    return (
        <div>Random Tweet
            <CardDeck>
                <Card>

                </Card>
            </CardDeck>
        </div>
    )
}

export default RandomTweet;