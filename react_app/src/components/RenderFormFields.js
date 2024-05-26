import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  handleFormData,
  handleOpenDropdownShow,
} from '../redux/user/userSlice';
import { addElement, removeElement } from '../helper';
import { IoCloseCircle } from 'react-icons/io5';

const RenderFormFields = ({ field, form, form_name, open_dropdown_state }) => {
  const dispatch = useDispatch();

  const handleDropdownItemClick = (api_name, value) => {
    dispatch(handleFormData({ name: api_name, value, form: form_name }));
    dispatch(
      handleOpenDropdownShow({
        name: api_name,
        value: !open_dropdown_state[api_name],
      })
    );
  };

  const handleDropdownMultiSelectItemClick = (
    api_name,
    value,
    listElements
  ) => {
    const newValue = addElement(listElements, value);
    console.log(newValue, listElements, api_name);
    dispatch(
      handleFormData({ name: api_name, value: newValue, form: form_name })
    );
  };
  const handleRemoveDropdownMultiSelectItemClick = (
    api_name,
    value,
    listElements
  ) => {
    console.log('removeValue', value, api_name);
    const removeValue = removeElement(listElements, value);
    dispatch(
      handleFormData({ name: api_name, value: removeValue, form: form_name })
    );
  };

  const handleInputChangeData = (e) => {
    dispatch(
      handleFormData({
        name: e.target.name,
        value: e.target.value,
        form: form_name,
      })
    );
  };

  const properDataType =
    field?.data_type === 'datetime' ? 'datetime-local' : field?.data_type;

  const isLookupOrPicklist =
    field?.data_type === 'lookup' ||
    field?.data_type === 'picklist' ||
    field?.data_type === 'multiselectpicklist';

  return (
    <div className='crm-create-fields custabDivCreate'>
      <div className='customfieldLabel'>
        {field?.field_label}
        {field?.required && <span className='required-text'>*</span>}
      </div>
      <div className='customfieldValue cxBoxInput horizontal lyteInputBox fieldContainer w-60'>
        {field?.data_type == 'textarea' && (
          <>
            <textarea
              placeholder=''
              id={field?.api_name}
              name={field?.api_name}
              value={
                form?.[field?.api_name]?.['name'] || form?.[field?.api_name]
              }
              onChange={handleInputChangeData}
            />
          </>
        )}
        {field?.data_type !== 'textarea' && (
          <input
            id={field?.api_name}
            type={properDataType}
            value={form?.[field?.api_name]?.['name'] || form?.[field?.api_name]}
            name={field?.api_name}
            onChange={handleInputChangeData}
            readOnly={isLookupOrPicklist}
            step='1'
            onClick={() =>
              dispatch(
                handleOpenDropdownShow({
                  name: field?.api_name,
                  value: !open_dropdown_state[field?.api_name],
                })
              )
            }
          />
        )}

        {field?.data_type === 'picklist' &&
          open_dropdown_state[field?.api_name] && (
            <div className='list-dropdown zcrmCard roof-dp'>
              {field?.pick_list_values.map((picklist_val) => (
                <div
                  key={picklist_val?.actual_value}
                  className={`dropdown-item ${
                    form?.[field?.api_name] === picklist_val?.display_value
                      ? 'dropdown-active-select'
                      : ''
                  }`}
                  onClick={() =>
                    handleDropdownItemClick(
                      field?.api_name,
                      picklist_val?.actual_value
                    )
                  }
                >
                  {picklist_val?.display_value}
                </div>
              ))}
            </div>
          )}
        {field?.data_type === 'multiselectpicklist' &&
          open_dropdown_state[field?.api_name] && (
            <div className='list-dropdown zcrmCard roof-dp'>
              {field?.pick_list_values.map((picklist_val) => {
                const isSelected = form?.[field?.api_name]
                  ? form?.[field?.api_name].includes(
                      picklist_val?.display_value
                    )
                  : false;
                const handleRemoveClick = () =>
                  handleRemoveDropdownMultiSelectItemClick(
                    field?.api_name,
                    picklist_val?.actual_value,
                    form?.[field?.api_name]
                  );
                const handleItemClick = () =>
                  handleDropdownMultiSelectItemClick(
                    field?.api_name,
                    picklist_val?.actual_value,
                    form?.[field?.api_name]
                  );

                return (
                  <div
                    key={picklist_val?.actual_value}
                    className={`multi-select-item-options ${
                      isSelected ? '' : 'multi-select-item-options-new'
                    }`}
                  >
                    <div
                      className={`dropdown-item ${
                        isSelected ? 'dropdown-active-select' : ''
                      }`}
                      onClick={handleItemClick}
                    >
                      {picklist_val?.display_value}
                    </div>
                    {isSelected && (
                      <div className='dropdown-item remove-item-option dropdown-active-select'>
                        <span onClick={handleRemoveClick}>
                          <IoCloseCircle />
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
};

export default RenderFormFields;
