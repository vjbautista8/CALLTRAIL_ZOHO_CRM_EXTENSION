import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getSelectedRecordByID,
  getCRMVariables,
  getLayoutCalls,
  getLayoutTasks,
  getRelatedRecords,
  addRecord,
  getCurrentUser,
  sendEmail,
  updateCRMVariables,
} from './zoho';
import { convertListStringToArray, getRandomInt } from '../../helper';

const initialState = {
  CURRENT_USER_INFO: {},
  SERVICE_ORIGIN: '',
  PAGE: '',
  IS_LOADING: true,
  CURRENT_RECORD_DATA: {},
  TABS: ['Call History', 'Tasks'],
  CREATION_TABS: ['Log a Call', 'Create Task', 'Send Email'],
  CURRENT_CREATION_TAB: 'Log a Call',
  CURRENT_TAB: 'Call History',
  META_DATA: {},
  FORM_LAYOUT: {
    CALL: {},
    TASK: {},
  },
  ON_CALL_SAVING: false,
  ON_TASK_SAVING: false,
  ON_EMAIL_SAVING: false,
  ON_CALL: false,
  ON_TASK: false,
  ON_MEETING: false,
  ON_EMAIL: false,
  ON_TIMER: false,
  ACTIVITIES: [],
  EMAILS: [],
  CALL_FORM: { Services_Sold: [] },
  TASK_FORM: {},
  MEETING_FORM: {},
  SENDMAIL_FORM: {},
  META_DATA_CRM_VARIABLES: {},
  FETCH_ACTIVITIES: false,
  HAS_CALL: false,
  HAS_TASK: false,
  HAS_MEETING: false,
  HAS_EMAIL: false,
  DONE_CRM_VARIABLES: false,
  DONE_ACTIVITIES: false,
  DONE_FORM_LAYOUT: false,
  DONE_CALLS_LAYOUT: false,
  DONE_TASKS_LAYOUT: false,
  DONE_FETCHING_FORM_LAYOUTS: false,
  OPEN_DROPDOWN: {},
  ACTIVITIES_FETCHER: '',
  SELECTED_SORTING_ITEM: '',
  REPORT_FULLSCREEN: false,
};

const updateFormsForEntity = (state, data, entity) => {
  const fields = {
    Contacts: {
      Who_Id: {
        name: data['Full_Name'],
        id: data['id'],
      },
      What_Id: {
        name: data['Account_Name']?.['name'],
        id: data['Account_Name']?.['id'],
      },
      $se_module: 'Accounts',
    },
    Leads: {
      What_Id: {
        name: data['Full_Name'],
        id: data['id'],
      },
      $se_module: 'Leads',
    },
  };

  state.CALL_FORM = { ...state.CALL_FORM, ...fields[entity] };
  state.TASK_FORM = { ...state.TASK_FORM, ...fields[entity] };
  state.SENDMAIL_FORM.to_email = data['Email'];
};
const handleResetForm = (state, state_name) => {
  const data = state.CURRENT_RECORD_DATA;
  const entity = state.META_DATA?.Entity;
  const fields = {
    Contacts: {
      Who_Id: {
        name: data['Full_Name'],
        id: data['id'],
      },
      What_Id: {
        name: data['Account_Name']?.['name'],
        id: data['Account_Name']?.['id'],
      },
      $se_module: 'Accounts',
    },
    Leads: {
      What_Id: {
        name: data['Full_Name'],
        id: data['id'],
      },
      $se_module: 'Leads',
    },
  };

  state[state_name] = fields[entity];
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleStateChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    handleOpenDropdownShow: (state, { payload: { name, value } }) => {
      state.OPEN_DROPDOWN = {};
      state.OPEN_DROPDOWN[name] = value;
    },
    handleFormData: (state, { payload: { name, value, form } }) => {
      state[form][name] = value;
    },
    // handleSettingFormData: (state, { payload: { name, value, form } }) => {
    //   state[form][name] = value;
    // },
    handleResetCallFormData: (state) => {
      handleResetForm(state, 'CALL_FORM');
    },
    handleResetTaskFormData: (state) => {
      handleResetForm(state, 'TASK_FORM');
    },
    handleResetEmailForm: (state) => {
      state.SENDMAIL_FORM = {};
      state.SENDMAIL_FORM.to_email = state.CURRENT_RECORD_DATA['Email'];
    },
  },
  extraReducers: (builder) => {
    builder
      //sendEmail
      .addCase(sendEmail.pending, (state, { meta }) => {
        state.LOADING = true;
        console.log('sendEmail pending => ', meta);
      })
      .addCase(sendEmail.fulfilled, (state, { payload, meta }) => {
        console.log('sendEmail fulfilled => ', payload, meta);
        toast.success('Successfully sent.');

        //RESET CALL FORM
        state.SENDMAIL_FORM = {};
        state.SENDMAIL_FORM.to_email = state.CURRENT_RECORD_DATA?.['Email'];
        state.ON_EMAIL = false;
      })
      .addCase(sendEmail.rejected, (state, { payload, meta }) => {
        console.log('sendEmail ERROR => ', payload, meta);
        state.ON_EMAIL = false;
        state.LOADING = false;
        toast.error(
          'Something went wrong. Please fill-up the required fields.'
        );
      })
      //getCurrentUser
      .addCase(getCurrentUser.pending, (state, { meta }) => {
        console.log('getCurrentUser pending => ', meta);
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload, meta }) => {
        console.log('getCurrentUser fulfilled => ', payload, meta);
        if (payload?.users) {
          state.CURRENT_USER_INFO = payload?.users[0];
        }
      })
      .addCase(getCurrentUser.rejected, (state, { payload, meta }) => {
        console.log('getCurrentUser ERROR => ', payload, meta);
        toast.error('Something went wrong');
      })
      //addRecord
      .addCase(addRecord.pending, (state, { meta }) => {
        console.log('addRecord pending => ', meta);
        if (meta?.arg?.Entity == 'Tasks') {
          state.ON_TASK_SAVING = true;
        }
        if (meta?.arg?.Entity == 'Calls') {
          state.ON_TASK_SAVING = true;
        }
        state.DONE_ACTIVITIES = false;
        state.ACTIVITIES = [];
      })
      .addCase(addRecord.fulfilled, (state, { payload, meta }) => {
        console.log('addRecord fulfilled => ', payload, meta);

        if (payload?.data) {
          state.ACTIVITIES_FETCHER = getRandomInt(1, 100);
          toast.success('Successfully created');
          if (meta?.arg?.Entity == 'Tasks') {
            state.ON_TASK_SAVING = false;
            handleResetForm(state, 'TASK_FORM');
            state.ON_TASK = false;
          }
          if (meta?.arg?.Entity == 'Calls') {
            state.ON_TASK_SAVING = false;
            handleResetForm(state, 'CALL_FORM');
            state.ON_CALL = false;
          }
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      })
      .addCase(addRecord.rejected, (state, { payload, meta }) => {
        console.log('addRecord ERROR => ', payload, meta);
        toast.error(
          'Something went wrong. Please fill-up the required fields.'
        );
        if (meta?.arg?.Entity == 'Tasks') {
          state.ON_TASK_SAVING = false;
        }
        if (meta?.arg?.Entity == 'Calls') {
          state.ON_TASK_SAVING = false;
        }
        state.DONE_ACTIVITIES = true;
      })
      //===================== getRelatedRecords
      .addCase(getRelatedRecords.pending, (state) => {})
      .addCase(getRelatedRecords.fulfilled, (state, { payload }) => {
        const data = payload?.data;
        if (data) {
          const currentActivities = state.ACTIVITIES;
          state.ACTIVITIES = currentActivities.concat(data);
          console.log('getRelatedRecords', data);
        }
      })
      .addCase(getRelatedRecords.rejected, (state) => {})
      //===================== getSelectedRecordByID
      .addCase(getSelectedRecordByID.pending, (state) => {
        state.IS_LOADING = true;
      })
      .addCase(getSelectedRecordByID.fulfilled, (state, { payload }) => {
        const data = payload?.data[0];
        state.CURRENT_RECORD_DATA = data;
        const entity = state.META_DATA?.Entity;
        if (entity) updateFormsForEntity(state, data, entity);
        state.IS_LOADING = false;
      })
      .addCase(getSelectedRecordByID.rejected, (state) => {
        state.IS_LOADING = false;
      })
      //===================== getCRMVariables
      .addCase(getCRMVariables.pending, (state) => {
        state.DONE_CRM_VARIABLES = false;
      })
      .addCase(getCRMVariables.fulfilled, (state, { payload }) => {
        const content = payload?.Success?.Content;
        if (content) {
          state.META_DATA_CRM_VARIABLES = {
            CALL_FORM_VISIBLE_FIELDS: convertListStringToArray(
              content.calltrail__CALL_FORM_VISIBLE_FIELDS?.value
            ),
            CALL_REPORTS_VISIBLE_COLUMN: convertListStringToArray(
              content.calltrail__CALL_REPORTS_VISIBLE_COLUMN?.value
            ),

            TASK_FORM_VISIBLE_FIELDS: convertListStringToArray(
              content.calltrail__TASK_FORM_VISIBLE_FIELDS?.value
            ),
            TASK_REPORTS_VISIBLE_COLUMN: convertListStringToArray(
              content.calltrail__TASK_REPORTS_VISIBLE_COLUMN?.value
            ),
          };
          state.DONE_CRM_VARIABLES = true;
        }
      })
      .addCase(getCRMVariables.rejected, (state) => {
        state.DONE_CRM_VARIABLES = true;
      })
      //
      .addCase(updateCRMVariables.pending, (state, { meta }) => {
        console.log('updateCRMVariables pending ==>', meta);
      })
      .addCase(updateCRMVariables.fulfilled, (state, { payload }) => {
        console.log('updateCRMVariables fulfilled ==>');
        console.log(payload);
        const content = payload?.Success?.Content;
        toast.success('Successfully saved');
      })
      .addCase(updateCRMVariables.rejected, (state) => {
        console.log('updateCRMVariables rejected ==>');
        toast.success('Opps! Something went wrong');
      })
      //===================== getLayoutCalls
      .addCase(getLayoutCalls.pending, (state) => {
        state.DONE_CALLS_LAYOUT = false;
      })
      .addCase(getLayoutCalls.fulfilled, (state, { payload }) => {
        state.FORM_LAYOUT.CALL = payload?.layouts;
        state.DONE_CALLS_LAYOUT = true;
      })
      .addCase(getLayoutCalls.rejected, (state) => {
        state.DONE_CALLS_LAYOUT = true;
      })
      //===================== getLayoutTasks
      .addCase(getLayoutTasks.pending, (state) => {
        state.DONE_TASKS_LAYOUT = false;
      })
      .addCase(getLayoutTasks.fulfilled, (state, { payload }) => {
        state.FORM_LAYOUT.TASK = payload?.layouts;
        state.DONE_TASKS_LAYOUT = true;
      })
      .addCase(getLayoutTasks.rejected, (state) => {
        state.DONE_TASKS_LAYOUT = true;
      });
  },
});

export const {
  handleStateChange,
  handleOpenDropdownShow,
  handleFormData,
  handleResetCallFormData,
  handleResetTaskFormData,
  handleResetEmailForm,
} = userSlice.actions;
export default userSlice.reducer;
