import React, { useState } from 'react';
import { Card, Image, Modal, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faHeart } from '@fortawesome/free-solid-svg-icons';
import parseResults from '../services/ParseResults';
import parse from 'html-react-parser';
import TwitterLoading from '../graphics/loading.gif';

function RandomTweet() {
    const [userTweet, setUserTweet] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const users = ['@NASA', '@SpaceX', '@qikipedia', '@PopSci', '@WIREDScience'];
    const [userInfo, setUserInfo] = useState(() => {
        if (sessionStorage.getItem('userInfo')) {
            return (JSON.parse(sessionStorage.getItem('userInfo')));
        } else {
            fetchUsers();
        }
    });

    async function fetchUsers(e) {
        let tempUsers = [];
        for (let user of users) {
            await fetch(`api/tweets/users?user=${user}`).then(async (results) => {
                await (results.json()).then(async (results) => {
                    tempUsers = [...tempUsers, results];
                })
            });
        }
        sessionStorage.setItem('userInfo', JSON.stringify(tempUsers));
        setUserInfo(tempUsers);
    }

    async function fetchUserTweet(screen_name) {
        let tempResult = [];
        await fetch(`api/tweets/users_random?user=${screen_name}`).then(async (results) => {
            await (results.json()).then(async (results) => {
                tempResult.push(results);
                await parseResults(tempResult).then((result) => {
                    setShowModal(true);
                    setUserTweet(result[0][0]);
                });
            })
        });
    }

    function handleClick(screen_name) {
        fetchUserTweet(screen_name);
    }

    function handleClose() {
        setShowModal(false);
    }

    return (
        <div>
            {userInfo === undefined
                ? <Container id="tweet-loading-container" fluid><Image className="media-gif" src={TwitterLoading} /></Container>
                : <div>
                    <Container id="random-tweet-container" fluid>
                        {userInfo.map(
                            (user, index) =>
                                <Card key={index} onClick={() => { handleClick(user.screen_name) }}>
                                    <Card.Img className="random-card-img" variant="top" src={user.profile_banner_url} />
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
                    </Container>
                </div>
            }
            {userTweet.length === 0
                ? <div></div> :
                <Modal show={showModal}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header>
                        <div>
                            {userTweet.retweet === undefined
                                ? <div></div>
                                : <span><FontAwesomeIcon icon={faRetweet} />{userTweet.searchedUserName} Retweeted</span>
                            }
                        </div>
                        <div>
                            <Modal.Title>
                                <Image src={userTweet.user.profile_image_url_https} roundedCircle />
                                <span className="random-username-span">{userTweet.user.name}</span>
                            </Modal.Title>
                            <div className="random-retweet-likes-div">
                                <span className="retweet-count-span">
                                    <FontAwesomeIcon icon={faRetweet} />
                                    {userTweet.retweet_count}
                                </span>
                                <span className="random-likes-count-span">
                                    <FontAwesomeIcon icon={faHeart} />
                                    {userTweet.favorite_count}
                                </span>
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        {parse(userTweet.full_text)}
                        {userTweet.media_text === undefined
                            ? <div></div>
                            : (
                                <div className="modal-media-div">
                                    {parse(userTweet.media_text)}
                                </div>
                            )
                        }
                    </Modal.Body>
                </Modal>
            }
        </div>
    )
}

export default RandomTweet;