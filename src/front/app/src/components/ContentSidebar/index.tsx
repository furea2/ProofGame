import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Button, Checkbox, Sidebar, Icon, Container, Divider, Dropdown, Header, Grid, Image, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const ContentSidebar = (props:any) => {
  return (

    <Sidebar
    as={Menu}
    animation='push'
    icon='labeled'
    inverted
    // onHide={() => setVisible(false)}
    vertical
    visible={true}
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
  );
}

export default hot(module)(ContentSidebar);
