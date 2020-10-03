import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';

function Layout(props) {
    return (
        <div>
            <NavBar />
            <Container>
                {console.log(props)}
                {console.log(props.children)}
                {props.children}
            </Container>
        </div>
    )
}

export default Layout;