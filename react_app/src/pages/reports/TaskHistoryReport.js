import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../wrappers/BOMTAbleWrapper';
import { handleStateChange } from '../../redux/user/userSlice';
import moment from 'moment';
import HourGlassLoading from '../../components/loading/HourGlassLoading';
const TaskHistoryReport = () => {
  const dispatch = useDispatch();
  const {
    ACTIVITIES,
    META_DATA,
    FETCH_ACTIVITIES,
    HAS_TASK,
    DONE_ACTIVITIES,
    ON_TASK_SAVING,
  } = useSelector((store) => store.user);
  useEffect(() => {
    if (ACTIVITIES.length > 0) {
      let activitiesData = ACTIVITIES;
      for (var i = 0; i < activitiesData.length; i++) {
        if (activitiesData[i]['Activity_Type'] == 'Tasks') {
          console.log('HAS_TASK');
          dispatch(handleStateChange({ name: 'HAS_TASK', value: true }));
        }
      }
    }
  }, [ACTIVITIES]);
  return (
    <Wrapper>
      {ON_TASK_SAVING && (
        <>
          <HourGlassLoading />
        </>
      )}
      {!ON_TASK_SAVING && (
        <>
          {HAS_TASK && (
            <>
              <table className='bom-table'>
                <tr className='thead-bom sticker-th'>
                  <td>Subject</td>
                  <td>Due Date</td>
                  <td>Status</td>
                  <td>Priority</td>
                  {META_DATA?.Entity == 'Leads' && (
                    <>
                      <td>Related To</td>
                    </>
                  )}
                  {META_DATA?.Entity == 'Contacts' && (
                    <>
                      <td>Call To</td>
                      <td>Related To</td>
                    </>
                  )}

                  <td>Task Owner</td>
                </tr>

                {ACTIVITIES.map((field, i) => {
                  if (field?.Activity_Type == 'Tasks') {
                    return (
                      <tr className='item-bom' role='button'>
                        <td>{field?.Subject}</td>
                        <td>{moment(field?.Due_Date).format('ll')}</td>
                        <td>{field?.Status}</td>

                        <td>{field?.Priority}</td>
                        {META_DATA?.Entity == 'Leads' && (
                          <>
                            <td>{field?.What_Id?.name}</td>
                          </>
                        )}
                        {META_DATA?.Entity == 'Contacts' && (
                          <>
                            <td>{field?.Who_Id?.name}</td>
                            <td>{field?.What_Id?.name}</td>
                          </>
                        )}

                        <td>{field?.Owner?.name}</td>
                      </tr>
                    );
                  }
                })}
              </table>
            </>
          )}
          {!HAS_TASK && (
            <>
              <div className='no-data-container-new'>
                <img
                  src='./no_data_found.png'
                  alt='no-data'
                  className='warehouse-img'
                />
              </div>
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default TaskHistoryReport;
