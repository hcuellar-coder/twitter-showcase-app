import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKiwiBird, faToriiGate } from '@fortawesome/free-solid-svg-icons';

function NavBar() {

    return (
        <Navbar collapseOnSelect bg="light" expand="md" sticky="top">
            {/* <Navbar.Brand tag={Link} to='/'> <FontAwesomeIcon icon={faToriiGate} /> Twitter Showcase</Navbar.Brand> */}
            <Navbar.Brand tag={Link} to='/'>Twitter Showcase</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavItem>
                        <NavLink className='Navlink' to='/' exact={true} >Home </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='Navlink' to='/search'>Search</NavLink>
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