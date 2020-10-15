import React from 'react';
import { Card, Image, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import parse from 'html-react-parser';
import './Tweet.css';

function Tweets(props) {

    return (
        <div>
            {props.userTweets.length === 0
                ? <div></div>
                : <Container fluid>
                    {props.userTweets.map
                        ((tweet, index) =>
                            (
                                <Card key={index}>
                                    <Card.Title>
                                        {tweet.retweet === undefined
                                            ? <div></div>
                                            : <span className="retweeted-span"><FontAwesomeIcon icon={faRetweet} />{tweet.searchedUserName} Retweeted</span>
                                        }
                                        <div className="tweet-title-div">
                                            <Image src={tweet.user.profile_image_url_https} roundedCircle />
                                            <span className="username-span">{tweet.user.name}</span>
                                            <span className="screen-name-span">@{tweet.user.screen_name} - {tweet.timestamp}</span>
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
                                    <Card.Body>
                                        {parse(tweet.full_text)}

                                    </Card.Body>
                                </Card>
                            )
                        )
                    }
                </Container>
            }
        </div >
    )
}

export default Tweets;

/* className="card-body

return (
        <div>
            {props.userTweets.length === 0
                ? <div></div>
                : <div>
                    {props.userTweets.map
                        ((tweet, index) =>
                            (
                                <Card key={index}>
                                    <Card.Title>
                                        {tweet.retweet === undefined
                                            ? <div></div>
                                            : <span><FontAwesomeIcon icon={faRetweet} />{tweet.searchedUserName} Retweeted</span>
                                        }
                                        <div>
                                            <Image src={tweet.user.profile_image_url_https} roundedCircle />
                                            <span>{tweet.user.name}</span>
                                            <span>@{tweet.user.screen_name} - {tweet.timestamp}</span>
                                        </div>
                                    </Card.Title>
                                    <Card.Body>
                                        {parse(tweet.full_text)}
                                        <span>
                                            <FontAwesomeIcon icon={faRetweet} />
                                            {tweet.retweet_count}
                                            <FontAwesomeIcon icon={faHeart} />
                                            {tweet.favorite_count}
                                        </span>
                                    </Card.Body>
                                </Card>
                            )
                        )
                    }
                </div>
            }
        </div>
    )
}
*/