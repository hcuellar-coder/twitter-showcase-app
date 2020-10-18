import React from 'react'
import { Card, Container } from 'react-bootstrap';

function Errors(props) {

    return (
        <div>
            { props.searchType === 'user' ?
                <Container fluid>
                    <Card id="error-card">
                        <Card.Body>
                            <Card.Title>OOPs....</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">There seems to be a problem!</Card.Subtitle>
                            <Card.Text>
                                Probably went and typed in the wrong user name, searching by user requires a little finesse.
                                Try typing in the user in content and determine the '@name' then come back and type it in.
                    </Card.Text>
                    Hint: User search works with or without the '@'!
                    </Card.Body>
                    </Card>
                </Container>
                :
                <Container fluid>
                    <Card id="error-card">
                        <Card.Body>
                            <Card.Title>OOPs....</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">There seems to be a problem!</Card.Subtitle>
                            <Card.Text>
                                Your search was probably so obscure or specific that it didnt return anything! Try either being a little
                                more broad, or start with one word and add along the way.
                    </Card.Text>
                    Hint: if youre at 10 words...you've gone too far.
                    </Card.Body>
                    </Card>
                </Container>
            }
        </div>
    )
}

export default Errors;