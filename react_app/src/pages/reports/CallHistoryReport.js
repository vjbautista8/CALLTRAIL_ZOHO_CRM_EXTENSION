import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../../wrappers/BOMTAbleWrapper';
import { handleStateChange } from '../../redux/user/userSlice';
import moment from 'moment';
import HourGlassLoading from '../../components/loading/HourGlassLoading';
import {
  convertListToString,
  findObjectByKeyValue,
  openNewTab,
  sortAndRemoveDuplicates,
  sortByKey,
  sortList,
} from '../../helper';
import {
  FaArrowDownAZ,
  FaArrowDown19,
  FaArrowUpAZ,
  FaArrowDownZA,
} from 'react-icons/fa6';
const CallHistoryReport = () => {
  const dispatch = useDispatch();
  const {
    ACTIVITIES,
    META_DATA,
    FETCH_ACTIVITIES,
    HAS_CALL,
    DONE_ACTIVITIES,
    ON_CALL_SAVING,
    META_DATA_CRM_VARIABLES,
    DONE_FETCHING_FORM_LAYOUTS,
    FORM_LAYOUT,
    SERVICE_ORIGIN,
  } = useSelector((store) => store.user);
  const [sortedCallFormLayout, setSortedCallFormLayout] = useState([]);
  const sortDataInColumn = (field_name, sort) => {
    const sortedCall = sortList(ACTIVITIES, field_name, sort);
    dispatch(handleStateChange({ name: 'ACTIVITIES', value: sortedCall }));
  };
  const [pinColumns, setPinColumns] = useState([
    META_DATA_CRM_VARIABLES.CALL_REPORTS_VISIBLE_COLUMN[0],
  ]);
  useEffect(() => {
    if (ACTIVITIES.length > 0) {
      let activitiesData = ACTIVITIES;
      for (var i = 0; i < activitiesData.length; i++) {
        if (activitiesData[i]['Activity_Type'] == 'Calls') {
          console.log('HAS_CALL');
          dispatch(handleStateChange({ name: 'HAS_CALL', value: true }));
        }
      }
    }
  }, [ACTIVITIES]);
  useEffect(() => {
    if (DONE_FETCHING_FORM_LAYOUTS) {
      let formLayouts = [];

      FORM_LAYOUT?.CALL[0]?.sections.map((section) => {
        section?.fields.map((field) => {
          formLayouts = formLayouts.concat(field);
        });
      });
      console.log('ITEM', formLayouts);
      const sortedCall = sortByKey(formLayouts, 'field_label');
      console.log('sortedCall', sortedCall);
      setSortedCallFormLayout(sortedCall);
    }
  }, [FORM_LAYOUT, DONE_FETCHING_FORM_LAYOUTS]);
  return (
    <Wrapper>
      {HAS_CALL && (
        <>
          <table className='bom-table'>
            <tr className='thead-bom sticker-th'>
              {META_DATA_CRM_VARIABLES.CALL_REPORTS_VISIBLE_COLUMN.map(
                (field) => {
                  const objectField = findObjectByKeyValue(
                    sortedCallFormLayout,
                    'api_name',
                    field
                  );

                  return (
                    <td
                      className={`${
                        pinColumns.includes(objectField?.api_name)
                          ? 'pinned-column'
                          : ''
                      }`}
                    >
                      <div className='header-table-content-v'>
                        <div>{objectField?.field_label}</div>
                        <div className='header-icons-sorting'>
                          <FaArrowUpAZ
                            className='header-sort-icon'
                            onClick={() => {
                              sortDataInColumn(objectField?.api_name, true);
                            }}
                          />
                          <FaArrowDownZA
                            className='header-sort-icon'
                            onClick={() => {
                              sortDataInColumn(objectField?.api_name, false);
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  );
                }
              )}
              {/* <td>Subject</td>
              {META_DATA?.Entity == 'Leads' && (
                <>
                  <td>Call To</td>
                </>
              )}
              {META_DATA?.Entity == 'Contacts' && (
                <>
                  <td>Call To</td>
                  <td>Related To</td>
                </>
              )}

              <td>Call Type</td>
              <td>Call Purpose</td>
              <td>Call Start Time</td>
              <td>Call Duration</td>
              <td>Call Owner</td> */}
            </tr>

            {ACTIVITIES.map((activities, i) => {
              if (activities?.Activity_Type == 'Calls') {
                return (
                  <>
                    {' '}
                    <tr
                      className='item-bom'
                      role='button'
                      onClick={() => {
                        openNewTab(
                          `${SERVICE_ORIGIN}/crm/tab/Calls/${activities?.id}`
                        );
                      }}
                    >
                      {META_DATA_CRM_VARIABLES.CALL_REPORTS_VISIBLE_COLUMN.map(
                        (field) => {
                          const objectField = findObjectByKeyValue(
                            sortedCallFormLayout,
                            'api_name',
                            field
                          );

                          if (
                            objectField?.data_type == 'ownerlookup' ||
                            objectField?.data_type == 'lookup'
                          ) {
                            return (
                              <td
                                className={`${
                                  pinColumns.includes(objectField?.api_name)
                                    ? 'pinned-column'
                                    : ''
                                }`}
                              >
                                {activities[objectField?.api_name]
                                  ? activities[objectField?.api_name]['name']
                                  : ''}
                              </td>
                            );
                          }
                          if (objectField?.data_type == 'datetime') {
                            return (
                              <td
                                className={`${
                                  pinColumns.includes(objectField?.api_name)
                                    ? 'pinned-column'
                                    : ''
                                }`}
                              >
                                {activities[objectField?.api_name]
                                  ? moment(
                                      activities[objectField?.api_name]
                                    ).format('llll')
                                  : ''}
                              </td>
                            );
                          }
                          if (objectField?.data_type == 'multiselectpicklist') {
                            return (
                              <td
                                className={`${
                                  pinColumns.includes(objectField?.api_name)
                                    ? 'pinned-column'
                                    : ''
                                }`}
                              >
                                {activities[objectField?.api_name]
                                  ? convertListToString(
                                      activities[objectField?.api_name]
                                    )
                                  : ''}
                              </td>
                            );
                          } else {
                            return (
                              <td
                                className={`${
                                  pinColumns.includes(objectField?.api_name)
                                    ? 'pinned-column'
                                    : ''
                                }`}
                              >
                                {activities[objectField?.api_name]
                                  ? activities[objectField?.api_name]
                                  : ''}
                              </td>
                            );
                          }
                        }
                      )}
                      {/* <td>{field?.Subject}</td>
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

                  <td>{field?.Call_Type}</td>
                  <td>{field?.Call_Purpose}</td>
                  <td>{moment(field?.Call_Start_Time).format('llll')}</td>
                  <td>{field?.Call_Duration}</td>
                  <td>{field?.Owner?.name}</td> */}
                    </tr>
                  </>
                );
              }
            })}
          </table>
        </>
      )}

      {ON_CALL_SAVING && (
        <>
          <HourGlassLoading />
        </>
      )}
      {!HAS_CALL && (
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
    </Wrapper>
  );
};

export default CallHistoryReport;
