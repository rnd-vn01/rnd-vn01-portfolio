import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { RootState, useAppDispatch } from 'src/redux/store';
import { useTranslation } from 'react-i18next';

export const BasicRoute: React.FC<IBasicRoute> = ({
  component: Component,
  layout: Layout,
  isPrivate,
  exact,
  path,
  isLogoOnlyHeader
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const location = useLocation();

  const {
    currentLanguage
  } = useSelector(
    (state: RootState) => state.languageSlice,
  );
  const {
    isLoggedIn
  } = useSelector(
    (state: RootState) => state.authSlice,
  );

  // Hooks
  useEffect(() => {
    // Update current language to i18n
    i18n.changeLanguage(currentLanguage?.toLowerCase() || "en")
  }, []);

  useLayoutEffect(() => {
    // Redirect if not logged in
    if (isPrivate && !isLoggedIn) {
      history.push("/login", { isRedirect: true })
    }
  }, [location])

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: any) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};
