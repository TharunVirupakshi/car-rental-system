// 'use client';
// Navigation.js (a separate component or part of App.js)
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

import userSVG from '../../assets/user-128.svg'

const NavigationBar = ({signOutHandler, user}) => {

  const handleSignOut = () => {
    signOutHandler()
  }

  return (
 
    <Navbar fluid rounded>
    <Navbar.Brand href="/">
      {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">RentCarz</span>
    </Navbar.Brand>
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar alt="User settings" img={userSVG} rounded />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">{user?.displayName}</span>
          <span className="block truncate text-sm font-medium">{user?.email}</span>
        </Dropdown.Header>
        <Dropdown.Item><Link to={'/mytrips'}>MyTrips</Link></Dropdown.Item>
        {/* <Dropdown.Item>MyOrders</Dropdown.Item> */}
        <Dropdown.Item><Link to={'/myprofile'}>View Profile</Link></Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse>
      <Navbar.Link href="/home" active>
        Home
      </Navbar.Link>
      <Navbar.Link href="#">About</Navbar.Link>
      <Navbar.Link href="#">Services</Navbar.Link>
      <Navbar.Link href="#">Pricing</Navbar.Link>
      <Navbar.Link href="#">Contact</Navbar.Link>
    </Navbar.Collapse>
  </Navbar>

  );
};

export default NavigationBar;