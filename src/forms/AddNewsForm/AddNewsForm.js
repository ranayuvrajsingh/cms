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
import { PanoramaImage } from '../../assets/svgs';
import { AddNewTag } from './components/AddNewTag';
import { ImageCropper } from '../../components/ImageCropper';
// import PropTypes from 'prop-types';
import '../index.scss';
import { bindActionCreators } from 'redux';
import * as RootActions from '../../store/root/actions';
import { connect } from 'react-redux';
import { TABS } from '../../views/Cities/utils';
import {
  beforeUpload,
  dataURLtoFile,
  getBase64,
  getReadingTime,
  uploadImage,
} from '../../utils/helper';
import { Tags } from '../../components/Tags';
import { COMPONENTS } from '../../constants/dummyData';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import throttle from 'lodash/throttle';

const AddNewsForm = ({
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
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const throttledOnGetReadingTime = useRef(
    throttle((rawContent) => {
      let timeToRead = getReadingTime(rawContent);
      setFieldValue('timeToRead', timeToRead);
    }, 1000)
  );

  useEffect(() => {
    props.fetchFromReduxOrNetwork(TABS.CITIES, 'limit=500');
    props.fetchFromReduxOrNetwork('categories');
    props.fetchFromReduxOrNetwork('tags');
  }, []);

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

  const handleAddNewTag = (tagName) => {
    let payload = {
      name: tagName,
      category: values?.category,
      shortDescription: '',
    };
    props
      .createData('tags', payload)
      .then((res) => {})
      .catch((e) => {});
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
            onSave={async (url) => {
              setFieldValue('image', url);
              setIsPreviewMode(true);
              let formData = new FormData();
              let file = dataURLtoFile(url, `image_${Math.random()}.png`);
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
        <div className="ant-form-item-explain ant-form-item-explain-error">
          {hasError('image')}
        </div>
        <p className="mb-10 field-label">Title</p>
        <FastField
          value={values.title}
          name="title"
          type="text"
          suffix={<div>{50 - (values.title?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter content title'}
          maxLength={50}
          // label="City Name *"
        />
        <p className="mb-10 mt-24 field-label">Short Summary</p>
        <FastField
          value={values.summary}
          name="summary"
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
        <p className="mb-10 mt-24 field-label">Web URL (Optional)</p>
        <FastField
          value={values.webUrl}
          name="webUrl"
          type="text"
          component={AntInput}
          placeholder={'Enter web url'}
        />
        <p className="mb-10 mt-24 field-label">Content Category</p>
        <FastField
          value={values.category}
          name="category"
          optionValueKey="id"
          optionNameKey="name"
          mode="single"
          showRadioButton={true}
          component={AntSelect}
          selectOptions={props.categories}
          placeholder={'Select content category'}
          shouldUpdate={(nextProps, props) => true}
        />

        <p className="mb-10 mt-24 field-label">Content Category Tags</p>
        <FastField
          disabled={!values.category}
          value={values.categoryTags}
          name="categoryTags"
          optionValueKey="id"
          optionNameKey="name"
          filterOption={false}
          showSearch={false}
          component={AntSelect}
          mode={'multiple'}
          shouldUpdate={(nextProps, props) => true}
          selectOptions={props.tags}
          showArrow={true}
          placeholder={'Select content category tags'}
          dropdownRender={(originalNode) => [
            originalNode,
            <AddNewTag onAdd={handleAddNewTag} />,
          ]}
          tagRender={() =>
            values.categoryTags?.length > 0 && (
              <div>{`${values.categoryTags?.length} ${
                values.categoryTags?.length === 1 ? 'Tag' : 'Tags'
              } Selected`}</div>
            )
          }
        />
        <p className="mb-10 mt-24 field-label">Component</p>
        <FastField
          value={values.component}
          name="component"
          component={AntSelect}
          mode={'single'}
          optionValueKey="name"
          optionNameKey="name"
          showRadioButton={true}
          selectOptions={COMPONENTS}
          placeholder={'Select Component'}
          // label="City Name *"
        />

        <p className="mb-10 mt-24 field-label">City</p>
        <FastField
          value={values.city}
          name="city"
          component={AntSelect}
          mode={'single'}
          optionValueKey="id"
          optionNameKey="name"
          shouldUpdate={(nextProps, props) => true}
          selectOptions={props.cities}
          placeholder={'Select City'}
          // label="City Name *"
        />
        <p className="mb-10 mt-24 field-label">Trending</p>
        <ToggleCell
          status={values.isTrending}
          onToggle={(isActive) => setFieldValue('isTrending', isActive)}
        />
        <Col span={11}>
          <p className="mb-10 mt-24 field-label">Time to read</p>
          <FastField
            value={values.timeToRead}
            name="timeToRead"
            min={1}
            disabled={true}
            component={AntNumberInput}
            placeholder={''}
            // label="City Name *"
          />
        </Col>
        <p className="mb-10 mt-24 field-label">Detailed article</p>
        <FastField
          value={values.articleDetails}
          name="articleDetails"
          type="editor"
          onChangeEditor={(htmlValue, rawContent) => {
            throttledOnGetReadingTime.current(rawContent);
            setFieldValue('articleDetails', htmlValue);
          }}
          component={RTEditor}
          placeholder={'Enter short summary about the content'}
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
  categories: categories?.list,
  tags: tags?.list,
  cities: cities?.list,
});
const mapDispatchToProps = (dispatch) => ({
  fetchFromReduxOrNetwork: bindActionCreators(
    RootActions.fetchFromReduxOrNetwork,
    dispatch
  ),
  createData: bindActionCreators(RootActions.createData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewsForm);
