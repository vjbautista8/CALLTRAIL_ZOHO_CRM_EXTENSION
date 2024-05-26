import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HourGlassLoading from '../components/loading/HourGlassLoading';
import { getCurrentUser, getSelectedRecordByID } from '../redux/user/zoho';
import CallTrailHeader from './CallTrailHeader';
import CallTrailLeftPartHeader from './CallTrailLeftPartHeader';
import Card from '../components/Card';
import CallTrailRightPartHeader from './CallTrailRightPartHeader';
import CallTrailLeftPartContent from './CallTrailLeftPartContent';
import CallTrailRightPartContent from './CallTrailRightPartContent';
import { Tooltip as ReactTooltip } from 'react-tooltip';
const CallTrailHome = () => {
  const dispatch = useDispatch();
  const { IS_LOADING, META_DATA, REPORT_FULLSCREEN } = useSelector(
    (store) => store.user
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          getSelectedRecordByID({
            Entity: META_DATA.Entity,
            RecordID: META_DATA.EntityId[0],
          })
        ).then((dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        });
        await dispatch(getCurrentUser()).then((dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);
  if (IS_LOADING) {
    return <HourGlassLoading />;
  }
  return (
    <>
      <CallTrailHeader />
      <div
        className={`${REPORT_FULLSCREEN ? 'widget_data_max ' : 'widget_data'}`}
      >
        <Card
          data={{
            title: <CallTrailLeftPartHeader />,
            content: <CallTrailLeftPartContent />,
            className: `zcrmCard bom-card ml-0_5 ${
              REPORT_FULLSCREEN
                ? 'animate__animated animate__slideInLeft animate__faster vertical-center'
                : 'animate__animated animate__slideInLeft animate__faster'
            }`,
          }}
        />
        <Card
          data={{
            title: <CallTrailRightPartHeader />,
            content: <CallTrailRightPartContent />,
            className: `zcrmCard bom-card ml-0_5 mr-0_5 ${
              REPORT_FULLSCREEN
                ? 'animate__animated animate__slideInRight animate__faster'
                : 'animate__animated animate__slideInRight animate__faster'
            }`,
          }}
        />
        <ReactTooltip id='call_create' place='bottom' content='Log a call' />
        <ReactTooltip id='task_create' place='bottom' content='Create Task' />
        <ReactTooltip id='email_create' place='bottom' content='Send Email' />
        <ReactTooltip id='report_max' place='bottom' content='Expand' />
        <ReactTooltip id='report_min' place='bottom' content='Shrink' />
      </div>
    </>
  );
};

export default CallTrailHome;
