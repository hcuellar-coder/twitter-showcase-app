import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import parse from 'html-react-parser';

function Tweets(props) {

    return (
        <div>
            {props.userTweets.length === 0
                ? <div></div>
                : props.userTweets.map
                    ((tweet, index) =>
                        (
                            <Card key={index}>
                                <div>
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
                                </div>
                            </Card>
                        )
                    )
            }
        </div>
    )
}

export default Tweets;