import React, { useEffect, useState } from 'react';
import { Card, Image, CardDeck, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import parseResults from '../services/ParseResults';
import parse from 'html-react-parser';

function RandomTweet() {
    const [userInfo, setUserInfo] = useState([]);
    const [userTweet, setUserTweet] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const users = ['@NASA', '@SpaceX', '@qikipedia', '@PopSci', '@WIREDScience'];

    async function fetchUsers(e) {
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

    async function fetchUserTweet(screen_name) {
        let tempResult = [];
        console.log('fetchUserTweet');
        await fetch(`api/tweets/users_random?user=${screen_name}`).then(async (results) => {
            await (results.json()).then(async (results) => {
                console.log('before parse = ', results);
                tempResult.push(results);
                await parseResults(tempResult).then((result) => {
                    setShowModal(true);
                    console.log(result);
                    setUserTweet(result[0][0]);
                });
            })
        });
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    // useEffect(() => {
    //     console.log(userInfo);
    // }, [userInfo])

    // useEffect(() => {
    //     console.log(userTweet);
    // }, [userTweet])


    function handleClick(screen_name) {
        fetchUserTweet(screen_name);
    }

    function handleClose() {
        setShowModal(false);
    }

    return (
        <div>
            {userInfo.length === 0
                ? <div></div>
                : <div>
                    <CardDeck>
                        {userInfo.map(
                            (user, index) =>
                                <Card key={index} onClick={() => { handleClick(user.screen_name) }}>
                                    <Card.Img variant="top" src={user.profile_banner_url} />
                                    <Card.Body>
                                        <Card.Title>
                                            <Card.ImgOverlay><Image src={user.profile_image_url_https} roundedCircle /></Card.ImgOverlay>
                                            {user.name}
                                        </Card.Title>
                                        <Card.Subtitle>@{user.screen_name}</Card.Subtitle>
                                    </Card.Body>
                                </Card>

                        )
                        }
                    </CardDeck>
                </div>
            }
            {userTweet.length === 0
                ? <div></div> :
                <Modal show={showModal}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Image src={userTweet.user.profile_image_url_https} roundedCircle />
                        <Modal.Title>{userTweet.user.name}</Modal.Title>
                        {userTweet.retweet === undefined
                            ? <div></div>
                            : <span><FontAwesomeIcon icon={faRetweet} />{userTweet.searchedUserName} Retweeted</span>
                        }
                    </Modal.Header>
                    <Modal.Body>{parse(userTweet.full_text)}</Modal.Body>
                </Modal>
            }
        </div>
    )
}

export default RandomTweet;