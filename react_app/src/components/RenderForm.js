import React from 'react';
import { FaCaretRight, FaCaretDown, FaAngleDoubleRight } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { handleStateChange } from '../redux/user/userSlice';
import HourGlassLoading from './loading/HourGlassLoading';

const RenderForm = ({ ON_VAL, NAME, CONTENT, SAVING }) => {
  const dispatch = useDispatch();
  return (
    <>
      {!ON_VAL && (
        <>
          <div className='big-btn-page'>
            <button
              className='lyte-button primarybtn lytePrimaryBtn newbutton big-btn-icon'
              onClick={() => {
                dispatch(
                  handleStateChange({
                    name: NAME,
                    value: true,
                  })
                );
              }}
            >
              <FaPlus className='big-btn-icon-sub' />
            </button>
          </div>
        </>
      )}
      {SAVING && (
        <>
          <div className='big-btn-page'>
            <HourGlassLoading />
          </div>
        </>
      )}
      {ON_VAL && <>{CONTENT}</>}
    </>
  );
};

export default RenderForm;
