import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Button, Checkbox, Sidebar, Icon, Container, Divider, Dropdown, Header, Grid, Image, Menu, Segment } from 'semantic-ui-react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const HomePage = (props:any) => {
  return (<>

    <h1>Welcome to ProofGame!</h1>

    <Link to="/">Home</Link><br/>
    <Link to="/expenses">expenses</Link>
    {/* <Link to="/">Home</Link> */}

    </>);
}

export default hot(module)(HomePage);
