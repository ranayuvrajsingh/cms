import { ConsoleSqlOutlined, CopyOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Space, Tooltip, Upload } from 'antd';
import { FastField, Form } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  AntInput,
  AntNumberInput,
  AntSelect,
  AntTextArea,
  RTEditor,
} from '../../components/CreateAntFields/CreateAntFields';
import { CloseIcon, FilterIcon2, PanoramaImage } from '../../assets/svgs';
import { ImageCropper } from '../../components/ImageCropper';
import '../index.scss';
import { bindActionCreators } from 'redux';
import * as RootActions from '../../store/root/actions';
import * as RootActionCreators from '../../store/root/actions';
import { connect } from 'react-redux';
import { TABS } from '../../views/Cities/utils';
import { generateFilterUrl } from '../../utils/helper';
import {
  beforeUpload,
  copyToClipboard,
  dataURLtoFile,
  generateOptions,
  getBase64,
  getReadingTime,
  uploadImage,
  uploadMedium,
} from '../../utils/helper';
import { Tags } from '../../components/Tags';
import { COMPONENTS } from '../../constants/dummyData';
import throttle from 'lodash/throttle';
import cloneDeep from 'lodash/cloneDeep';

import uniqBy from 'lodash/uniqBy';
import './index.scss';
import { ToggleCell } from '../../components/TableCells/ToggleCell';
import { useCallback } from 'react';
import { AddNewMedium } from './components/AddNewMedium';
import AddArticlesForm from '../AddArticlesForm';
import AddExperienceForm from '../AddExperienceForm/AddExperienceForm';
import ConfirmationPopup from '../../components/ConfirmationPopup';


const AddChannelsForm = ({
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
  const [mediumDiv, setMediumDiv] = useState(false)
  const [mediumList, setMediumList] = useState([])
  const [showMediums, setShowMediums] = useState(false)
  const [mediumNames, setMediumNames] = useState([])
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [dataList, setDataList] = useState({
    cities: {
      list: [],
      page: 1,
    },
    tags: {},
    medium: {},
    experiences: {},
    articles:{},
  });
  const throttledOnGetReadingTime = useRef(
    throttle((rawContent) => {
      let timeToRead = getReadingTime(rawContent);
      setFieldValue('timeToRead', timeToRead);
    }, 1000)
  );

  useEffect(() => {
    props.fetchFromReduxOrNetwork(TABS.CITIES, `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('medium', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('tags', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('articles', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('experiences', `page=1&limit=10`);

  }, []);
  console.log("categfel", values.categoryMedium, '>>>>',showConfirmationModal)
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
      props.medium,
      values?.extraOptions?.medium_type,
      'medium',
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
      props.articles,
      values?.extraOptions?.articles,
      'articles',
      props.isEditing
    );
    generateOptions(
      tempData,
      props.experiences,
      values?.extraOptions?.experiences,
      'experiences',
      props.isEditing
    );

    setDataList(tempData);
  }, [props.city, props.categories, props.tags, props.admins, props.medium]);

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

  // useEffect(() => {
  //   setFieldValue('categoryMedium', mediumList)
  // }, [mediumList.length])

  // const handleSaveMedium = async(values) => {
  //   let payload = values.categoryMediumtemp;
  //   let response = await uploadMedium(payload); 
  //   let mediums = values.categoryMedium;
  //   if (response?.status === 201)
  //    setMediumList([...mediumList, response?.data?.id])    
  //    setMediumDiv(false);
  //   //  setFieldValue('categoryMedium',mediumList);
  // };

  const handleNewMedium = (payload1) => {
    let payload = {
      name: payload1.name,
      contentUrl: payload1.contentUrl,
      thumbnail: payload1.thumbnail,
      type:payload1.type,
    };
    props.createData('medium', payload)
    .then((res) => {
      console.log('this is res', res);
      setMediumDiv(false);
    })
    .catch((e) => {
      console.log(e);
    })
  }

  // useEffect(() => {
  //   if (values?.categoryMedium) {
  //     setMediumList([values?.categoryMedium]);
  //   }
  //   if(mediumList.lenght >0){
  //     setShowMediums(true);
  //   }
  // },[])

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
            console.log(res)
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

  const handleDeleteMedium = (categoryMedium) => {
   
      // let payload = {
      //   name: name,
      // };
       setShowConfirmationModal(false);
      console.log(categoryMedium)
      let filters = {};
      filters.delete__in = [categoryMedium];
      let urlParams = generateFilterUrl(filters);
      props.deleteMany('medium', urlParams).then((res) => {
        console.log('this is res', res);
        

      }).catch((e) => {
        console.log(e);
      });


    
  };

  // const formsmenu = (
  //   <Menu onClick={({key}) => {  }}>
    
  //     <Menu.Item key="1" onClick={() => {
  //       console.log('props, Articles', props);
  //       <AddArticlesForm
  //       submitButtonLabel={`Add Article`}
  //       {...props}
        
  //     />

  //     }}>
  //       <span>Articles</span>
  //     </Menu.Item>

  //     <Menu.Item key="2" onClick={() => {
  //       console.log('props, Experiences', props);
  //       <AddExperienceForm
  //       submitButtonLabel={`Add Exeprience`}
  //       {...props}
  //     />

  //     }}>
  //       <span>Experiences</span>
  //     </Menu.Item>
          
  //   </Menu>
  // ); 

  return (

 
    <div className='whole'>
      
    
    <Form className='formss'>
    
    {/* <button>abcdefgh</button> */}
      <div className="add-form">
        {/* {JSON.stringify(values)} */}

        

        <div className="forms-dropdown" >
         
{/*         

          <p className="mb-10 mt-24 field-label">Select</p>
          <Dropdown overlay={formsmenu} trigger={["click"]}>
              <a onClick={() => {console.log(formsmenu)}} className="ant-dropdown-link">
             
               
                <FilterIcon2 className='filtericon'/>
          
        
              </a>
            </Dropdown> */}
        </div>

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
          value={values.name}
          name="name"
          type="text"
          suffix={<div>{50 - (values.title?.length || 0)} letters</div>}
          component={AntInput}
          placeholder={'Enter content title'}
          maxLength={50}
          // label="City Name *"
        />
        <p className="mb-10 mt-24 field-label">Short description</p>
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
        
    <p className="mb-10 mt-24 field-label">Content Mediums</p>
        <FastField
          // disabled={!values.category}
          value={values.categoryMedium}
          name="categoryMedium"
          optionValueKey="id"
          optionNameKey="name"
          filterOption={false}
          showSearch={false}
          component={AntSelect}
          mode={'multiple'}
          
          shouldUpdate={(nextProps, props) => true}
          selectOptions={dataList.medium?.list}
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'medium')}>
              {menu}
              {loadingMore && (
                <p className="mb-5 mt-2 field-label align-center">Loading...</p>
              )}
              {/* <AddNewTag onAdd={handleAddNewTag} /> */}
              <button className='medium-add' onClick={(e)=>{e.preventDefault();  setMediumDiv(true)}}>Add a medium content</button>
              <button className='medium-add' onClick={(e)=>{e.preventDefault();  setMediumDiv(false)}}>Cancel</button>
              <button className='medium-delete' onClick={(e)=>{e.preventDefault(); setShowConfirmationModal(true) }}>Delete selected mediums</button>
              {mediumDiv && <div className='medium'>
          <AddNewMedium onAdd = {handleNewMedium} setMediumDiv={setMediumDiv} />
        </div>
        }
        

            </div>
          )}
          showArrow={true}
          placeholder={'Select content Mediums'}
          tagRender={() =>
            values.categoryMedium?.length > 0 && (
              <div>{`${values?.categoryMedium?.length} ${
                values.categoryMedium?.length === 1 ? 'Mediums' : 'Mediums'
              } Selected`}</div>
            )
          }
        />


      {/* <button className='medium-add' onClick={()=> setMediumDiv(true)}>Add a medium content</button> */}

      {/* {showMediums && <div className='mediums'>
        <p className="mb-10 mt-24 field-label">Mediums</p>
          {mediumList?.map((medium, index) => (
            <span>{medium}</span>
          ))}
        </div>
        } */}

      
          {/* <Col span={11}> */}
         
          
         <p className="mb-10 mt-24 field-label">Articles</p>
        <FastField
        //   disabled={true}
          value={values.categoryArticles}
          name="categoryArticles"
          optionValueKey="id"
          optionNameKey='title'
         
          filterOption={false}
          showSearch={false}
          component={AntSelect}
          mode={'multiple'}
          shouldUpdate={(nextProps, props) => true}
          selectOptions={dataList.articles?.list}
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'articles')}>
              {menu}
              {loadingMore && (
                <p className="mb-5 mt-2 field-label align-center">Loading...</p>
              )}
              {/* <AddNewTag onAdd={handleAddNewTag} /> */}
            </div>
          )}
          showArrow={true}
          placeholder={'Selected Articles'}
          permissionRender={() =>
            values.categoryArticles?.length > 0 && (
              <div>{`${values?.categoryArticles?.length} ${
                values.categoryArticles?.length === 1 ? 'Article' : 'Articles'
              } Selected`}</div>
            )
          }
        />
          <p className="mb-10 mt-24 field-label">Experiences</p>
        <FastField
        //   disabled={true}
          value={values.categoryExperiences}
          name="categoryExperiences"
          optionValueKey="id"
          optionNameKey='title'
         
          filterOption={false}
          showSearch={false}
          component={AntSelect}
          mode={'multiple'}
          shouldUpdate={(nextProps, props) => true}
          selectOptions={dataList.experiences?.list}
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'experiences')}>
              {menu}
              {loadingMore && (
                <p className="mb-5 mt-2 field-label align-center">Loading...</p>
              )}
              {/* <AddNewTag onAdd={handleAddNewTag} /> */}
              {/* <input className='search' type='text' placeholder='search' onChange={(e)=>{setSearch(e.target.value)}}/> */}
            </div>
          )}
          showArrow={true}
          placeholder={'Selected Experiences'}
          permissionRender={() =>
            values.categoryExperiences?.length > 0 && (
              <div>{`${values?.categoryExperiences?.length} ${
                values.categoryExperiences?.length === 1 ? 'Experience' : 'Experiences'
              } Selected`}</div>
             
            )
          }
        />
       
      </div>
     

    
    <div className='another'>

    
      
    {/* <p className="mb-10 mt-24 field-label">Medium</p>
        <FastField
          value={values.categoryMedium}
          name="categoryMedium"
          allowClear
          clearIcon={<CloseIcon width={18} height={18} color={'#C9C4C4FF'} />}
          component={AntSelect}
          RenderWithFilter={true}
          disableOptionsOn={props.isEditing}
          mode={'single'}
          optionValueKey="id"
          optionNameKey="name"
          dropdownRender={(menu) => (
            <div onWheel={(e) => handleScroll(e, 'medium')}>
              {menu}
              {loadingMore && (
                <p className="mb-2 mt-2 field-label align-center">Loading...</p>
              )}
            </div>
          )}
          
          shouldUpdate={(nextProps, props) => true}
          selectOptions={dataList.medium?.list}
          placeholder={'Select Medium'}
        /> */}

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


        
        <p className="mb-10 mt-24 field-label">Color Code</p>
        <FastField
          value={values.colorCode}
          name="colorCode"
          type="text"
          component={AntInput}
          placeholder={'Enter content colorcode'}
          maxLength={50}
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

           
        {showConfirmationModal &&
      <div className='delete_medium_popup'>
      <span className='text'>Selected Mediums will be permanently deleted are you sure you want to delete</span>
      <button className='cancelb' onClick={(e)=> {e.preventDefault(); setShowConfirmationModal(false)}}>Cancel</button>
      <button className='delete' onClick={(e)=> {e.preventDefault(); handleDeleteMedium(values.categoryMedium)}}>Delete</button>
    </div>

      
        }
       
        </div>
       
      </Form>
          
       
          
    </div>
  );
};

const mapStateToProps = ({
                           cities,
                           medium,
                           experiences,
                           tags,
                           articles,
                         }) => ({
  tags: tags,
  cities,
  medium,
  experiences,
  articles
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
  deleteMany : bindActionCreators(RootActionCreators.deleteMany, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddChannelsForm);

// https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80