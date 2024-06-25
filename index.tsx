import React from 'react';
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';
// MSAL imports
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from '@azure/msal-browser';
import { msalConfig } from '@configs/azureAuthConfig';

export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });
});

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <App pca={msalInstance} />
    </BrowserRouter>
  </StrictMode>,
);
const customChat = document.getElementById('customChat');
const customChatRoot = createRoot(customChat);

customChatRoot.render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <App pca={msalInstance} />
    </BrowserRouter>
  </StrictMode>,
);

ReactDOM.render(    <BrowserRouter>
  <ToastContainer autoClose={2000} hideProgressBar={true} />
  <App pca={msalInstance} />
</BrowserRouter>, document.getElementById('customChat'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
