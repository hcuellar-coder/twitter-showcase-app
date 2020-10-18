import React, { useState } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

function NavBar() {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar id="nav-bar" expanded={expanded} expand="sm" sticky="top">
            <Navbar.Brand to='/'>
                <FontAwesomeIcon icon={faTwitter} id="navbar-brand-twitter" />
            Twitter Showcase
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto" onClick={() => setExpanded(false)}>
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