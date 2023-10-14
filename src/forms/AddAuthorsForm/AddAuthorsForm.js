import { LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Upload } from 'antd';
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
  dataURLtoFile,
  generateOptions,
  getBase64,
  getReadingTime,
  uploadImage,
} from '../../utils/helper';
import { Tags } from '../../components/Tags';
import { COMPONENTS } from '../../constants/dummyData';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import throttle from 'lodash/throttle';
import cloneDeep from 'lodash/cloneDeep';

const AddAuthorsForm = ({
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
  const [dataList, setDataList] = useState({
    cities: {
      list: [],
      page: 1,
    },
    tags: {},
    categories: {},
  });
 

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

  

  return (
    <Form>
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
        <p className="mb-10 mt-24 field-label">Name</p>
        <FastField
          value={values.name}
          name="name"
          type="text"
         // suffix={<div>{50 - (values.title?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter Authors Name'}
          maxLength={50}
          // label="City Name *"
        />
         <p className="mb-10 mt-24 field-label">Email</p>
        <FastField
          value={values.email}
          name="email"
          type="text"
         // suffix={<div>{50 - (values.title?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter Authors Email'}
          maxLength={50}
          // label="City Name *"
        />
        
        
        <Button
          loading={isSubmitting}
          className="mt-40 submit-btn"
          type="primary"
          htmlType="submit"
        >
          {submitButtonLabel}
        </Button>
      </div>
    </Form>
  );
};

const mapStateToProps = ({ cities, components, categories, tags }) => ({
  categories,
  tags: tags,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAuthorsForm);
