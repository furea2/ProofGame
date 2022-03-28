import React, { useState, useRef, useEffect } from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import { Button, TextArea, Progress, Grid, Message } from 'semantic-ui-react'

const GlaceonResult: React.FC = (props:any) => {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState("indicating");
  useEffect(() => {

//     if (props.task_info) {
//     axios
//       .get(props.task_info.url, {})
//       .then((response) => {
//         console.log("api_indo");
//         console.log(response.data);
// //         const current_result = `./src/sample.lean:8:4: warning :declaration uses 'sorry'
// // ./src/sample.lean:9:4: error: no goals to be solved`;
//         // setResult(response.data.result);
//         // setTaskInfo(response.data.task_info);
//       });
//     }
    // if (status!="success" && percent<100) {
    if (props.task_info) {
        // console.log("api_indo");
        // console.log(props.task_info.url);
        const interval = setInterval(() => {
          axios
            .get(props.task_info.url, {})
            .then((response) => {
              console.log("api_indo");
              console.log(response.data);
              setStatus(response.data.status)
              if (response.data.status=="SUCCESS") {
                setPercent(100)
              } else if (response.data.status=="PROGRESS") {
                setPercent(Math.floor(response.data.result.done*100/response.data.result.total));
              }
              // setPercent(response.data.status)
            });
            // setPercent(percent + 10);
        }, 1000);
        return () => clearInterval(interval);
    } else {
      setStatus("success");
    }
  },[props.task_info]);

  return (<>
    <Grid>
      <Grid.Column floated='left' width={5}>
        <b>Result</b>
      </Grid.Column>
      <Grid.Column floated='right' width={4}>
        <Message color='red' style={{padding: "0.5em 1em", textAlign: "center"}}>Wrong Proof</Message>
      </Grid.Column>
    </Grid>
    <Progress percent={percent} size='tiny' success={status=="success"} >{percent}%</Progress>
    <div style={{margin: "0.5em"}}>
      <TextArea readOnly disabled
        style={{border: "1px solid #aaa", height: "150px", width: "100%", resize: 'none'}}
        value={props.result.detail}/>
    </div>
  </>);
};

export default hot(module)(GlaceonResult);
