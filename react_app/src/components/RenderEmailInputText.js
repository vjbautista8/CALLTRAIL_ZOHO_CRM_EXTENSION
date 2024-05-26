import React from 'react';
import { isEmptyObject } from '../helper';

const RenderEmailInputText = ({
  FIELD_NAME,
  FIELD_ID,
  PLACEHOLDER,
  VALUE,
  READ,
}) => {
  return (
    <div className='crm-create-fields custabDivCreate'>
      <div className='customfieldLabel'>{FIELD_NAME}</div>
      <div className='customfieldValue cxBoxInput horizontal lyteInputBox fieldContainer w-60'>
        <input
          id={FIELD_ID}
          type='text'
          placeholder={PLACEHOLDER}
          value={isEmptyObject(VALUE) ? null : VALUE}
          readOnly={READ}
        />
      </div>
    </div>
  );
};

export default RenderEmailInputText;
