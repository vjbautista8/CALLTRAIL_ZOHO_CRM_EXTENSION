import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ComponentsPage from './ComponentsPage';
import CallTrailHome from './CallTrailHome';
import HourGlassLoading from '../components/loading/HourGlassLoading';
import CallTrailSettings from './CallTrailSettings';
const Home = () => {
  const { PAGE } = useSelector((store) => store.user);
  if (PAGE == 'calltrailbutton') {
    return <CallTrailHome />;
  }
  if (PAGE == 'settings') {
    return <CallTrailSettings />;
  }
  return <HourGlassLoading />;
};

export default Home;
