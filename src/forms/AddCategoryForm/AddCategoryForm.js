import { Button, Col, Row, Upload } from 'antd';
import { Field, Form } from 'formik';
import React, { useState } from 'react';
import {
  AntInput,
  AntTextArea,
} from '../../components/CreateAntFields/CreateAntFields';
import { ImageCropper } from '../../components/ImageCropper';
// import PropTypes from 'prop-types';
import '../index.scss';
import {
  beforeUpload,
  getBase64,
  uploadImage,
  dataURLtoFile,
} from '../../utils/helper';
import { LoadingOutlined } from '@ant-design/icons';
import { PanoramaImage } from '../../assets/svgs';
import { ColorPicker } from '../../components/ColorPicker';

const AddCategoryForm = (props) => {
  const {
    values,
    setFieldValue,
    errors,
    touched,
    isSubmitting,
    submitBtnLabel,
  } = props;
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(values.colorCode);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);
  // const handleUpload = (file) => {
  //   return new Promise(async (resolve, reject) => {
  //     setLoading(true);
  //     const fileName = file.name;
  //     let files = [fileName];
  //     let formData = new FormData();
  //     formData.append('file', file);
  //     let response = await uploadImage(formData);
  //     if (response?.status === 201)
  //       getBase64(file, (imageUrl) => {
  //         setFieldValue('image', response?.data?.url);
  //       });

  //     setLoading(false);
  //   });
  // };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);

      return;
    }
    //  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl) => {
      setFieldValue('image', imageUrl);

      setLoading(false);
    });
    //}
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
    if (field !== 'colorCode') {
      return errors[field] && touched[field] && errors[field];
    } else {
      return errors[field] && touched[field] && errors[field]?.hex;
    }
  };

  return (
    <Form>
      <div className="add-form">
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
              setBtnLoad(true);
              setFieldValue('image', url);
              setIsPreviewMode(true);
              let formData = new FormData();
              let file = await dataURLtoFile(url, `image_${Math.random()}.png`);
              formData.append('file', file);
              let response = await uploadImage(formData);
              if (response?.status === 201)
                setFieldValue('image', response?.data?.url);
              setLoading(false);
              setBtnLoad(false);
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
            {/* {values.image ? (
            <img
              src={values.image}
              alt="avatar"
              // style={{width: '100%'}}
            />
          ) : ( */}
            {uploadButton}
            {/* )}     */}
          </Upload>
        )}
        {hasError('image') && (
          <div className="ant-form-item-explain ant-form-item-explain-error mt-5">
            {hasError('image')}
          </div>
        )}
        <Row>
          <Col span={9}>
            <p className="mb-10 mt-24 field-label">Color Code</p>
            <ColorPicker
              colorCode={values.colorCode}
              onChangeColor={(value) => setFieldValue('colorCode', value)}
            />
            <div className="ant-form-item-explain ant-form-item-explain-error mt-5">
              {hasError('colorCode')}
            </div>
          </Col>
        </Row>
        <p className="mb-10 mt-24 field-label">Category Name</p>
        <Field
          value={values.categoryName}
          name="categoryName"
          type="text"
          suffix={<div>{50 - (values.categoryName?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter name'}
          maxLength={50}
          // label="City Name *"
        />
        <p className="mb-10 mt-24 field-label">Short Description (optional)</p>
        <Field
          value={values.shortDescription}
          name="shortDescription"
          type="text"
          component={AntTextArea}
          maxLength={500}
          showCount={{
            formatter: ({ maxLength, count }) => {
              return `${maxLength - count} letters`;
            },
          }}
          placeholder={'Enter short summary about the category'}
        />

        <Button
          loading={isSubmitting}
          className="mt-40 submit-btn"
          type="primary"
          htmlType="submit"
          disabled={btnLoad}
        >
          {submitBtnLabel}
        </Button>
      </div>
    </Form>
  );
};

export default AddCategoryForm;
