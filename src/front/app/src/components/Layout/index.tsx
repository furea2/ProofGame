import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Button, Checkbox, Sidebar, Icon, Container, Divider, Dropdown, Header, Grid, Image, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import MainContent from '../MainContent';
import ContentHeader from '../ContentHeader';
import HomePage from '../HomePage';

import ContentSidebar from '../ContentSidebar';

import logo from '@assets/images/logo.png';
import './reset.css';
import 'semantic-ui-css/semantic.min.css'
import './Layout.css';

const Layout = (props:any) => {
  const user = props.user;
  const Auth = props.Auth;

  return user ? (<>
    <BrowserRouter>
      <ContentHeader />
      <div className="fp-panel-main">
        <Routes>
          <Route path="/" element={<HomePage {...props}/>} />

          <Route path="/*" element={<>
            <ContentSidebar />

            <Sidebar.Pusher>
              <Routes>
                {/* <Route path="/" element={<MainContent {...props}/>} /> */}
                <Route path="expenses" element={<MainContent {...props}/>} />
                <Route path="invoices" element={<MainContent {...props}/>} />
              </Routes>
            </Sidebar.Pusher>

          </>} />

        </Routes>
      </div>
    </BrowserRouter>
  </>) : (
    <div>
      <p>{"サインインする"}</p>
      <Button onClick={() => Auth.federatedSignIn()}>Sign In</Button>
    </div>
  );
};

export default hot(module)(Layout);
