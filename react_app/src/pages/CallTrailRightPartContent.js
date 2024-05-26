import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedRecords } from '../redux/user/zoho';
import { handleStateChange } from '../redux/user/userSlice';
import HourGlassLoading from '../components/loading/HourGlassLoading';
import CallHistoryReport from './reports/CallHistoryReport';
import TaskHistoryReport from './reports/TaskHistoryReport';

const CallTrailRightPartContent = () => {
  const dispatch = useDispatch();
  const { META_DATA, DONE_ACTIVITIES, CURRENT_TAB, ACTIVITIES_FETCHER } =
    useSelector((store) => store.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          getRelatedRecords({
            Entity: META_DATA.Entity,
            RecordID: META_DATA.EntityId[0],
            RelatedList: 'Activities_History',
          })
        ).then((dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        });
        await dispatch(
          getRelatedRecords({
            Entity: META_DATA.Entity,
            RecordID: META_DATA.EntityId[0],
            RelatedList: 'Activities',
          })
        ).then((dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        });
        await dispatch(
          handleStateChange({ name: 'DONE_ACTIVITIES', value: true })
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch, ACTIVITIES_FETCHER]);
  if (!DONE_ACTIVITIES) {
    return <HourGlassLoading />;
  }
  const renderContent = () => {
    switch (CURRENT_TAB) {
      case 'Call History':
        return <CallHistoryReport />;
      case 'Tasks':
        return <TaskHistoryReport />;

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
  };
  return renderContent();
};

export default CallTrailRightPartContent;
