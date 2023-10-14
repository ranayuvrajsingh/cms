import { CopyOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Tooltip, Upload } from 'antd';
import { FastField, Form } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  AntInput,
  AntSelect,
  AntTextArea,
} from '../../components/CreateAntFields/CreateAntFields';
import { PanoramaImage } from '../../assets/svgs';
// import PropTypes from 'prop-types';
import '../index.scss';
import { bindActionCreators } from 'redux';
import * as RootActions from '../../store/root/actions';
import * as RootActionCreators from '../../store/root/actions';
import { connect } from 'react-redux';
import {
  beforeUpload,
  copyToClipboard,
  generateFilterUrl,
  generateOptions,
  getBase64,
  uploadImage,
} from '../../utils/helper';
import cloneDeep from 'lodash/cloneDeep';
import debounce from 'lodash/debounce';

import uniqBy from 'lodash/uniqBy';

const AddCollectionForm = ({
  values,
  setFieldValue,
  isSubmitting,
  handleSubmit,
  states,
  errors,
  touched,
  submitButtonLabel,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState({
    articles: {},
    categories: {},
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const debouncedSearch = useRef();
  debouncedSearch.current = debounce(
    (dataKey, searchQuery) =>
      fetchData(dataKey, { filters: { search: searchQuery } }, false),
    200
  );
  useEffect(() => {
    props.fetchFromReduxOrNetwork('categories', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('articles', `page=1&limit=10`);
  }, []);

  useEffect(() => {
    let tempData = cloneDeep(dataList);
    generateOptions(
      tempData,
      props.articles,
      values?.extraOptions?.articles,
      'articles',
      props.isEditing,
      true
    );
    generateOptions(
      tempData,
      props.categories,
      values?.extraOptions?.categories,
      'categories',
      props.isEditing
    );

    setDataList(tempData);
  }, [props.articles, props.categories]);

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
        fetchData(dataKey, { filters: { page } });
      }
    }
  };

  const fetchData = (dataKey, payload, appendData = true) => {
    let filters,
      tempData = { ...dataList };
    if (payload && payload.filters)
      filters = { search: tempData[dataKey].search, ...payload.filters };
    let urlParams = generateFilterUrl(filters);
    props
      .fetchDataForInnerTabs(dataKey, `${urlParams}&limit=10`, false, false)
      .then((res) => {
        if (filters?.page) tempData[dataKey].page = filters?.page;
        tempData[dataKey].list = appendData
          ? [...tempData[dataKey].list, ...(res?.data || [])]
          : res?.data;
        tempData[dataKey].metadata = res?.metadata || {};
        // tempData=uniqBy(tempData,'id')
        tempData[dataKey].list = uniqBy(tempData[dataKey].list, 'id');

        setDataList(tempData);
        setLoadingMore(false);
      });
  };
  return (
    <Form>
      <div className="add-form">
        {/* {JSON.stringify(values)} */}
        <p className="mb-10 mt-10 field-label">Cover Image</p>

        <Upload
          name="image"
          listType={`picture-card ${hasError('image') ? 'error' : ''}`}
          className="picture-uploader"
          showUploadList={false}
          action={handleUpload}
          // method="put"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {values?.image ? (
            <img
              src={values?.image}
              className={'upload-image'}
              alt="avatar"
              style={{ width: '100%' }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        {hasError('image') && (
          <div className="ant-form-item-explain ant-form-item-explain-error">
            {hasError('image')}
          </div>
        )}
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

        <p className="mb-10 mt-10 field-label">Title</p>
        <FastField
          value={values.title}
          name="title"
          type="text"
          suffix={<div>{50 - (values.title?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter content title'}
          maxLength={50}
        />
        <p className="mb-10 mt-10 field-label">Content Category</p>
        <FastField
          value={values.category}
          name="category"
          optionValueKey="id"
          optionNameKey="name"
          mode="single"
          showRadioButton={true}
          disableOptionsOn={props.isEditing}
          RenderWithFilter={true}
          component={AntSelect}
          selectOptions={dataList.categories?.list}
          shouldUpdate={() => true}
          placeholder={'Select content category'}
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'categories')}>
              {menu}
              {loadingMore && (
                <p className="mb-2 mt-2 field-label align-center">Loading...</p>
              )}
            </div>
          )}
        />
        <p className="mb-10 mt-10 field-label">Content Articles</p>
        <FastField
          value={values.contentArticles}
          name="contentArticles"
          optionValueKey="id"
          optionNameKey="title"
          filterOption={false}
          showSearch={true}
          RenderWithFilter={true}
          disableOptionsOn={props.isEditing}
          onSearch={(text) => {
            let tempData = { ...dataList };
            tempData.articles.search = text;
            setDataList(tempData);
            setTimeout(() => debouncedSearch.current('articles', text), 800);
          }}
          component={AntSelect}
          mode={'multiple'}
          autoClearSearchValue={false}
          searchValue={dataList.articles?.search}
          selectOptions={dataList.articles?.list}
          showArrow={true}
          placeholder={'Select content articles'}
          tagRender={() =>
            values.contentArticles?.length > 0 && (
              <div>{`${values.contentArticles?.length} ${
                values.contentArticles?.length === 1 ? 'Article' : 'Articles'
              } Selected`}</div>
            )
          }
          shouldUpdate={(nextProps, props) => true}
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'articles')}>
              {menu}
              {loadingMore && (
                <p className="mb-2 mt-2 field-label align-center">Loading...</p>
              )}
            </div>
          )}
        />

        <p className="mb-10 mt-10 field-label">Short Summary (Optional)</p>
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
const mapStateToProps = ({ categories, articles }) => ({
  categories,
  articles,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCollectionForm);
