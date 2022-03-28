import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Button, Checkbox, Sidebar, Icon, TextArea, Container, Divider, Progress, Grid, Header, Image, Menu, Message } from 'semantic-ui-react'

import { BlockMath } from "react-katex";
import 'katex/dist/katex.min.css';

import GlaceonEditor from '../GlaceonEditor';
import GlaceonResult from '../GlaceonResult';
const MainContent = (props:any) => {
  const [counter, setCounter] = useState(0);
  const user = props.user;
  const Auth = props.Auth;

  return (<>
    <div className="fp-panel-main">
      <Container text>
        {/* <Header as='h2' dividing>
          Site
        </Header> */}

        <Grid>
          <Grid.Column>
            <Menu
              items={[
                { key: '1', name: 'link-1', content: 'Link' },
                { key: '2', name: 'link-2', content: 'Link' },
                { key: '3', name: 'link-3', content: 'Link' },
              ]}
              pointing
              tabular
            />
          </Grid.Column>
        </Grid>

        <Header as='h1'>
          Hello! {user.username}
        </Header>

        <b>Question</b>
        <p>Custom boilerplate for rapid development of Web Applications.</p>
        <p>
          This project makes use of React, Webpack, TypeScript to
          serve the best environment for development with hot-reloading of
          modules.
        </p>
        <BlockMath>
          {`
            \\textcolor{#B794F4}{{f}(\\textcolor{#48BB78}{\\xi})} =
            \\textcolor{#F56565}{\\int_{-\\infty}^{+\\infty}} \\!
            \\textcolor{#63B3ED}{f(x)} \\;
            \\textcolor{#F6AD55}{e}
            ^{
              \\textcolor{#F6AD55}{-} \\,
              \\textcolor{#D53F8C}{{2\\pi}} \\,
              \\textcolor{#F6AD55}{i} \\,
              \\textcolor{#F6AD55}{x} \\,
              \\textcolor{#48BB78}{\\xi}
            } \\,
            \\textcolor{#F56565}{\\mathrm{d}x}
            `}
        </BlockMath>
        <p>
          Click below button to update the application &quot;counter&quot;
          state. Components will update their states using
          Hot-Module-Replacement technique, without needing to refresh/reload
          whole application.
        </p>

        <Divider />
        <b>Input</b>
        <p>Custom boilerplate for rapid development of Web Applications.</p>
        <button onClick={() => {setCounter(counter + 1)}}>
          Counter <span>{counter}</span>
        </button>
        <Divider />
        <GlaceonEditor {...props}/>
        <GlaceonResult {...props}/>
        <br/>

        <Button onClick={() => Auth.signOut()}>
          Sign Out
        </Button>
      </Container>
      <br/><br/><br/>
    </div>
  </>);
}

export default hot(module)(MainContent);
