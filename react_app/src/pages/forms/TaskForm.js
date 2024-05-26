import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretDown } from 'react-icons/fa';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
  handleFormData,
  handleResetCallFormData,
  handleResetTaskFormData,
  handleStateChange,
} from '../../redux/user/userSlice';
import RenderForm from '../../components/RenderForm';
import RenderTextInput from '../../components/RenderTextInput';
import RenderFormFields from '../../components/RenderFormFields';
import { addRecord } from '../../redux/user/zoho';
import { isValidDurationFormat } from '../../helper';
import HourGlassLoading from '../../components/loading/HourGlassLoading';

const TaskContent = () => {
  const dispatch = useDispatch();
  const {
    FORM_LAYOUT,
    ON_TASK,
    META_DATA_CRM_VARIABLES,
    TASK_FORM,
    ON_TASK_SAVING,
    META_DATA,
    OPEN_DROPDOWN,
    ON_TIMER,
  } = useSelector((store) => store.user);

  const handleSaveBtn = () => {
    const APIData = TASK_FORM;
    const data = {
      Entity: 'Tasks',
      APIData,
    };

    dispatch(addRecord(data));
  };

  if (ON_TASK_SAVING) {
    return <HourGlassLoading />;
  }

  return (
    <>
      <div className='form-page-data'>
        <span className='f17 v_header_container_title_text '>
          <FaCaretDown /> Task Information
        </span>
        {META_DATA?.Entity === 'Contacts' && (
          <>
            <RenderTextInput
              FIELD_NAME='Contact Name'
              FIELD_ID='Who_Id'
              PLACEHOLDER=''
              VALUE={TASK_FORM?.Who_Id?.name || TASK_FORM?.Who_Id}
              READ
            />
            <RenderTextInput
              FIELD_NAME='Related To'
              FIELD_ID='What_Id'
              PLACEHOLDER=''
              VALUE={TASK_FORM?.What_Id?.name || TASK_FORM?.What_Id}
              READ
            />
          </>
        )}
        {META_DATA?.Entity === 'Leads' && (
          <RenderTextInput
            FIELD_NAME='Related To'
            FIELD_ID='What_Id'
            PLACEHOLDER=''
            VALUE={TASK_FORM?.What_Id?.name || TASK_FORM?.What_Id}
            READ
          />
        )}
        <div className='section-page-data'>
          {FORM_LAYOUT?.TASK[0]?.sections.map((section, i) => (
            <>
              <div key={i}>
                {section?.fields.map(
                  (field, f) =>
                    META_DATA_CRM_VARIABLES?.TASK_FORM_VISIBLE_FIELDS.includes(
                      field?.api_name
                    ) && (
                      <RenderFormFields
                        key={f}
                        field={field}
                        form={TASK_FORM}
                        form_name='TASK_FORM'
                        open_dropdown_state={OPEN_DROPDOWN}
                      />
                    )
                )}
              </div>
            </>
          ))}
        </div>
      </div>
      <div className='footer-btn-data'>
        <div className='timer-part'></div>
        <div className='saving-part'>
          <button
            className='lyte-button outlineredlight'
            onClick={() => {
              dispatch(handleStateChange({ name: 'ON_TASK', value: false }));
              dispatch(handleResetTaskFormData());
            }}
          >
            Cancel
          </button>
          <button
            className='lyte-button primarybtn lytePrimaryBtn newbutton'
            onClick={handleSaveBtn}
          >
            Save Task
          </button>
        </div>
      </div>
    </>
  );
};

const TaskForm = () => {
  const { ON_TASK, ON_TASK_SAVING } = useSelector((store) => store.user);

  return (
    <RenderForm
      ON_VAL={ON_TASK}
      NAME='ON_TASK'
      CONTENT={<TaskContent />}
      SAVING={ON_TASK_SAVING}
    />
  );
};

export default TaskForm;
