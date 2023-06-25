import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { Navigate, Route } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('User protected 190: ', user);
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!authenticated) {
    return <Navigate to='/login' />;
  }

  return <Route {...rest} element={<Component />} />;
}
