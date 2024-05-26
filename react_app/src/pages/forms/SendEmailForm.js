import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCaretDown } from 'react-icons/fa';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
  handleFormData,
  handleResetCallFormData,
  handleResetEmailForm,
  handleResetTaskFormData,
  handleStateChange,
} from '../../redux/user/userSlice';
import RenderForm from '../../components/RenderForm';
import RenderTextInput from '../../components/RenderTextInput';
import RenderFormFields from '../../components/RenderFormFields';
import { addRecord, sendEmail } from '../../redux/user/zoho';
import { isValidDurationFormat } from '../../helper';
import HourGlassLoading from '../../components/loading/HourGlassLoading';
import RenderEmailInputText from '../../components/RenderEmailInputText';

const EmailContent = () => {
  const dispatch = useDispatch();
  const {
    FORM_LAYOUT,
    ON_EMAIL,
    META_DATA_CRM_VARIABLES,
    SENDMAIL_FORM,
    ON_EMAIL_SAVING,
    META_DATA,
    OPEN_DROPDOWN,
    ON_TIMER,
    CURRENT_RECORD_DATA,
    CURRENT_USER_INFO,
  } = useSelector((store) => store.user);

  const handleSaveBtn = () => {
    dispatch(sendEmail(SENDMAIL_FORM));
  };

  if (ON_EMAIL_SAVING) {
    return <HourGlassLoading />;
  }

  return (
    <>
      <div className='form-page-data'>
        <span className='f17 v_header_container_title_text '>
          <FaCaretDown /> Email Information
        </span>
        <RenderEmailInputText
          FIELD_NAME='From'
          FIELD_ID='From'
          PLACEHOLDER=''
          VALUE={CURRENT_USER_INFO['email']}
          READ
        />
        <RenderEmailInputText
          FIELD_NAME='To'
          FIELD_ID='To'
          PLACEHOLDER=''
          VALUE={CURRENT_RECORD_DATA['Email']}
          READ
        />
        {/* <RenderFormFields
          key='to_email'
          field={{ data_type: 'text', api_name: 'to_email', field_label: 'To' }}
          form={SENDMAIL_FORM}
          form_name='SENDMAIL_FORM'
          open_dropdown_state={OPEN_DROPDOWN}
        /> */}
        <div className='section-page-data'>
          <RenderFormFields
            key='subject'
            field={{
              data_type: 'text',
              api_name: 'subject',
              field_label: 'Subject',
            }}
            form={SENDMAIL_FORM}
            form_name='SENDMAIL_FORM'
            open_dropdown_state={OPEN_DROPDOWN}
          />
          <RenderFormFields
            key='message'
            field={{
              data_type: 'textarea',
              api_name: 'message',
              field_label: 'Message',
            }}
            form={SENDMAIL_FORM}
            form_name='SENDMAIL_FORM'
            open_dropdown_state={OPEN_DROPDOWN}
          />
        </div>
      </div>
      <div className='footer-btn-data'>
        <div className='timer-part'></div>
        <div className='saving-part'>
          <button
            className='lyte-button outlineredlight'
            onClick={() => {
              dispatch(handleStateChange({ name: 'ON_EMAIL', value: false }));
              dispatch(handleResetEmailForm());
            }}
          >
            Cancel
          </button>
          <button
            className='lyte-button primarybtn lytePrimaryBtn newbutton'
            onClick={handleSaveBtn}
          >
            Send Email
          </button>
        </div>
      </div>
    </>
  );
};

const SendEmailForm = () => {
  const { ON_EMAIL, ON_EMAIL_SAVING } = useSelector((store) => store.user);

  return (
    <RenderForm
      ON_VAL={ON_EMAIL}
      NAME='ON_EMAIL'
      CONTENT={<EmailContent />}
      SAVING={ON_EMAIL_SAVING}
    />
  );
};

export default SendEmailForm;
