import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { Navigate, Route, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ component: Component, ...rest }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (!authenticated && !auth.currentUser) {
    return <Navigate to='/login' />;
  }

  return <Route {...rest} element={<Component />} />;
}
