import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretDown } from 'react-icons/fa';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
  handleFormData,
  handleResetCallFormData,
  handleStateChange,
} from '../../redux/user/userSlice';
import RenderForm from '../../components/RenderForm';
import RenderTextInput from '../../components/RenderTextInput';
import RenderFormFields from '../../components/RenderFormFields';
import { addRecord } from '../../redux/user/zoho';
import { isValidDurationFormat } from '../../helper';
import HourGlassLoading from '../../components/loading/HourGlassLoading';

const CallContent = () => {
  const dispatch = useDispatch();
  const {
    FORM_LAYOUT,
    ON_CALL,
    META_DATA_CRM_VARIABLES,
    CALL_FORM,
    ON_CALL_SAVING,
    META_DATA,
    OPEN_DROPDOWN,
    ON_TIMER,
  } = useSelector((store) => store.user);

  const handleStartTimerBtn = (e) => {
    e.preventDefault();
    dispatch(
      handleFormData({
        name: 'Call_Start_Time',
        value: moment().format('YYYY-MM-DDTHH:mm:ss'),
        form: 'CALL_FORM',
      })
    );
    dispatch(
      handleFormData({
        name: 'Call_Duration',
        value: '',
        form: 'CALL_FORM',
      })
    );
    dispatch(handleStateChange({ name: 'ON_TIMER', value: true }));
  };

  const handleStopTimerBtn = (e) => {
    e.preventDefault();
    const date1 = moment(CALL_FORM['Call_Start_Time']);
    const date2 = moment();
    const diffInSeconds = date2.diff(date1, 'seconds');
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    dispatch(
      handleFormData({
        name: 'Call_Duration',
        value: formattedTime,
        form: 'CALL_FORM',
      })
    );
    dispatch(handleStateChange({ name: 'ON_TIMER', value: false }));
  };

  const handleSaveBtn = () => {
    const APIData = CALL_FORM;
    const data = {
      Entity: 'Calls',
      APIData,
    };

    if (isValidDurationFormat(APIData?.Call_Duration)) {
      dispatch(addRecord(data));
    } else {
      toast.error(`Invalid Call Duration Format. '00:00'`);
    }
  };

  if (ON_CALL_SAVING) {
    return <HourGlassLoading />;
  }

  return (
    <>
      <div className='form-page-data'>
        <span className='f17 v_header_container_title_text '>
          <FaCaretDown /> Call Information
        </span>
        {META_DATA?.Entity === 'Contacts' && (
          <>
            <RenderTextInput
              FIELD_NAME='Call To'
              FIELD_ID='Who_Id'
              PLACEHOLDER=''
              VALUE={CALL_FORM?.Who_Id?.name || CALL_FORM?.Who_Id}
              READ
            />
            <RenderTextInput
              FIELD_NAME='Related To'
              FIELD_ID='What_Id'
              PLACEHOLDER=''
              VALUE={CALL_FORM?.What_Id?.name || CALL_FORM?.What_Id}
              READ
            />
          </>
        )}
        {META_DATA?.Entity === 'Leads' && (
          <RenderTextInput
            FIELD_NAME='Call To'
            FIELD_ID='What_Id'
            PLACEHOLDER=''
            VALUE={CALL_FORM?.What_Id?.name || CALL_FORM?.What_Id}
            READ
          />
        )}
        <div className='section-page-data'>
          {FORM_LAYOUT?.CALL[0]?.sections.map((section, i) => (
            <div key={i}>
              {section?.fields.map(
                (field, f) =>
                  META_DATA_CRM_VARIABLES?.CALL_FORM_VISIBLE_FIELDS.includes(
                    field?.api_name
                  ) && (
                    <RenderFormFields
                      key={f}
                      field={field}
                      form={CALL_FORM}
                      form_name='CALL_FORM'
                      open_dropdown_state={OPEN_DROPDOWN}
                    />
                  )
              )}
            </div>
          ))}
        </div>
      </div>
      <div className='footer-btn-data'>
        <div className='timer-part'>
          {!ON_TIMER ? (
            <button
              className='lyte-button primarybtn lytePrimaryBtn newbutton'
              onClick={handleStartTimerBtn}
            >
              Start Timer
            </button>
          ) : (
            <button
              className='lyte-button primarybtn lytePrimaryBtn newbutton timer-btn'
              onClick={handleStopTimerBtn}
            >
              Stop Timer
            </button>
          )}
        </div>
        <div className='saving-part'>
          <button
            className='lyte-button outlineredlight'
            onClick={() => {
              dispatch(handleStateChange({ name: 'ON_CALL', value: false }));
              dispatch(handleStateChange({ name: 'ON_TIMER', value: false }));
              dispatch(handleResetCallFormData());
            }}
          >
            Cancel
          </button>
          <button
            className='lyte-button primarybtn lytePrimaryBtn newbutton'
            onClick={handleSaveBtn}
          >
            Save Call
          </button>
        </div>
      </div>
    </>
  );
};

const CallForm = () => {
  const { ON_CALL, ON_CALL_SAVING } = useSelector((store) => store.user);

  return (
    <RenderForm
      ON_VAL={ON_CALL}
      NAME='ON_CALL'
      CONTENT={<CallContent />}
      SAVING={ON_CALL_SAVING}
    />
  );
};

export default CallForm;
