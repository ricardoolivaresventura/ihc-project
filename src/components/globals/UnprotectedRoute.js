import { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { auth } from '../../firebase';

export default function UnprotectedRoute({ component: Component, ...rest }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (authenticated) {
    return <Navigate to='/' />;
  }

  return <Route {...rest} element={<Component />} />;
}
