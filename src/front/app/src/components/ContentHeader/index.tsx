import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Container, Dropdown, Menu } from 'semantic-ui-react'

const ContentHeader = (props:any) => {
  return (
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
  );
}

export default hot(module)(ContentHeader);
