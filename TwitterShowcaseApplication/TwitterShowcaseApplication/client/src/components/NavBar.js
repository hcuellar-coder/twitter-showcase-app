import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <Navbar>
            <Navbar.Brand tag={Link} to='/'>Twitter Showcase Application</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link tag={Link} to='/'>Home</Nav.Link>
                    <Nav.Link tag={Link} to='/user-search'>User Search</Nav.Link>
                    <Nav.Link tag={Link} to='/random-tweet'>Random Tweets</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;