import React, { useEffect, useState } from 'react';
import { BiSolidCategory } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
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
import { sortAndRemoveDuplicates, sortByKey } from '../../helper';
import CallSettingsPageContent from './CallSettingsPageContent';
const SettingsPageContent = () => {
  const dispatch = useDispatch();
  const { FORM_LAYOUT, DONE_FETCHING_FORM_LAYOUTS, META_DATA_CRM_VARIABLES } =
    useSelector((store) => store.user);

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
          handleStateChange({
            name: 'DONE_FETCHING_FORM_LAYOUTS',
            value: true,
          })
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
  return (
    <div className='setting-nav-page new_setupview' id='moduleCustomizationDiv'>
      <div className='module-nav-options fL layout_landing_left'>
        <div className='lamndingPageModuleList pT25'>
          <div className='moduleHeadingTitle dIB w100per titleWithSearch pB10'>
            <div className='darkMainHead no-border'>
              <div className='mr-0_5'>
                <BiSolidCategory />
              </div>
              Modules
            </div>
          </div>
          <div className='landingModuleLists pR oA'>
            <div className='v_header_container_title_subtext li_modules selected-module-setting'>
              Calls
            </div>
            <div className='v_header_container_title_subtext li_modules'>
              Tasks
            </div>
          </div>
        </div>
      </div>
      <div className='module-nav-content fL pR oA layout_landing_right'>
        <CallSettingsPageContent />
      </div>
    </div>
  );
};

export default SettingsPageContent;
