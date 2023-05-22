import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { RootState, useAppDispatch } from 'src/redux/store';

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

  // Hooks
  useEffect(() => {

  }, []);

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
