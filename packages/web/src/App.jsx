import './css/typography.css';
import './css/titlebar.css';
import './css/app.css';
import './css/modal.css';
import './css/slideout.css';
import './css/tippy.css';
import './css/editor.css';

import React, { useState } from 'react';
import TitleBar from "./TitleBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <>
      {window.electron && (
        <TitleBar />
      )}

      <Router>
        <div className={`h-full ${window.electron ? 'pt-6' : ''}`}>
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}
