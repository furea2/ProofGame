import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';

import Amplify, { Auth, Hub } from 'aws-amplify';

import Layout from './Layout';

let FRONT_URL_BASE = "https://"+process.env.FRONT_HOST+":"+process.env.FRONT_PORT+"/";
if (process.env.FRONT_PORT == "443") {
  FRONT_URL_BASE = "https://"+process.env.FRONT_HOST+"/";
}
console.log(FRONT_URL_BASE)

const API_URL_BASE = "http://"+process.env.API_HOST+":"+process.env.API_PORT+"/api/v1/lean4";


Amplify.configure({
  Auth: {
    region: process.env.AUTH_REGION,
    userPoolId: process.env.AUTH_USER_POOL_ID,
    userPoolWebClientId: process.env.AUTH_USER_POOL_WEB_CLIENT_ID,
    oauth: {
      domain: process.env.AUTH_OAUTH_DOMAIN,
      scope: ['openid'],
      redirectSignIn: FRONT_URL_BASE,
      redirectSignOut: FRONT_URL_BASE,
      redirectUrl: FRONT_URL_BASE,
      responseType: 'code'
    }
  }
})


const App = () => {
  const [user, setUser] = useState<any | null>(null);
  // const [proof, setPooof] = useState<any | null>(null);
  const [result, setResult] = useState<any | null>('This area shows your result.');
  const [task_info, setTaskInfo] = useState<any | null>(null);
  // const [task_info_url, setTaskInfoURL] = useState<any>("");

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  const getUser = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      // デバッグ用
      // Auth.currentSession().then((data) => {
      //   console.log(`token: ${data.getIdToken().getJwtToken()}`);
      // });
      console.log(userData);
      return userData;
    } catch (e) {
      return console.log('Not signed in');
    }
  }

  const handleOnAssinment = (code:string) => {
    axios
      .post(API_URL_BASE+"/get_result", {
        user: user,
        code: code,
      })
      .then((response) => {
        console.log(response.data);
//         const current_result = `./src/sample.lean:8:4: warning :declaration uses 'sorry'
// ./src/sample.lean:9:4: error: no goals to be solved`;
        setResult(response.data.result);
        setTaskInfo(response.data.task_info);

      });
  }

  console.log(user);

  return (
    <Layout {...{
      user: user,
      Auth: Auth,
      result: result,
      task_info: task_info,
      setResult: setResult,
      handleOnAssinment: handleOnAssinment,
    }}/>
  );
};

export default hot(module)(App);
