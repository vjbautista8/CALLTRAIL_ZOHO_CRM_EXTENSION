import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { handleStateChange } from '../redux/user/userSlice';
const CallTrailContentHeaderButtonIconOnly = ({
  CURRENT_CREATION_TAB,
  NAME,
  ON_VAL,
}) => {
  const dispatch = useDispatch();
  return (
    <button
      className={`lyte-button outlineprimary  newbutton rounded force-dflex ${
        CURRENT_CREATION_TAB === NAME ? 'active-rounded' : 'in-active'
      }`}
      onClick={() => {
        dispatch(
          handleStateChange({
            name: 'CURRENT_CREATION_TAB',
            value: NAME,
          })
        );
      }}
    >
      <div>{NAME}</div>

      {ON_VAL && (
        <>
          <div class='loader-pulse'></div>
        </>
      )}
    </button>
  );
};

export default CallTrailContentHeaderButtonIconOnly;
