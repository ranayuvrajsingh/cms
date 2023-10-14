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
import { AddNewTag } from './components/AddNewTag';
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
  // beforeUpload1,
  // getbase
} from '../../utils/helper';
import { Tags } from '../../components/Tags';
import { COMPONENTS } from '../../constants/dummyData';
import throttle from 'lodash/throttle';
import cloneDeep from 'lodash/cloneDeep';

import uniqBy from 'lodash/uniqBy';
import './index.scss';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import { set } from 'lodash';


const AddArticlesForm = ({
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
  const [urll, setUrll] = useState('');
  const [dataList, setDataList] = useState({
    cities: {
      list: [],
      page: 1,
    },
    tags: {},
    categories: {},
    authors: {},
    admins:{},
    channels:{},
  });
  const throttledOnGetReadingTime = useRef(
    throttle((rawContent) => {
      let timeToRead = getReadingTime(rawContent);
      setFieldValue('timeToRead', timeToRead);
    }, 1000)
  );

  useEffect(() => {
    props.fetchFromReduxOrNetwork(TABS.CITIES, `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('categories', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('tags', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('admins', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('channels', `page=1&limit=10`);

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
    generateOptions(
      tempData,
      props.categories,
      values?.extraOptions?.categories,
      'categories',
      props.isEditing
    );
    generateOptions(
      tempData,
      props.tags,
      values?.extraOptions?.tags,
      'tags',
      props.isEditing
    );
    generateOptions(
      tempData,
      props.admins,
      values?.extraOptions?.admins,
      'admins',
      props.isEditing
    );
    generateOptions(
      tempData,
      props.channels,
      values?.extraOptions?.channels,
      'channels',
      props.isEditing
    );

    setDataList(tempData);
  }, [props.cities, props.categories, props.tags, props.admins, props.channels]);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl) => {
      setFieldValue('coverImage', imageUrl);
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


  // const uploadButton2 = (
  //   <div>
  //     {loading ? (
  //       <LoadingOutlined />
  //     ) : (
  //       <div className="flex flex-col justify-center items-center">
  //         <PanoramaImage />
  //         <p className="mt-5 weight-700 size-14">
  //           Drag your image here, or{' '}
  //           <span className="color-primary mt-5 weight-700 size-14">
  //             browse
  //           </span>
  //         </p>
  //         <p className="mt-10 color-black weight-500 size-11 upload-instructions">
  //           Supports: MP4
  //           <br />
  //           Ratio: 16:9
  //           <br />
  //           Minimum pixels: 800:1200
  //           <br />
  //         </p>
  //       </div>
  //     )}
  //   </div>
  // );

  // const handleChange1 = (info) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   // Get this url from response in real world.
  //   getbase(info.file.originFileObj, (imageUrl) => {
  //     setFieldValue('image', imageUrl);
  //     setUrll(imageUrl);
  //     setLoading(false);
  //   });
  // };
  const hasError = (field) => {
    return errors[field] && touched[field] && errors[field];
  };

  // const handleAddNewTag = (tagName) => {
  //   let payload = {
  //     name: tagName,
  //     category: values?.category,
  //     shortDescription: '',
  //   };
  //   props
  //     .createData('tags', payload)
  //     .then((res) => {
  //     })
  //     .catch((e) => {
  //     });
  // };
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
        {values?.coverImage ? (
          <ImageCropper
            onCancel={() => {
              setFieldValue('coverImage', '');
              setIsPreviewMode(false);
            }}
            isPreviewMode={isPreviewMode}
            setLoading={(state) => setLoading(state)}
            onSave={async (url) => {
              setFieldValue('coverImage', url);
              setIsPreviewMode(true);
              let formData = new FormData();
              let file = await dataURLtoFile(url, `image_${Math.random()}.png`);
              formData.append('file', file);
              let response = await uploadImage(formData);
              if (response?.status === 201)
                setFieldValue('coverImage', response?.data?.url);
              setLoading(false);
            }}
            src={values?.coverImage}
          />
        ) : (
          <Upload
            // name="media.url"
            listType={`picture-card ${hasError('coverImage') ? 'error' : ''}`}
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


                  {/* <Upload
showUploadList={true}
beforeUpload={beforeUpload1}
onChange={handleChange1}
>
{uploadButton2}
</Upload>
            <button onClick={async(urll) => {
               let formData = new FormData();
               let file = await dataURLtoFile(urll, `image_${Math.random()}.mp4`);
               formData.append('file',file);
               let response = await uploadImage(formData);
               if (response?.status === 201)
                 setFieldValue('image', response?.data?.url);
               setLoading(false);
            }}>save ittt hereee</button> */}

       
        {/* {values?.id && (
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
        )} */}

        <p className="mb-10 mt-24 field-label">Title</p>
        <FastField
          value={values.title}
          name="title"
          type="text"
          suffix={<div>{70 - (values.title?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter content title'}
          maxLength={70}
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
        
        {/* <p className="mb-10 mt-24 field-label">Web URL (Optional)</p>
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
          RenderWithFilter={true}
          disableOptionsOn={props.isEditing}
          mode="single"
          showRadioButton={true}
          component={AntSelect}
          selectOptions={dataList.categories?.list}
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'categories')}>
              {menu}
              {loadingMore && (
                <p className="mb-2 mt-2 field-label align-center">Loading...</p>
              )}
            </div>
          )}
          placeholder={'Select content category'}
          shouldUpdate={(nextProps, props) => true}
        />

        
        <p className="mb-10 mt-24 field-label">Component</p>
        <FastField
          value={values.component}
          name="component"
          filterOption={false}
          showSearch={false}
          component={AntSelect}
          mode={'multiple'}
          optionValueKey="name"
          optionNameKey="name"
          selectOptions={COMPONENTS}
          shouldUpdate={(nextProps, props) => true}
          placeholder={'Select Component'}
          showArrow={true}
          tagRender={() =>
            values.component?.length > 0 && (
              <div>{`${values.component?.length} ${
                values.component?.length === 1 ? 'Component' : 'Components'
              } Selected`}</div>
            )
          }
          // label="City Name *"
        />

        */}

       

        
        
        
      </div>
     

   
    <div className='another'>
     
      {/* <p className="mb-10 mt-24 field-label">Channel</p>
        <FastField
          value={values.channels}
          name="channels"
          optionValueKey="id"
          optionNameKey="name"
          RenderWithFilter={true}
          disableOptionsOn={props.isEditing}
          mode={'multiple'}
          showRadioButton={true}
          component={AntSelect}
          selectOptions={dataList.channels?.list}
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'channels')}>
              {menu}
              {loadingMore && (
                <p className="mb-2 mt-2 field-label align-center">Loading...</p>
              )}
            </div>
          )}
          placeholder={'Select channles'}
          shouldUpdate={(nextProps, props) => true}
          channlesRender={() =>
            values.channels?.length > 0 && (
              <div>{`${values?.channels?.length} ${
                values.channels?.length === 1 ? 'Tag' : 'Tags'
              } Selected`}</div>
            )
          }

        /> */}

<p className="mb-10 mt-24 field-label">Auhtor</p>
        <FastField
          value={values.admin}
          name="admin"
          allowClear
          clearIcon={<CloseIcon width={18} height={18} color={'#C9C4C4FF'} />}
          component={AntSelect}
          RenderWithFilter={true}
          disableOptionsOn={props.isEditing}
          mode={'single'}
          optionValueKey="id"
          optionNameKey="email"
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'admins')}>
              {menu}
              {loadingMore && (
                <p className="mb-2 mt-2 field-label align-center">Loading...</p>
              )}
            </div>
          )}
          
          shouldUpdate={(nextProps, props) => true}
          selectOptions={dataList.admins?.list}
          placeholder={'Select Author'}
          // label="City Name *"
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
         <p className="mb-10 mt-24 field-label">Content Keywords</p>
        <FastField
          // disabled={!values.category}
          value={values.categoryTags}
          name="categoryTags"
          optionValueKey="id"
          optionNameKey="name"
          filterOption={false}
          showSearch={false}
          component={AntSelect}
          mode={'multiple'}
          
          shouldUpdate={(nextProps, props) => true}
          selectOptions={dataList.tags?.list}
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'tags')}>
              {menu}
              {loadingMore && (
                <p className="mb-5 mt-2 field-label align-center">Loading...</p>
              )}
              {/* <AddNewTag onAdd={handleAddNewTag} /> */}
            </div>
          )}
          showArrow={true}
          placeholder={'Select content Keywords'}
          tagRender={() =>
            values.categoryTags?.length > 0 && (
              <div>{`${values?.categoryTags?.length} ${
                values.categoryTags?.length === 1 ? 'Tag' : 'Tags'
              } Selected`}</div>
            )
          }
        />
        </Col>

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

<p className="mb-10 mt-24 field-label">Web URL (Optional)</p>
        <FastField
          value={values.webUrl}
          name="webUrl"
          type="text"
          component={AntInput}
          placeholder={'Enter web url'}
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

<button
          loading={isSubmitting}
          className="mt-40 submit-btn-1"
          type="primary"
          htmlType="submit"

        >
          {submitButtonLabel}
        </button>
      {/* <p className="mb-10 mt-24 field-label">In App</p>
                  <ToggleCell 
                  status={values.inApp}
                  onToggle={(status) => values.inApp == 
                    !status}
              />
      <p className="mb-10 mt-24 field-label">In Web</p>
        <ToggleCell />  */}

       
        </div>
       
      </Form>
          
          
          
    </div>
  );
};

const mapStateToProps = ({
                           cities,
                           categories,
                           tags,
                           authors,
                           admins,
                           channels
                         }) => ({
  categories,
  tags: tags,
  cities,
  authors,
  admins,
  channels
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

export default connect(mapStateToProps, mapDispatchToProps)(AddArticlesForm);
