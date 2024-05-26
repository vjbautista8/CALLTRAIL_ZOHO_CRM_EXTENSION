import React, { useEffect, useState } from 'react';
import { BiSolidCategory } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from 'react-icons/bs';
import {
  FaArrowDownAZ,
  FaArrowDown19,
  FaArrowUpAZ,
  FaArrowDownZA,
} from 'react-icons/fa6';
import Wrapper from '../../wrappers/SettingsWrapper';
import { useDispatch, useSelector } from 'react-redux';
import HourGlassLoading from '../../components/loading/HourGlassLoading';
import Switch from 'react-switch';
import { handleFormData, handleStateChange } from '../../redux/user/userSlice';
import {
  getCRMVariables,
  getLayoutCalls,
  getLayoutTasks,
  updateCRMVariables,
} from '../../redux/user/zoho';
import {
  changeOrder,
  findIndexByKeyValue,
  findIndexOfElement,
  findObjectByKeyValue,
  sortAndRemoveDuplicates,
  sortByKey,
  sortList,
  toggleElementList,
} from '../../helper';
const CallSettingsPageContent = () => {
  const dispatch = useDispatch();
  const {
    FORM_LAYOUT,
    DONE_FETCHING_FORM_LAYOUTS,
    META_DATA_CRM_VARIABLES,
    SELECTED_SORTING_ITEM,
  } = useSelector((store) => store.user);
  const [sortedCallFormLayout, setSortedCallFormLayout] = useState([]);
  const [sortedCallReportLayout, setSortedCallReportLayout] = useState([]);
  const [currentTab, setCurrentTab] = useState('field-listing');
  const [currentSelectedItem, setCurrentSelectedItem] = useState('');

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
  const sortDataInColumn = (field_name, sort) => {
    const sortedCall = sortList(sortedCallFormLayout, field_name, sort);
    setSortedCallFormLayout(sortedCall);
  };
  if (!DONE_FETCHING_FORM_LAYOUTS) {
    return <HourGlassLoading />;
  }
  const handleChange = (checked, name, id) => {
    console.log(checked, name, id);
    const newList = toggleElementList(
      META_DATA_CRM_VARIABLES?.CALL_FORM_VISIBLE_FIELDS,
      id
    );
    dispatch(
      handleFormData({
        name: 'CALL_FORM_VISIBLE_FIELDS',
        value: newList,
        form: 'META_DATA_CRM_VARIABLES',
      })
    );
    dispatch(
      updateCRMVariables({
        varName: 'calltrail__CALL_FORM_VISIBLE_FIELDS',
        varValue: newList,
      })
    );
  };
  const handleChangeReport = (checked, name, id) => {
    console.log(checked, name, id);
    const newList = toggleElementList(
      META_DATA_CRM_VARIABLES?.CALL_REPORTS_VISIBLE_COLUMN,
      id
    );
    dispatch(
      handleFormData({
        name: 'CALL_REPORTS_VISIBLE_COLUMN',
        value: newList,
        form: 'META_DATA_CRM_VARIABLES',
      })
    );

    dispatch(
      updateCRMVariables({
        varName: 'calltrail__CALL_REPORTS_VISIBLE_COLUMN',
        varValue: newList,
      })
    );
  };
  const handleSortingItem = (value) => {
    // const indexPosition = findIndexOfElement(list, value); value
    if (value == currentSelectedItem) {
      setCurrentSelectedItem('');
    } else {
      setCurrentSelectedItem(value);
    }

    // dispatch(
    //   handleStateChange({ name: 'SELECTED_SORTING_ITEM', value: value })
    // );
    // console.log('indexPosition', indexPosition, value, list);
  };
  const handleSortUpBtn = (list, value) => {
    const indexPosition = findIndexOfElement(list, value);
    const newIndex = indexPosition - 1;
    const currentList = list;
    console.log('indexPosition', indexPosition, value, currentList, newIndex);
    const newList = changeOrder(currentList, value, newIndex);

    console.log('newList', newList);
    dispatch(
      handleFormData({
        name: 'CALL_REPORTS_VISIBLE_COLUMN',
        value: newList,
        form: 'META_DATA_CRM_VARIABLES',
      })
    );
    dispatch(
      updateCRMVariables({
        varName: 'CALL_REPORTS_VISIBLE_COLUMN',
        varValue: newList,
      })
    );
  };
  const handleSortDownBtn = (list, value) => {
    const indexPosition = findIndexOfElement(list, value);
    const newIndex = indexPosition + 1;
    const currentList = list;
    console.log('indexPosition', indexPosition, value, currentList, newIndex);
    const newList = changeOrder(currentList, value, newIndex);

    console.log('newList', newList);
    dispatch(
      handleFormData({
        name: 'CALL_REPORTS_VISIBLE_COLUMN',
        value: newList,
        form: 'META_DATA_CRM_VARIABLES',
      })
    );
    dispatch(
      updateCRMVariables({
        varName: 'CALL_REPORTS_VISIBLE_COLUMN',
        varValue: newList,
      })
    );
  };
  return (
    <>
      <div className='v_header_container_title_text title-setting'>Calls</div>
      <div className='darkMainHead nav-section-setting'>
        <div
          className={`nav-module-setting-layout ${
            currentTab == 'field-listing'
              ? 'nav-module-setting-layout-selected'
              : ''
          }`}
          onClick={() => {
            setCurrentTab('field-listing');
          }}
        >
          Field Listing
        </div>
        <div
          className={`nav-module-setting-layout ${
            currentTab == 'report-columns'
              ? 'nav-module-setting-layout-selected'
              : ''
          }`}
          onClick={() => {
            setCurrentTab('report-columns');
          }}
        >
          Organize Report Columns
        </div>
      </div>
      {currentTab == 'field-listing' && (
        <>
          <div className='content-table'>
            <Wrapper>
              <table className='bom-table'>
                <tr className='thead-bom sticker-th'>
                  <td>
                    <div className='header-table-content-v'>
                      <div>Fields</div>
                      <div className='header-icons-sorting'>
                        <FaArrowUpAZ
                          className='header-sort-icon'
                          onClick={() => {
                            sortDataInColumn('field_label', true);
                          }}
                        />
                        <FaArrowDownZA
                          className='header-sort-icon'
                          onClick={() => {
                            sortDataInColumn('field_label', false);
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className='check-column'>
                    <div className='header-table-content-v'>
                      <div>Data Type</div>
                      <div className='header-icons-sorting'>
                        <FaArrowUpAZ
                          className='header-sort-icon'
                          onClick={() => {
                            sortDataInColumn('data_type', true);
                          }}
                        />
                        <FaArrowDownZA
                          className='header-sort-icon'
                          onClick={() => {
                            sortDataInColumn('data_type', false);
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className='aligncenter check-column'>
                    <div className='header-table-content-v settings-header-ct '>
                      <div>Mandatory</div>
                      <div className='header-icons-sorting'>
                        <FaArrowUpAZ
                          className='header-sort-icon'
                          onClick={() => {
                            sortDataInColumn('required', true);
                          }}
                        />
                        <FaArrowDownZA
                          className='header-sort-icon'
                          onClick={() => {
                            sortDataInColumn('required', false);
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className='aligncenter switch-btn-v'>Form</td>
                  <td className='aligncenter switch-btn-v'>Report</td>
                </tr>

                <>
                  {sortedCallFormLayout.map((field, f) => (
                    <>
                      <>
                        <tr className='item-bom' role='button'>
                          <td>{field?.field_label}</td>

                          <td>{field?.data_type}</td>
                          <td className='aligncenter switch-btn-v'>
                            {field?.required && (
                              <span className='mandatory-check'>
                                <FaCheck />
                              </span>
                            )}
                          </td>
                          <td className='aligncenter'>
                            {field?.view_type?.create && (
                              <Switch
                                id={field?.api_name}
                                onChange={handleChange}
                                checked={
                                  META_DATA_CRM_VARIABLES?.CALL_FORM_VISIBLE_FIELDS.includes(
                                    field?.api_name
                                  ) ||
                                  field?.api_name == 'Who_Id' ||
                                  field?.api_name == 'What_Id'
                                }
                                disabled={
                                  field?.api_name == 'Who_Id' ||
                                  field?.api_name == 'What_Id'
                                }
                                className={
                                  META_DATA_CRM_VARIABLES?.CALL_FORM_VISIBLE_FIELDS.includes(
                                    field?.api_name
                                  ) ||
                                  field?.api_name == 'Who_Id' ||
                                  field?.api_name == 'What_Id'
                                    ? 'react-switch-handle-checked'
                                    : ''
                                }
                              />
                            )}
                          </td>
                          <td className='aligncenter switch-btn-v'>
                            <Switch
                              id={field?.api_name}
                              onChange={handleChangeReport}
                              checked={META_DATA_CRM_VARIABLES?.CALL_REPORTS_VISIBLE_COLUMN.includes(
                                field?.api_name
                              )}
                              className={
                                META_DATA_CRM_VARIABLES?.CALL_REPORTS_VISIBLE_COLUMN.includes(
                                  field?.api_name
                                )
                                  ? 'react-switch-handle-checked'
                                  : ''
                              }
                            />
                          </td>
                        </tr>
                      </>
                    </>
                  ))}
                </>
              </table>
            </Wrapper>
          </div>
        </>
      )}
      {currentTab == 'report-columns' && (
        <>
          <div className='content-table'>
            <Wrapper>
              {/* <div className='organize-columns-page'>
                <button className='lyte-button primarybtn lytePrimaryBtn newbutton mr-0'>
                  Organize Report Columns
                </button>
              </div> */}
              <div className='table-columns-v'>
                <div className='table-pick-v'>
                  <table className='bom-table'>
                    <tr className='thead-bom sticker-th'>
                      <td>
                        <div className='header-table-content-v'>
                          <div>Columns</div>
                          <div className='header-icons-sorting'>
                            {/* <FaArrowUpAZ
                          className='header-sort-icon'
                          onClick={() => {
                            sortDataInColumn('field_label', true);
                          }}
                        />
                        <FaArrowDownZA
                          className='header-sort-icon'
                          onClick={() => {
                            sortDataInColumn('field_label', false);
                          }}
                        /> */}
                          </div>
                        </div>
                      </td>
                    </tr>

                    <>
                      {META_DATA_CRM_VARIABLES?.CALL_REPORTS_VISIBLE_COLUMN.map(
                        (field) => {
                          const objectField = findObjectByKeyValue(
                            sortedCallFormLayout,
                            'api_name',
                            field
                          );
                          return (
                            <>
                              <tr
                                className='item-bom'
                                role='button'
                                onClick={() => {
                                  handleSortingItem(objectField?.api_name);
                                }}
                              >
                                <td
                                  className={`${
                                    currentSelectedItem == objectField?.api_name
                                      ? 'selected-on-sorting'
                                      : ''
                                  }`}
                                >
                                  {objectField?.field_label}
                                </td>
                              </tr>
                            </>
                          );
                        }
                      )}
                    </>
                  </table>
                </div>
                <div className='arrows-page'>
                  <div className='arrow-sort-v'>
                    <BsArrowUpCircleFill
                      onClick={() => {
                        handleSortUpBtn(
                          META_DATA_CRM_VARIABLES?.CALL_REPORTS_VISIBLE_COLUMN,
                          currentSelectedItem
                        );
                      }}
                    />
                  </div>
                  <div className='arrow-sort-v'>
                    <BsArrowDownCircleFill
                      onClick={() => {
                        handleSortDownBtn(
                          META_DATA_CRM_VARIABLES?.CALL_REPORTS_VISIBLE_COLUMN,
                          currentSelectedItem
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </Wrapper>
          </div>
        </>
      )}
    </>
  );
};

export default CallSettingsPageContent;
