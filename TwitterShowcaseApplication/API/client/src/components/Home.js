import React from 'react';
import { Card, Container } from 'react-bootstrap';
import TwitterLogo from '../graphics/Twitter.gif';
import TwitterLoading from '../graphics/loading.gif';

function Home() {
    return (
        <div>
            <Container id="home-container" fluid>
                <Card>
                    <Card.Title>
                        <div><h4>Welcome to the Twitter Showcase!</h4></div>
                    </Card.Title>
                    <Card.Body>
                        <p>
                            This is a simple web application that utilizes the Twitter API to retrieve twitter timeline information.
                            You can Search based on user or content in the search page, or utilize the random tweet page to pull a random
                            tweet from the selected choices. Lets dive right into it!
                        </p>
                        <img className="media-gif" src={TwitterLogo} />
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Home;