import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HourGlassLoading from '../components/loading/HourGlassLoading';
import {
  getCRMVariables,
  getLayoutCalls,
  getLayoutTasks,
} from '../redux/user/zoho';
import CallForm from './forms/CallForm';
import { handleStateChange } from '../redux/user/userSlice';
import TaskForm from './forms/TaskForm';
import SendEmailForm from './forms/SendEmailForm';

const CallTrailLeftPartContent = () => {
  const dispatch = useDispatch();
  const {
    CURRENT_CREATION_TAB,
    DONE_CRM_VARIABLES,
    DONE_FETCHING_FORM_LAYOUTS,
    REPORT_FULLSCREEN,
  } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCRMVariables({})).then((dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        });
        await dispatch(getLayoutCalls({})).then((dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        });
        await dispatch(getLayoutTasks({})).then((dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        });
        await dispatch(
          handleStateChange({ name: 'DONE_FETCHING_FORM_LAYOUTS', value: true })
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (!DONE_FETCHING_FORM_LAYOUTS) {
    return <HourGlassLoading />;
  }

  const renderContent = () => {
    if (!REPORT_FULLSCREEN) {
      switch (CURRENT_CREATION_TAB) {
        case 'Log a Call':
          return <CallForm />;
        case 'Create Task':
          return <TaskForm />;
        case 'Create Meeting':
          return <h1>Create Meeting</h1>;
        case 'Send Email':
          return <SendEmailForm />;
        default:
          return (
            <div className='no-data-container-new'>
              <img
                src='./no_data_found.png'
                alt='no-data'
                className='warehouse-img'
              />
            </div>
          );
      }
    } else {
      return <></>;
    }
  };

  return renderContent();
};

export default CallTrailLeftPartContent;
