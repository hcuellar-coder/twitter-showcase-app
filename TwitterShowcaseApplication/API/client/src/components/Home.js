import React from 'react';
import { Card, Image, Modal, Container } from 'react-bootstrap';

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
                            Want to semi-stalk your prefered influential social figures, but dont want to make a twitter account?
                            Well say no more, we've got here a twitter application that lets you, yes You! Read [insert-influential-persons-name-here]'s content!
                            Don't have any one that you care to follow or listen to but just want to get your doctors recommended daily dose of tweet!? Well we have a random tweet page for you!
                            So Head on Over to Eddie's Tweets Jamboree, for the nice sweet tweet time....yuppers
                     </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Home;