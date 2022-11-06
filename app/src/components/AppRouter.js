import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {ACCOUNTS_ROUTE, ABOUT_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import Accounts from "./Accounts/Accounts";
import About from "./About/About";
import Profile from "../Profile/Profile";

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path={ABOUT_ROUTE} element={<About/>}/>
      <Route exact path={ACCOUNTS_ROUTE} element={<Accounts/>}/>
      <Route exact path={PROFILE_ROUTE}>
        <Route exact path={":id"} element={<Profile/>}/>
      </Route>
      <Route path={'*'} element={<Accounts/>}/>
    </Routes>
  );
};

export default AppRouter;
