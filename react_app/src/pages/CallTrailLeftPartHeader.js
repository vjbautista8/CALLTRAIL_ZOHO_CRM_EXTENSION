import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleStateChange } from '../redux/user/userSlice';
import CallTrailContentHeaderButton from '../components/CallTrailContentHeaderButton';
import { TbPhoneCall } from 'react-icons/tb';
import { FaTasks } from 'react-icons/fa';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';
const CallTrailLeftPartHeader = () => {
  const {
    CURRENT_CREATION_TAB,
    ON_CALL,
    ON_TASK,
    ON_EMAIL,
    REPORT_FULLSCREEN,
  } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <>
      {!REPORT_FULLSCREEN && (
        <div className='darkMainHead '>
          <div className='buttons-tab'>
            <CallTrailContentHeaderButton
              CURRENT_CREATION_TAB={CURRENT_CREATION_TAB}
              NAME={'Log a Call'}
              ON_VAL={ON_CALL}
            />
            <CallTrailContentHeaderButton
              CURRENT_CREATION_TAB={CURRENT_CREATION_TAB}
              NAME={'Create Task'}
              ON_VAL={ON_TASK}
            />
            <CallTrailContentHeaderButton
              CURRENT_CREATION_TAB={CURRENT_CREATION_TAB}
              NAME={'Send Email'}
              ON_VAL={ON_EMAIL}
            />
          </div>
        </div>
      )}
      {REPORT_FULLSCREEN && (
        <>
          <div className='small-nav-create'>
            <div className='d-flex'>
              <TbPhoneCall
                className='side-icon-min'
                data-tooltip-id='call_create'
                onClick={() => {
                  dispatch(
                    handleStateChange({
                      name: 'CURRENT_CREATION_TAB',
                      value: 'Log a Call',
                    })
                  );
                  dispatch(
                    handleStateChange({
                      name: 'REPORT_FULLSCREEN',
                      value: false,
                    })
                  );
                  dispatch(
                    handleStateChange({
                      name: 'ON_CALL',
                      value: true,
                    })
                  );
                }}
              />

              {ON_CALL && (
                <>
                  <div class='loader-pulse'></div>
                </>
              )}
            </div>
            <div className='d-flex'>
              <FaTasks
                className='side-icon-min'
                data-tooltip-id='task_create'
                onClick={() => {
                  dispatch(
                    handleStateChange({
                      name: 'CURRENT_CREATION_TAB',
                      value: 'Create Task',
                    })
                  );
                  dispatch(
                    handleStateChange({
                      name: 'REPORT_FULLSCREEN',
                      value: false,
                    })
                  );
                  dispatch(
                    handleStateChange({
                      name: 'ON_TASK',
                      value: true,
                    })
                  );
                }}
              />
              {ON_TASK && (
                <>
                  <div class='loader-pulse'></div>
                </>
              )}
            </div>
            <div className='d-flex'>
              <MdOutlineMarkEmailRead
                className='side-icon-min'
                data-tooltip-id='email_create'
                onClick={() => {
                  dispatch(
                    handleStateChange({
                      name: 'CURRENT_CREATION_TAB',
                      value: 'Send Email',
                    })
                  );
                  dispatch(
                    handleStateChange({
                      name: 'REPORT_FULLSCREEN',
                      value: false,
                    })
                  );
                  dispatch(
                    handleStateChange({
                      name: 'ON_EMAIL',
                      value: true,
                    })
                  );
                }}
              />
              {ON_EMAIL && (
                <>
                  <div class='loader-pulse'></div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CallTrailLeftPartHeader;
