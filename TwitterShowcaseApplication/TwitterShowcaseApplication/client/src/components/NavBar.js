import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

function NavBar() {

    return (
        <Navbar bg="light" expand="md">
            <Navbar.Brand tag={Link} to='/'>Twitter Showcase</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavItem>
                        <NavLink className='Navlink' to='/' >Home </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='Navlink' to='/user-search'>User Search</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='Navlink' to='/random-tweet'>Random Tweets</NavLink>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;