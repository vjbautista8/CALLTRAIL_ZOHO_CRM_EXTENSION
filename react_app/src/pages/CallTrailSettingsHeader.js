import React from 'react';
import { IoSettings } from 'react-icons/io5';
const CallTrailSettingsHeader = () => {
  return (
    <div className='v_header_container settings-header-ct'>
      <div className='v_header_container_title'>
        <div className=''>
          <>
            <img
              src='./CallTrail_logo_circular_with_Beta_high_res.png'
              alt='no-data'
              className='ext_icon'
            />
            {/* <IoSettings className='app_icon' /> */}
          </>
        </div>
        <div className='v_header_container_title_text'>
          CallTrail Settings
          <br />
          <div className='v_header_container_title_subtext displayFlex'>
            <div className='displayFlex mr-1 sub-text-header'>
              Setup visible fields and columns on CallTrail modules.
            </div>
          </div>
        </div>
      </div>
      <div className='v_header_container_toolbar'></div>
    </div>
  );
};

export default CallTrailSettingsHeader;
