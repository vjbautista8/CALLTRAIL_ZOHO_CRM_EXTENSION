import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { handleStateChange } from './redux/user/userSlice';
import Home from './pages/Home';
const App = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageQuery = urlParams.get('page');
    const serviceOrigin = urlParams.get('serviceOrigin');
    console.log('PAGE', pageQuery);
    console.log('SERVICE_ORIGIN', serviceOrigin);
    console.log('META_DATA', data);
    dispatch(handleStateChange({ name: 'PAGE', value: pageQuery }));
    dispatch(
      handleStateChange({ name: 'SERVICE_ORIGIN', value: serviceOrigin })
    );
    dispatch(handleStateChange({ name: 'META_DATA', value: data }));
  }, []);
  return <Home />;
};
export default App;
