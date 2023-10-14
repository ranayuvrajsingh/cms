import { LoadingOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { Field, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  AntInput,
  AntSelect,
  AntTextArea,
} from '../../components/CreateAntFields/CreateAntFields';
import { PanoramaImage } from '../../assets/svgs';
// import PropTypes from 'prop-types';

import '../index.scss';
import { TABS } from '../../views/Cities/utils';
import * as RootActions from '../../store/root/actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  beforeUpload,
  getBase64,
  uploadImage,
  generateOptions,
  dataURLtoFile,
} from '../../utils/helper';
import cloneDeep from 'lodash/cloneDeep';

import uniqBy from 'lodash/uniqBy';
import { ImageCropper2 } from '../../components/ImageCropper2';
const AddNewCityForm = (props) => {
  const { values, setFieldValue, errors, isEditing, touched, isSubmitting } =
    props;
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  // const [isPreviewMode2, setIsPreviewMode2] = useState(false);
  // const [loading2, setLoading2] = useState(false);
  const [dataList, setDataList] = useState({
    states: {},
  });
  useEffect(() => {
    props.fetchFromReduxOrNetwork(TABS.STATES, `page=1&limit=10`);
  }, []);

  useEffect(() => {
    let tempData = cloneDeep(dataList);
    generateOptions(
      tempData,
      props.state,
      values?.extractOptions?.state,
      'states',
      isEditing
    );

    setDataList(tempData);
  }, [props.state]);

  const handleUpload = (file) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      const fileName = file.name;
      let files = [fileName];
      let formData = new FormData();
      formData.append('file', file);
      let response = await uploadImage(formData);

      if (response?.status === 201)
        getBase64(file, (imageUrl) => {
          setFieldValue('image', response?.data?.url);
        });

      setLoading(false);
    });
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setFieldValue('image', imageUrl);
        setLoading(false);
      });
    }
  };

  // const handleChange2 = (info) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading2(true);
  //     return;
  //   }
  //   // Get this url from response in real world.
  //   getBase64(info.file.originFileObj, (imageUrl) => {
  //     setFieldValue('illustration', imageUrl);
  //     setLoading2(false);
  //   });
  // };

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
            tempData[dataKey].list=uniqBy(tempData[dataKey].list,'id')
            setDataList(tempData);
            setLoadingMore(false);
          });
      }
    }
  };
  return (
    <Form>
      <div className="add-form">
        {/* {JSON.stringify(values)} */}
        <p className="mb-10 mt-24 field-label">Image</p>
        <Upload
          // name="media.url"
          listType={`picture-card ${hasError('image') ? 'error' : ''}`}
          className={'picture-uploader'}
          showUploadList={false}
          action={handleUpload}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {values.image ? (
            <img
              src={values.image}
              alt="avatar"
              // style={{width: '100%'}}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <div className="ant-form-item-explain ant-form-item-explain-error">
          {hasError('image')}
        </div>
        <p className="mb-10 mt-24 field-label">State</p>
        <div>
          <Field
            name="state"
            component={AntSelect}
            optionValueKey="id"
            optionNameKey="name"
            mode="single"
            RenderWithFilter={true}
            disableOptionsOn={ props.isEditing}
            value={values.state}
            selectOptions={dataList?.states?.list}
            placeholder={'Select state'}
            dropdownRender={(menu) => (
              <div onWheel={(e) => handleScroll(e, 'states')}>
                {menu}
                {loadingMore && (
                  <p className="mb-2 mt-2 field-label align-center">
                    Loading...
                  </p>
                )}
              </div>
            )}
            shouldUpdate={(nextProps, props) => true}
            // label="Select state"
          />
        </div>
        <p className="mb-10 mt-24 field-label">City Name</p>
        <Field
          value={values.city}
          name="city"
          type="text"
          suffix={<div>{50 - (values.city?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter name'}
          maxLength={50}
          // label="City Name *"
        />
        <p className="mb-10 mt-24 field-label">Fact</p>
        <Field
          value={values.description}
          name="description"
          type="text"
          validate={(value) => {
            if (!value) {
              return 'Fact can not be empty';
            }
          }}
          component={AntTextArea}
          maxLength={500}
          showCount={{
            formatter: ({ maxLength, count }) => {
              return `${maxLength - count} letters`;
            },
          }}
          placeholder={'Enter a short description here'}
        />

<p className="mb-10 mt-24 field-label">Illustration Image</p>
      <Field
          value={values.illustration}
          name="illustration"
          type="text"
          validate={(value) => {
            if (!value) {
              return 'illustration can not be empty';
            }
          }}
          component={AntTextArea}
          maxLength={500}
          showCount={{
            formatter: ({ maxLength, count }) => {
              return `${maxLength - count} letters`;
            },
          }}
          placeholder={'Enter a illustration link here'}
        />

        {/* <FieldArray
          name="emailDomains"
          render={(arrayHelpers) => (
            <div>
              {values.emailDomains.map((friend, index) => (
                <div className="" key={index}>
                  <div className="">
                    <Field
                      name={`emailDomains.${index}`}
                      value={values.emailDomains[index]}
                      component={AntInput}
                      type="text"
                      hasFeedback
                      // className="flex-1"
                      label="City Email Domain *"
                    />
                  </div>
                  <div>
                    {index > 0 && (
                      <Button
                        type="link"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        /> */}

        {/* <div
        onClick={() =>
          setFieldValue('email_domains', [...values.email_domains, ''])
        }
        className="color-primary ml-0 size-14 weight-600 cursor-pointer"
      >
        + Add Another Domain
      </div> */}

        <Button
          loading={isSubmitting}
          className="mt-40 submit-btn"
          type="primary"
          htmlType="submit"
        >
          {isEditing ? 'Update' : 'Add'} City
        </Button>
      </div>
    </Form>
  );
};

const mapStateToProps = ({ states }) => ({ state: states });
const mapDispatchToProps = (dispatch) => ({
  fetchFromReduxOrNetwork: bindActionCreators(
    RootActions.fetchFromReduxOrNetwork,
    dispatch
  ),
  fetchDataForInnerTabs: bindActionCreators(
    RootActions.fetchDataForInnerTabs,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCityForm);
// export default Cities;
