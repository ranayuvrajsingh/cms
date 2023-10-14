import { CopyOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Tooltip, Upload } from 'antd';
import { FastField, Form } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  AntInput,
  AntNumberInput,
  AntSelect,
  AntTextArea,
  RTEditor,
} from '../../components/CreateAntFields/CreateAntFields';
import { CloseIcon, PanoramaImage } from '../../assets/svgs';

import { ImageCropper } from '../../components/ImageCropper';
import '../index.scss';
import { bindActionCreators } from 'redux';
import * as RootActions from '../../store/root/actions';
import * as RootActionCreators from '../../store/root/actions';
import { connect } from 'react-redux';
import { TABS } from '../../views/Cities/utils';
import {
  beforeUpload,
  copyToClipboard,
  dataURLtoFile,
  generateOptions,
  getBase64,
  getReadingTime,
  uploadImage,
} from '../../utils/helper';
import { Tags } from '../../components/Tags';
import { COMPONENTS } from '../../constants/dummyData';
import throttle from 'lodash/throttle';
import cloneDeep from 'lodash/cloneDeep';

import uniqBy from 'lodash/uniqBy';
import './index.scss';
import { ToggleCell } from '../../components/TableCells/ToggleCell';


const AddRolesForm = ({
                           values,
                           setFieldValue,
                           isSubmitting,
                           handleSubmit,
                           states,
                           submitButtonLabel,
                           touched,
                           errors,
                           ...props
                         }) => {
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dataList, setDataList] = useState({
    permission: {},
  });
  const throttledOnGetReadingTime = useRef(
    throttle((rawContent) => {
      let timeToRead = getReadingTime(rawContent);
      setFieldValue('timeToRead', timeToRead);
    }, 1000)
  );

  useEffect(() => {
props.fetchFromReduxOrNetwork('permission', `page=1&limit=10`);
  }, []);
  useEffect(() => {
    let tempData = cloneDeep(dataList);
    generateOptions(
        tempData,
        props.permission,
        values?.extraOptions?.permissions,
        'permission',
        props.isEditing
    );
    setDataList(tempData);
  }, [props.permission]);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl) => {
      setFieldValue('image', imageUrl);
      setLoading(false);
    });
  };


  const hasError = (field) => {
    return errors[field] && touched[field] && errors[field];
  };

  const handleScroll = (event, dataKey) => {
    event.stopPropagation();
    let delta;
    if (event.wheelDelta) {
      delta = event.wheelDelta;
    } else {
      delta = -1 * event.deltaY;
    }

    if (!loadingMore) {
      if (delta < 0 && dataList?.[dataKey]?.metadata?.next) {
        setLoadingMore(true);
        let page = dataList?.[dataKey]?.metadata?.next;
        console.log('scroll is here',page)
        props
          .fetchDataForInnerTabs(dataKey, `page=${page}&limit=10`, false, false)
          .then((res) => {
            let tempData = { ...dataList };
            console.log('scroll is here',res)
            tempData[dataKey].page = page;
            tempData[dataKey].list = [
              ...tempData[dataKey].list,
              ...(res?.data || []),
            ];
            tempData[dataKey].metadata = res?.metadata || {};
            tempData[dataKey].list = uniqBy(tempData[dataKey].list, 'id');
            setDataList(tempData);
            setLoadingMore(false);
          });
      }
    }
  };

  return (
    <div className='whole'>
      
    <Form className='formss'>
   
      <div className="add-form">
        

        <p className="mb-10 mt-24 field-label">Name</p>
        <FastField
          value={values.name}
          name="name"
          type="text"
          suffix={<div>{50 - (values.title?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter content title'}
          maxLength={50}
          // label="City Name *"
        />
     
        
<p className="mb-10 mt-24 field-label">Permissions</p>
        <FastField
          value={values.categoryPermissions}
          name="categoryPermissions"
          optionValueKey="id"
          optionNameKey='description'
         
          filterOption={false}
          showSearch={false}
          component={AntSelect}
          mode={'multiple'}
          shouldUpdate={(nextProps, props) => true}
          selectOptions={dataList.permission?.list}
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'permission')}>
              {menu}
              {loadingMore && (
                <p className="mb-5 mt-2 field-label align-center">Loading...</p>
              )}
              {/* <AddNewTag onAdd={handleAddNewTag} /> */}
            </div>
          )}
          showArrow={true}
          placeholder={'Select Permisions'}
          permissionRender={() =>
            values.categoryPermissions?.length > 0 && (
              <div>{`${values?.categoryPermisisons?.length} ${
                values.categoryPermissions?.length === 1 ? 'Permission' : 'Permissions'
              } Selected`}</div>
            )
          }
        />


{values?.id && (
          <>
            <p className="mb-10 mt-24 field-label">ID</p>
            <Tooltip title={'Click to copy ID'}>
              <div
                onClick={() => {
                  copyToClipboard(values?.id);
                }}
                className={'resource-id'}
              >
                <label>{values.id}</label>
                <div className={'copy'}>
                  <CopyOutlined
                    onClick={(e) => {
                      copyToClipboard(values?.id);
                      e.stopPropagation();
                    }}
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>
            </Tooltip>
          </>
        )}
         <Button
          loading={isSubmitting}
          className="mt-40 submit-btn-1"
          type="primary"
          htmlType="submit"
        >
          {submitButtonLabel}
        </Button>
        </div>
       
      </Form>
          
          
          
    </div>
  );
};

const mapStateToProps = ({
                           permission
                         }) => ({
  permission
});
const mapDispatchToProps = (dispatch) => ({
  fetchDataForInnerTabs: bindActionCreators(
    RootActionCreators.fetchDataForInnerTabs,
    dispatch
  ),
  fetchFromReduxOrNetwork: bindActionCreators(
    RootActions.fetchFromReduxOrNetwork,
    dispatch
  ),
  createData: bindActionCreators(RootActions.createData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRolesForm);
