import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleStateChange } from '../redux/user/userSlice';
import { IoExpandSharp } from 'react-icons/io5';
import { LuShrink } from 'react-icons/lu';
const CallTrailRightPartHeader = () => {
  const dispatch = useDispatch();
  const { CURRENT_TAB, TABS, REPORT_FULLSCREEN } = useSelector(
    (store) => store.user
  );
  const handleFullscreenBtn = () => {
    dispatch(
      handleStateChange({
        name: 'REPORT_FULLSCREEN',
        value: !REPORT_FULLSCREEN,
      })
    );
  };
  return (
    <div className='darkMainHead '>
      <div className='buttons-tab'>
        {TABS.map((tab, i) => {
          return (
            <>
              <button
                className={`lyte-button outlineprimary  newbutton rounded ${
                  CURRENT_TAB === tab ? 'active-rounded' : 'in-active'
                }`}
                onClick={() => {
                  dispatch(
                    handleStateChange({ name: 'CURRENT_TAB', value: tab })
                  );
                }}
              >
                {tab}
              </button>
            </>
          );
        })}
      </div>
      <div
        className='expand-shrink-div header-sort-icon'
        onClick={handleFullscreenBtn}
      >
        {REPORT_FULLSCREEN ? (
          <LuShrink data-tooltip-id='report_min' className='icon_min_max' />
        ) : (
          <IoExpandSharp
            data-tooltip-id='report_max'
            className='icon_min_max'
          />
        )}
      </div>
    </div>
  );
};

export default CallTrailRightPartHeader;
