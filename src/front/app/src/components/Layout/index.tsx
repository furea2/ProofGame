import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Button, Checkbox, Sidebar, Icon, Container, Divider, Dropdown, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import MainContent from '../MainContent';

import logo from '@assets/images/logo.png';
import './reset.css';
import 'semantic-ui-css/semantic.min.css'
import './Layout.css';

const Layout = (props:any) => {
  const [visible, setVisible] = React.useState(true);
  const user = props.user;
  const Auth = props.Auth;

  return user ? (<>
    <BrowserRouter>

    <Menu fixed='top' inverted>
      <Container style={{height: "42px"}}>
        <Menu.Item as='a' header>
          {/* <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} /> */}
          Project Name
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>

        <Dropdown item simple text='Dropdown'>
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>

    {/* <Container style={{ marginTop: '5em' }}> */}


    {/* <div className="fp-wrapper"> */}
    {/* <Sidebar.Pushable> */}
      <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        inverted
        // onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'
        style={{top: "42px"}}
      >
        <Link to="/">
          <Menu.Item as='a'>
            <Icon name='home' />
            Home
          </Menu.Item>
        </Link>
        <Link to="/">
          <Menu.Item as='a'>
            <Icon name='gamepad' />
            Games
          </Menu.Item>
        </Link>
        <Link to="/">
          <Menu.Item as='a'>
            <Icon name='camera' />
            Channels
          </Menu.Item>
        </Link>
        <Link to="/expenses">
          <Menu.Item as='a'>
              <Icon name='camera' />
              Expenses
          </Menu.Item>
        </Link>
      </Sidebar>
      <Sidebar.Pusher>
        <Routes>
          <Route path="/" element={<MainContent {...props}/>} />
          <Route path="expenses" element={<MainContent {...props}/>} />
          <Route path="invoices" element={<MainContent {...props}/>} />
        </Routes>
      </Sidebar.Pusher>
    {/* </div> */}
    {/* </Sidebar.Pushable> */}

    {/* </Container> */}
    </BrowserRouter>
  </>) : (
    <div>
      <p>{"サインインする"}</p>
      <Button onClick={() => Auth.federatedSignIn()}>Sign In</Button>
    </div>
  );
};

export default hot(module)(Layout);
