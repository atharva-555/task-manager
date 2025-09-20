import './App.css';
import AppRoutes from './routes/routes';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authService } from './services/authService';

function App() {
  const dispatch = useDispatch();
  const { isInitialized, loading } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isInitialized) {
      // Add loading indicator during auth check
      dispatch(authService.checkAuth());
    }
  }, [dispatch, isInitialized]);

  return (
    <>
      <AppRoutes/>
    </>
  );
}

export default App;
