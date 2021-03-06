import React, { useState } from 'react';
import { Card, Image, Container, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import parseModal from '../services/ParseModal';
import parse from 'html-react-parser';

function Tweets(props) {
    const [showModal, setShowModal] = useState(false);
    const [modalMedia, setModalMedia] = useState('');

    function handleClick(media) {
        if (media !== null && window.innerWidth <= 600) {
            let modalText = parseModal(media);
            setModalMedia(modalText);
            setShowModal(true);
        }
    }

    function handleClose() {
        setShowModal(false);
    }

    return (
        <div id="tweets-div">
            {props.fetchedTweets === undefined
                ? <div></div>
                : <Container fluid>
                    {props.fetchedTweets.map
                        ((tweet, index) =>
                            (
                                <Card className="tweet-card" key={index} >
                                    <Card.Title>
                                        {tweet.retweet === undefined
                                            ? <div></div>
                                            : <span className="retweeted-span">
                                                <FontAwesomeIcon icon={faRetweet} />{tweet.searchedUserName} Retweeted
                                              </span>
                                        }
                                        <div className="tweet-title-div">
                                            <div className="tweet-user-image-name">
                                                <Image className="user-image-round" src={tweet.user.profile_image_url_https} roundedCircle />
                                                <span className="username-span">{tweet.user.name}</span>
                                            </div>
                                            <div className="screen-name-div">
                                                <span className="screen-name-span">@{tweet.user.screen_name} - {tweet.timestamp}</span>
                                            </div>
                                            <div className="retweet-likes-span">
                                                <span className="retweet-count-span">
                                                    <FontAwesomeIcon icon={faRetweet} />
                                                    {tweet.retweet_count}
                                                </span>
                                                <span className="likes-count-span">
                                                    <FontAwesomeIcon icon={faHeart} />
                                                    {tweet.favorite_count}
                                                </span>
                                            </div>
                                        </div>
                                    </Card.Title>
                                    <Card.Body >
                                        {parse(tweet.full_text)}
                                        {tweet.media_text === undefined
                                            ? <div></div>
                                            : (
                                                <div onClick={() => { handleClick(tweet.extended_entities !== null ? tweet.extended_entities.media : null) }}>
                                                    {parse(tweet.media_text)}
                                                </div>
                                            )
                                        }
                                    </Card.Body>
                                </Card>
                            )
                        )
                    }
                </Container>
            }
            {props.fetchedTweets === undefined
                ? <div></div> :
                <Modal show={showModal}
                    onHide={handleClose}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header className="tweet-header-media-modal" closeButton />
                    <Modal.Body >{parse(modalMedia)}</Modal.Body>
                </Modal>
            }
        </div>
    )
}

export default Tweets;