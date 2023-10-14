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


const AddBytesForm = ({
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

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <PanoramaImage />
          <p className="mt-5 weight-700 size-14">
            Drag your image here, or{' '}
            <span className="color-primary mt-5 weight-700 size-14">
              browse
            </span>
          </p>
          <p className="mt-10 color-black weight-500 size-11 upload-instructions">
            Supports: JPG,PNG
            <br />
            Ratio: 16:9
            <br />
            Minimum pixels: 800:1200
            <br />
          </p>
        </div>
      )}
    </div>
  );

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
        console.log('FETCHING MORE');
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
        <p className="mb-10 mt-24 field-label">Image</p>
        {values?.image ? (
          <ImageCropper
            onCancel={() => {
              setFieldValue('image', '');
              setIsPreviewMode(false);
            }}
            isPreviewMode={isPreviewMode}
            setLoading={(state) => setLoading(state)}
            onSave={async (url) => {
              setFieldValue('image', url);

              setIsPreviewMode(true);
              let formData = new FormData();
              let file = await dataURLtoFile(url, `image_${Math.random()}.png`);
              formData.append('file', file);
              let response = await uploadImage(formData);
              if (response?.status === 201)
                setFieldValue('image', response?.data?.url);
              setLoading(false);
            }}
            src={values?.image}
          />
        ) : (
          <Upload
            // name="media.url"
            listType={`picture-card ${hasError('image') ? 'error' : ''}`}
            className="picture-uploader"
            showUploadList={false}
            // action={handleUpload}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {uploadButton}
          </Upload>
        )}
        {hasError('image') && (
          <div className="ant-form-item-explain ant-form-item-explain-error">
            {hasError('image')}
          </div>
        )}


        <p className="mb-10 mt-24 field-label">Title</p>
        <FastField
          value={values.title}
          name="title"
          type="text"
          suffix={<div>{100 - (values.title?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter content title'}
          maxLength={100}
          // label="City Name *"
        />
        <p className="mb-10 mt-24 field-label">Description (Optional)</p>
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
          placeholder={'Enter short summary about the content'}
        />
        <p className="mb-10 mt-24 field-label">Color Code</p>
        <FastField
          value={values.colorCode}
          name="colorCode"
          type="text"
          suffix={<div>{50 - (values.title?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter content title'}
          maxLength={50}
          // label="City Name *"
        />


        <p className="mb-10 mt-24 field-label">Cities</p>
        <FastField
        //   disabled={true}
          value={values.categoryCity}
          name="categoryCity"
          optionValueKey="id"
          optionNameKey='name'
         
          filterOption={false}
          showSearch={false}
          component={AntSelect}
          mode={'multiple'}
          shouldUpdate={(nextProps, props) => true}
          selectOptions={dataList.cities?.list}
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'cities')}>
              {menu}
              {loadingMore && (
                <p className="mb-5 mt-2 field-label align-center">Loading...</p>
              )}
            </div>
          )}
          showArrow={true}
          placeholder={'Select Cities'}
          cityRender={() =>
            values.categoryCity?.length > 0 && (
              <div>{`${values?.categoryCity?.length} ${
                values.categoryCity?.length === 1 ? 'City' : 'Cities'
              } Selected`}</div>
            )
          }
        />

<p className="mb-10 mt-24 field-label">Content Link (Optional)</p>
        <FastField
          value={values.contentLink}
          name="contentLink"
          type="text"
          component={AntInput}
          placeholder={'Enter content link'}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBytesForm);
