import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  MdOutlineMail,
  MdOutlineContactPhone,
  MdOutlineSendToMobile,
} from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import { handleStateChange } from '../redux/user/userSlice';
const CallTrailHeader = () => {
  const dispatch = useDispatch();
  const { CURRENT_RECORD_DATA, META_DATA, SERVICE_ORIGIN } = useSelector(
    (store) => store.user
  );
  return (
    <>
      <div className='v_header_container animate__animated animate__slideInDown animate__faster'>
        <div className='v_header_container_title'>
          <div className='v_header_container_title_icon'>
            {(CURRENT_RECORD_DATA?.Record_Image && (
              <>
                <img
                  className='photo-avatar'
                  src={`${SERVICE_ORIGIN}/crm/EntityImageAttach.do?action_module=${META_DATA?.Entity}&entityId=${META_DATA?.EntityId[0]}&actionName=readImage&fileId=${CURRENT_RECORD_DATA?.Record_Image}`}
                  alt='avatar'
                  srcset=''
                />
              </>
            )) || (
              <>
                <CiUser className='app_icon' />
              </>
            )}
          </div>
          <div className='v_header_container_title_text'>
            {CURRENT_RECORD_DATA?.First_Name !== null &&
              CURRENT_RECORD_DATA?.First_Name}{' '}
            {CURRENT_RECORD_DATA?.Last_Name !== null &&
              CURRENT_RECORD_DATA?.Last_Name}
            {CURRENT_RECORD_DATA?.Company && (
              <span className='f17'> - {CURRENT_RECORD_DATA?.Company} </span>
            )}
            {CURRENT_RECORD_DATA?.Account_Name && (
              <span className='f17'>
                {' '}
                - {CURRENT_RECORD_DATA?.Account_Name?.name}
              </span>
            )}
            <br />
            <div className='v_header_container_title_subtext displayFlex'>
              <div className='displayFlex mr-1 sub-text-header'>
                {CURRENT_RECORD_DATA?.Email && (
                  <>
                    <div className='displayFlex'>
                      <button
                        className='lyte-button primarybtn lytePrimaryBtn  icon-left-part'
                        onClick={() => {
                          dispatch(
                            handleStateChange({
                              name: 'CURRENT_CREATION_TAB',
                              value: 'Send Email',
                            })
                          );
                        }}
                      >
                        <MdOutlineMail className='icon-btn-text' />
                      </button>
                      <div className='lyte-button outlineprimary  newbutton  icon-right-part center-item defaultcursor'>
                        {CURRENT_RECORD_DATA?.Email}
                      </div>
                    </div>
                  </>
                )}
                {CURRENT_RECORD_DATA?.Mobile && (
                  <>
                    <div className='displayFlex'>
                      <button className='lyte-button primarybtn lytePrimaryBtn  icon-left-part'>
                        <a href={`tel:${CURRENT_RECORD_DATA?.Mobile}`}>
                          <MdOutlineSendToMobile className='icon-btn-text' />
                        </a>
                      </button>

                      <div className='lyte-button outlineprimary  newbutton  icon-right-part center-item defaultcursor'>
                        {CURRENT_RECORD_DATA?.Mobile}
                      </div>
                    </div>
                  </>
                )}
                {CURRENT_RECORD_DATA?.Phone && (
                  <div className='displayFlex'>
                    <button className='lyte-button primarybtn lytePrimaryBtn  icon-left-part'>
                      <a href={`tel:${CURRENT_RECORD_DATA?.Phone}`}>
                        <MdOutlineContactPhone className='icon-btn-text' />
                      </a>
                    </button>
                    <div className='lyte-button outlineprimary  newbutton  icon-right-part center-item defaultcursor'>
                      {CURRENT_RECORD_DATA?.Phone}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='v_header_container_toolbar'></div>
      </div>
    </>
  );
};

export default CallTrailHeader;
