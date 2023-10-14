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


const AddWeathersForm = ({
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
    cities: {
      list: [],
      page: 1,
    },
         
  });
  const throttledOnGetReadingTime = useRef(
    throttle((rawContent) => {
      let timeToRead = getReadingTime(rawContent);
      setFieldValue('timeToRead', timeToRead);
    }, 1000)
  );

  useEffect(() => {
    props.fetchFromReduxOrNetwork(TABS.CITIES, `page=1&limit=10`);

  }, []);

  useEffect(() => {
    let tempData = cloneDeep(dataList);
    generateOptions(
      tempData,
      props.cities,
      values?.extraOptions?.cities,
      'cities',
      props.isEditing
    );


    setDataList(tempData);
  }, [props.cities]);

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
        props
          .fetchDataForInnerTabs(dataKey, `page=${page}&limit=10`, false, false)
          .then((res) => {
            let tempData = { ...dataList };
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
        {/* {JSON.stringify(values)} */}
       
    
        <p className="mb-10 mt-24 field-label">Description</p>
        <FastField
          value={values.description}
          name="description"
          type="text"
          component={AntTextArea}
          maxLength={500}
          showCount={{
            formatter: ({ maxLength, count }) => {
              return `${maxLength - count} letters`;
            },
          }}
          placeholder={'Enter short description about the content'}
        />
    
    

     


<p className="mb-10 mt-24 field-label">City</p>
        <FastField
          value={values.city}
          name="city"
          allowClear
          clearIcon={<CloseIcon width={18} height={18} color={'#C9C4C4FF'} />}
          component={AntSelect}
          RenderWithFilter={true}
          disableOptionsOn={props.isEditing}
          mode={'single'}
          optionValueKey="id"
          optionNameKey="name"
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'cities')}>
              {menu}
              {loadingMore && (
                <p className="mb-2 mt-2 field-label align-center">Loading...</p>
              )}
            </div>
          )}
          
          shouldUpdate={(nextProps, props) => true}
          selectOptions={dataList.cities?.list}
          placeholder={'Select City'}
          // label="City Name *"
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
                           cities,
                          
                         }) => ({
 
  cities,
  
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

export default connect(mapStateToProps, mapDispatchToProps)(AddWeathersForm);
