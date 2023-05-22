import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

// Layouts
import { FullLayout } from 'src/layouts/FullLayout/FullLayout';

// Pages
import { BasicRoute } from './BasicRoute';
import { HomePage } from 'src/pages/HomePage/HomePage';
import { DemoPage } from 'src/pages/DemoPage/DemoPage';
import { LoginPage } from 'src/pages/authentication/LoginPage/LoginPage';
import { CreateAccountPage } from 'src/pages/authentication/CreateAccountPage/CreateAccountPage';
import { QuizPage } from 'src/pages/QuizPage/QuizPage';
import { AdvancedSearchPage } from 'src/pages/AdvancedSearchPage/AdvancedSearchPage';
import { DataManagementPage } from 'src/pages/DataManagementPage/DataManagementPage';
import { DetailPage } from 'src/pages/DetailPage/DetailPage';
import { PersonalRecordsPage } from 'src/pages/PersonalRecordsPage/PersonalRecordsPage'
import { AboutPage } from 'src/pages/AboutPage/AboutPage';
import { ChangePasswordPage } from 'src/pages/authentication/ChangePasswordPage/ChangePasswordPage';
import { EditProfilePage } from 'src/pages/authentication/EditProfilePage/EditProfilePage';
import { ManualPage } from 'src/pages/ManualPage/ManualPage';

export function Routers() {
  return (
    <Router>
      <Switch>
        <BasicRoute
          exact
          path="/"
          component={HomePage}
          layout={FullLayout}
          isPrivate={false}
        />

        <BasicRoute
          exact
          path="/demo"
          component={DemoPage}
          layout={FullLayout}
          isPrivate={false}
        />

        <BasicRoute
          exact
          path="/login"
          component={LoginPage}
          layout={FullLayout}
          isPrivate={false}
        />

        <BasicRoute
          exact
          path="/signup"
          component={CreateAccountPage}
          layout={FullLayout}
          isPrivate={false}
        />

        <BasicRoute
          exact
          path="/quiz"
          component={QuizPage}
          layout={FullLayout}
          isPrivate={true}
        />

        <BasicRoute
          path="/advanced-search"
          component={AdvancedSearchPage}
          layout={FullLayout}
          isPrivate={false}
        />

        <BasicRoute
          exact
          path="/data"
          component={DataManagementPage}
          layout={FullLayout}
          isPrivate={true}
        />

        <BasicRoute
          path="/detail"
          component={DetailPage}
          layout={FullLayout}
          isPrivate={false}
        />

        <BasicRoute
          exact
          path="/records"
          component={PersonalRecordsPage}
          layout={FullLayout}
          isPrivate={true}
        />

        <BasicRoute
          exact
          path="/about"
          component={AboutPage}
          layout={FullLayout}
          isPrivate={false}
        />

        <BasicRoute
          exact
          path="/password-reset"
          component={ChangePasswordPage}
          layout={FullLayout}
          isPrivate={false}
        />

        <BasicRoute
          exact
          path="/edit-profile"
          component={EditProfilePage}
          layout={FullLayout}
          isPrivate={true}
        />

        <BasicRoute
          exact
          path="/manual"
          component={ManualPage}
          layout={FullLayout}
          isPrivate={false}
        />

        <Redirect to='/' />
      </Switch>
    </Router>
  );
}
