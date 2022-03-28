import React, { useState, useRef, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { Button, TextArea, Icon, Grid, Message } from 'semantic-ui-react'

import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

const GlaceonEditor: React.FC = (props:any) => {
  // const init_code = ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n');

  const init_code = `theorem ex1 : p ∨ q → q ∨ p := by
  intro h
  cases h with
  | inl h1 =>
    apply Or.inr
    exact h1
  | inr h2 =>
    sorry
    apply Or.inl
    assumption
`;
  const [code, setCode] = useState<any | null>(init_code);
  const options:any = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    // foldingStrategy: "indentation",
    overviewRulerBorder: false,
    lineNumbers: "off",
    readOnly: false,
    minimap: {enabled: false,},
    // cursorStyle: 'line',
    fontSize: 14,
    tabSize: 2,
  };
  const handleOnChange = (newValue:any, e:any) => {
    // console.log('onChange', newValue, e);
    setCode(newValue);
  }
  return (<>
    <Grid>
      <Grid.Column floated='left' width={5}>
        <b>Your Proof</b>
      </Grid.Column>
      <Grid.Column floated='right' width={4}>
        <Button primary onClick={() => props.handleOnAssinment(code)} style={{width: "100%"}}>
          <Icon name='play' />
          Assinment
        </Button>
      </Grid.Column>
    </Grid>
    <div style={{margin: "0.5em", border: "1px solid #aaa", height: "20em"}}>
      <Editor
        width="100%"
        height="100%"
        language="typescript"
        theme="vs"
        value={code}
        options={options}
        onChange={handleOnChange}
      />
    </div>
  </>);
};

export default hot(module)(GlaceonEditor);
