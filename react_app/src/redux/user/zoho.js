import { createAsyncThunk } from '@reduxjs/toolkit';
const ZOHO = window.ZOHO;
export const getSelectedRecordByID = createAsyncThunk(
  'user/getSelectedRecordByID',
  async (data, thunkAPI) => {
    try {
      const response = ZOHO.CRM.API.getRecord({
        Entity: data.Entity,
        RecordID: data.RecordID,
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getRelatedRecords = createAsyncThunk(
  'user/getRelatedRecords',
  async (data, thunkAPI) => {
    try {
      const response = ZOHO.CRM.API.getRelatedRecords({
        Entity: data.Entity,
        RecordID: data.RecordID,
        RelatedList: data.RelatedList,
        page: 1,
        per_page: 200,
        // sort_order: 'asc',
        // sort_by: 'Equipment_Type',
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const sendEmail = createAsyncThunk(
  'user/sendEmail',
  async (data, thunkAPI) => {
    //plugin-calltrail.zohosandbox.com/crm/v2/functions/calltrail__sendingemail/actions/execute?auth_type=apikey&zapikey=1001.2f80994bf2413927891a0c9cdb5d506a.7326eb088f753b148efc0d86a550cb74
    // /https://plugin-calltrail.zohosandbox.com/crm/v2/functions/calltrail__sendemails/actions/execute?auth_type=apikey&zapikey=1001.2f80994bf2413927891a0c9cdb5d506a.7326eb088f753b148efc0d86a550cb74
    https: try {
      var func_name = 'calltrail__sendingemail';
      var req_data = {
        arguments: JSON.stringify({
          to_email: data?.to_email,
          subject: data?.subject,
          message: data?.message,
        }),
      };
      const response = ZOHO.CRM.FUNCTIONS.execute(func_name, req_data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
//updateCallTrailSettings
export const updateCRMVariables = createAsyncThunk(
  'user/updateCRMVariables',
  //https://www.zohoapis.com/crm/v2/functions/calltrail__updatecrmvariables/actions/execute?auth_type=apikey&zapikey=<zapikey>
  async (data, thunkAPI) => {
    try {
      var func_name = 'calltrail__updatecrmvariables';
      var req_data = {
        arguments: JSON.stringify({
          varName: data?.varName,
          varValue: data?.varValue,
        }),
      };
      const response = ZOHO.CRM.FUNCTIONS.execute(func_name, req_data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (data, thunkAPI) => {
    try {
      const response = ZOHO.CRM.CONFIG.getCurrentUser();

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getCRMVariables = createAsyncThunk(
  'user/getCRMVariables',
  async (data, thunkAPI) => {
    try {
      var keys = {
        apiKeys: [
          'calltrail__CALL_FORM_VISIBLE_FIELDS',
          'calltrail__CALL_REPORTS_VISIBLE_COLUMN',
          'calltrail__TASK_FORM_VISIBLE_FIELDS',
          'calltrail__TASK_REPORTS_VISIBLE_COLUMN',
        ],
      };
      const response = ZOHO.CRM.API.getOrgVariable(keys);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getLayoutCalls = createAsyncThunk(
  'user/getLayoutCalls',
  async (data, thunkAPI) => {
    try {
      const response = ZOHO.CRM.META.getLayouts({
        Entity: 'Calls',
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const getLayoutTasks = createAsyncThunk(
  'user/getLayoutTasks',
  async (data, thunkAPI) => {
    try {
      const response = ZOHO.CRM.META.getLayouts({
        Entity: 'Tasks',
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const addRecord = createAsyncThunk(
  'user/addRecord',
  async (data, thunkAPI) => {
    try {
      console.log('data Call', data);
      const response = ZOHO.CRM.API.insertRecord({
        Entity: data.Entity,
        APIData: data.APIData,
        Trigger: ['workflow'],
      });

      return response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
