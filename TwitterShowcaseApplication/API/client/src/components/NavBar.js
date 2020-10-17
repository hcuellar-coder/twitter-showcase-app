import React, { useState } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function NavBar() {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar id="nav-bar" expanded={expanded} collapseOnSelect expand="md" sticky="top">
            <Navbar.Brand to='/'>Twitter Showcase</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
            <Navbar.Collapse id="basic-navbar-nav">
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