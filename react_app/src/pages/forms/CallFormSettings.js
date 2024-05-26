import React, { useEffect } from 'react';
import { FaCaretRight, FaCaretDown, FaAngleDoubleRight } from 'react-icons/fa';
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCRMVariables,
  getLayoutCalls,
  getLayoutTasks,
  updateCRMVariables,
} from '../../redux/user/zoho';
import { handleFormData, handleStateChange } from '../../redux/user/userSlice';
import HourGlassLoading from '../../components/loading/HourGlassLoading';
import { toggleElementList } from '../../helper';
import Wrapper from '../../wrappers/BOMTAbleWrapper';
const FieldContent = ({ field, meta }) => {
  const dispatch = useDispatch();
  const { FORM_LAYOUT, DONE_FETCHING_FORM_LAYOUTS, META_DATA_CRM_VARIABLES } =
    useSelector((store) => store.user);
  //   const handleRemoveDropdownMultiSelectItemClick = (
  //     api_name,
  //     value,
  //     listElements
  //   ) => {
  //     console.log('removeValue', value, api_name);
  //     const removeValue = removeElement(listElements, value);
  //     dispatch(
  //       handleFormData({ name: api_name, value: removeValue, form: form_name })
  //     );
  //   };
  const handleInputChangeData = (e) => {
    console.log({ name: e.target.name, value: e.target.checked });
    const newList = toggleElementList(
      META_DATA_CRM_VARIABLES?.CALL_FORM_VISIBLE_FIELDS,
      e.target.name
    );
    if (e.target.checked) {
      console.log('ADD');
    } else {
      console.log('REMOVE');
    }
    console.log(newList);
    dispatch(
      handleFormData({
        name: 'CALL_FORM_VISIBLE_FIELDS',
        value: newList,
        form: 'META_DATA_CRM_VARIABLES',
      })
    );
    dispatch(
      updateCRMVariables({
        varName: 'CALL_FORM_VISIBLE_FIELDS',
        varValue: newList,
      })
    );
  };
  return (
    <>
      <div className='setting-option-checklist'>
        <div>
          <div className='f17 setting-field-options '>
            {field?.field_label}
            {field?.required && <span className='required-text'>*</span>}
          </div>
          <div className='v_header_container_title_subtext mt-0 '>
            {field?.api_name}
          </div>
          <div>{field?.data_type}</div>
        </div>

        <>
          <div>
            <>
              <input
                id={field?.api_name}
                type='checkbox'
                checked={
                  meta?.CALL_FORM_VISIBLE_FIELDS.includes(field?.api_name) ||
                  field?.api_name == 'Who_Id' ||
                  field?.api_name == 'What_Id'
                }
                className='setting-checkbox-box'
                name={field?.api_name}
                //   onChange={handleInputChangeData}
                readOnly={
                  field?.api_name == 'Who_Id' || field?.api_name == 'What_Id'
                }
                onChange={handleInputChangeData}
                // step='1'
                // onClick={() =>
                //   dispatch(
                //     handleOpenDropdownShow({
                //       name: field?.api_name,
                //       value: !open_dropdown_state[field?.api_name],
                //     })
                //   )
                // }
              />
            </>
          </div>
        </>
      </div>
    </>
  );
};
const CallFormSettings = () => {
  const dispatch = useDispatch();
  const { FORM_LAYOUT, DONE_FETCHING_FORM_LAYOUTS, META_DATA_CRM_VARIABLES } =
    useSelector((store) => store.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCRMVariables({})).then((dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        });
        await dispatch(getLayoutCalls({})).then((dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        });
        await dispatch(getLayoutTasks({})).then((dispatchResult) => {
          if (dispatchResult.error)
            throw new Error(dispatchResult.error.message);
        });
        await dispatch(
          handleStateChange({ name: 'DONE_FETCHING_FORM_LAYOUTS', value: true })
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);
  if (!DONE_FETCHING_FORM_LAYOUTS) {
    return <HourGlassLoading />;
  }
  return (
    <div>
      <div className='f17 v_header_container_title_text setting-title-left'>
        <FaCaretDown /> Call Fields
      </div>
      {/* <div className='section-page-data settings-page-data'>
        {FORM_LAYOUT?.CALL[0]?.sections.map((section, i) => (
          <div key={i} className='flex-wrap-settings'>
            {section?.fields.map((field, f) => (
              <Card
                data={{
                  title: <></>,
                  content: (
                    <FieldContent
                      key={f}
                      field={field}
                      meta={META_DATA_CRM_VARIABLES}
                    />
                  ),
                  className: 'zcrmCard  mr-0_5 p-1 wrap-options',
                }}
              />
            ))}
          </div>
        ))}
      </div> */}
      <Wrapper>
        <table className='bom-table'>
          <tr className='thead-bom sticker-th'>
            <td>Field Label</td>

            <td>API Name</td>
            <td>Data Type</td>
            <td>Mandatory</td>
          </tr>
          {FORM_LAYOUT?.CALL[0]?.sections.map((section, i) => (
            <>
              {section?.fields.map((field, f) => (
                <tr className='item-bom' role='button'>
                  <td>{field?.field_label}</td>
                  <td>{field?.api_name}</td>
                  <td>{field?.data_type}</td>
                  <td>{field?.required ? 'Yes' : ' No'}</td>
                </tr>
              ))}
            </>
          ))}
        </table>
      </Wrapper>
    </div>
  );
};

export default CallFormSettings;
