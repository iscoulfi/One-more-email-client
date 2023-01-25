import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';
import Compose from '../components/Compose';

const MainLayout = () => {
  const user = useSelector(state => state.auth.user);

  return (
    <>
      {user && user._id && (
        <>
          <Nav />
          <Compose />
          <Outlet />
        </>
      )}
    </>
  );
};

export default MainLayout;
