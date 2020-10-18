import React from 'react';
import { Card, Container, Image } from 'react-bootstrap';
import TwitterLogo from '../graphics/Twitter.gif';

function Home() {
    return (
        <div>
            <Container id="home-container" fluid>
                <Card className="tweet-card">
                    <Card.Title>
                        <div><h4>Welcome to the Twitter Showcase!</h4></div>
                    </Card.Title>
                    <Card.Body>
                        <p>
                            This is a simple web application that utilizes the Twitter API to retrieve twitter timeline information.
                            You can search based on user or content in the search page, or utilize the random tweet page to pull a random
                            tweet from the selected choices. Hope you enjoy it!
                        </p>
                        <Image className="media-gif" src={TwitterLogo} />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Home;