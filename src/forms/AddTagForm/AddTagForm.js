import { Button, Tooltip, Upload } from 'antd';
import { Field, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  AntInput,
  AntSelect,
  AntTextArea,
} from '../../components/CreateAntFields/CreateAntFields';
// import PropTypes from 'prop-types';
import '../index.scss';
import { connect } from 'react-redux';
import * as RootActions from '../../store/root/actions';
import { bindActionCreators } from 'redux';
import { beforeUpload, copyToClipboard, dataURLtoFile, getBase64, uploadImage } from '../../utils/helper';
import { CopyOutlined, LoadingOutlined } from '@ant-design/icons';
import { ImageCropper2 } from '../../components/ImageCropper2';
import { PanoramaImage } from '../../assets/svgs';

const AddTagForm = (props) => {
  const { values, setFieldValue, isSubmitting, submitButtonLabel,errors,
    touched, } = props;




  const [ loading2, setLoading2 ] = useState(false);
  const [ isPreviewMode2, setIsPreviewMode2 ] = useState(false);
  const handleChange2 = (info) => {
    if (info.file.status === 'uploading') {
      setLoading2(true);
      return;
    }
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl) => {
      setFieldValue('image', imageUrl);
      setLoading2(false);
    });
  };

  const uploadButton = (
    <div>
      { loading2 ? (
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
            (Please note: 1st image is set as cover picture)
          </p>
        </div>
      )}
    </div>
  );

  const hasError = (field) => {
    return errors[ field ] && touched[ field ] && errors[ field ];
  };

  return (
    <Form>
      <div className="add-form">

       

      <p className="mb-10 mt-24 field-label"> Image</p>
          {values?.image ? (
            <ImageCropper2
              onCancel={() => {
                setFieldValue('image', '');
                setIsPreviewMode2(false);
              }}
              isPreviewMode2={isPreviewMode2}
              setLoading2={(state) => setLoading2(state)}
              onSave={async (url) => {
                setFieldValue('image', url);
                setIsPreviewMode2(true);
                let formData = new FormData();
                let file2 = await dataURLtoFile(url, `image_${Math.random()}.png`);
                formData.append('file', file2);
                let response = await uploadImage(formData);
                if (response?.status === 201)
                  setFieldValue('image', response?.data?.url);
                setLoading2(false);
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
              onChange={handleChange2}
            >
              {uploadButton}
            </Upload>
          )}
          {hasError('image') && (
            <div className="ant-form-item-explain ant-form-item-explain-error">
              {hasError('image')}
            </div>
          )}
        <p className="mb-10  mt-24 field-label">Tag Name</p>
        <Field
          value={values.name}
          name="name"
          type="text"
          suffix={<div>{30 - (values.tagName?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter tag name'}
          maxLength={30}
          // label="City Name *"
        />
       
        <p className="mb-10 mt-24 field-label">Short Description (Optional)</p>
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
          placeholder={'Enter short summary about the tag'}
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
  );
};

// const mapStateToProps = ({ categories }) => ({ categories: categories?.list });
// const mapDispatchToProps = (dispatch) => ({
//   fetchDataForInnerTabs: bindActionCreators(
//     RootActions.fetchDataForInnerTabs,
//     dispatch
//   ),
// });
// export default connect(mapStateToProps, mapDispatchToProps)(AddTagForm);
export default AddTagForm;

