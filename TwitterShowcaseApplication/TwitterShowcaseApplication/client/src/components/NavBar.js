import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

function NavBar() {
    return (
        <Navbar>
            <Navbar.Brand href="#home">Twitter Showcase Application</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">User Search</Nav.Link>
                    <Nav.Link href="#link">Random Tweets</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;