import { CopyOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, DatePicker, Tooltip, Upload } from "antd";
import { FastField, FieldArray, Form } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import {
  AntInput,
  AntRating,
  AntSelect,
  AntTextArea,
  RTEditor,
} from '../../components/CreateAntFields/CreateAntFields';
import { CloseIcon, PanoramaImage, PlusIcon } from '../../assets/svgs';
// import PropTypes from 'prop-types';
import '../index.scss';
import { ImageCropper } from '../../components/ImageCropper';
import { bindActionCreators } from 'redux';
import * as RootActions from '../../store/root/actions';
import * as RootActionCreators from '../../store/root/actions';
import { connect } from 'react-redux';
import {
  beforeUpload, copyToClipboard,
  dataURLtoFile,
  generateFilterUrl,
  generateOptions,
  getBase64,
  uploadClassification,
  uploadImage
} from "../../utils/helper";
import  DateComp from '../../components/Date/date';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';

import uniqBy from 'lodash/uniqBy';
import { ImageCropper1 } from "../../components/ImageCropper1";
import { ImageCropper2 } from "../../components/ImageCropper2";
import { INCLUDINGS } from "../../constants/dummyData";
import { AddNewClassification } from "./components/AddNewClassification";
import AddChannelsForm from "../AddChannelsForm/AddChannelsForm";
import AddWeatherForm from "../AddWeatherForm";
import { AddNewCsExpSlot, AddNewEventSlot, AddNewMasterclassSlot, AddNewRecEventSlot } from "./components/AddNewSlot";
import { GetApis } from "../../services/apis/common";
import LocationPicker from "../../components/LocationPicker/LocationPicker";
const AddExperienceForm = ({
  values,
  setFieldValue,
  isSubmitting,
  handleSubmit,
  states,
  submitButtonLabel,
  errors,
  touched,
  handleReset,
  ...props
}) => {
  const [ loading, setLoading ] = useState(false);
  const [ loading1, setLoading1 ] = useState(false);
  const [ loading2, setLoading2 ] = useState(false);
  const [ activeImage, setActiveImage ] = useState(values?.[ 0 ]?.url);
  // const [ activeImage1, setActiveImage1 ] = useState(values?.[ 0 ]?.url);
  const [ isPreviewMode, setIsPreviewMode ] = useState(false);
  // const [ isPreviewMode1, setIsPreviewMode1 ] = useState(false);
  const [ isPreviewMode2, setIsPreviewMode2 ] = useState(false);
  const [ activeImageIndex, setActiveImageIndex ] = useState(0);
  const [ activeImageIndex1, setActiveImageIndex1 ] = useState(0);
  const [ classificationDiv, setClassificationDiv ] = useState(false)
  const [ classificationList, setClassificationList ] = useState([])
  const [ classificationEdit, setClassificationEdit ] = useState([])
  // const [ showClassifications, setShowClassifications ] = useState(false)
  // const [ classificationNames, setClassificationNames ] = useState([])
  // const [ whatsIncludedTemp, setWhatsIncludedTemp ] = useState([]);
  const [ slotDivNumber, setSlotDivNumber ] = useState(0);
  const [ slotDiv, setSlotDiv ] = useState(false);
  const [ dataList, setDataList ] = useState({
    cities: {},
    classification: {},
    tags: {},
    admins: {},
    slot: {},
    categorySlotsCopy: {}
  });
  const [ loadingMore, setLoadingMore ] = useState(false);
  const [ venues, setVenues ] = useState([]); // for venue list
  // console.log('props', props)
  // console.log('.......', values);
  useEffect(() => {
    setCoverImage();
    props.fetchFromReduxOrNetwork('cities', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('classification', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('tags', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('admins', `page=1&limit=10`);
    props.fetchFromReduxOrNetwork('slot', `page=1&limit=10`);
    return () => {
      setFieldValue('imageList', [ {}, {}, {}, {}, {} ]);
    };

  }, []);
  // console.log('>>>>', props)
  console.log('?????????', dataList)
  // console.log('[[[[[]]]]]]]', values.categoryClassification)
  console.log('ppppppppp',values)
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
      props.classification,
      values?.extraOptions?.classification,
      'classification',
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
      props.slot,
      values?.extraOptions?.slots,
      'slot',
      props.isEditing
    );

    tempData[ 'slot' ].list = values?.extraOptions?.slots;
    // console.log('ambbbb ',tempData);
    setDataList(tempData);
  }, [ props.cities, props.admins, props.classification, props.tags, props.slot ]);

  useEffect(() => {

    //filter the classification list in datalist  and find the name of the id in categoryClassification
    //if there is a value in categoryClassification then only filter the classification list
    if (values?.categoryClassification) {
      let classification = dataList?.classification?.list?.filter((item1) => {
        return item1.id === values?.categoryClassification
      })
      let classificationName = classification?.[ 0 ]?.name;
      switch (classificationName) {
        case 'Masterclass':
          setSlotDivNumber(1);
          break;
        case 'Single Events':
          setSlotDivNumber(2);
          break;
        case 'Recurring Event':
          setSlotDivNumber(3);
          break;
        case 'City Experience':
          setSlotDivNumber(4);
          break;
        default:
          setSlotDivNumber(0);
          break;
      }

    }
  }, [ values?.categoryClassification ]);



  const handleNewClassification = (payload1) => {
    let payload = {
      name: payload1.name,
      description: payload1.contentUrl || null,
    };
    props.createData('classification', payload)
      .then((res) => {
        console.log('this is res', res);
        setClassificationDiv(false);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const Table = ({ values }) => {
    const formatDate = (samay) => {
      const istDate = new Date(samay).toLocaleString();
      console.log('keufbkaub', istDate)
      return istDate;
    };

    const formatTime = (time) => {
      const istDate = new Date(time).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true });
      return istDate;
    };
    return (
      <table style={{marginTop:"10px"}}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}> Timing</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;Seats</th>
            <th style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {values?.map((value) => (
            <tr key={value.noOfSeats}>
              
              {value.dateTimeSingleEvent &&
                <td style={{ textAlign: 'left' }}>
                  
                  {formatDate(value.dateTimeSingleEvent)}
                </td>
              }
              {value.startMasterclass &&
                <td style={{ textAlign: 'left' }}>
                  {(formatDate(value.startMasterclass)).split(',')[0]} - {(formatDate(value.endMasterclass)).split(',')[0]}@{formatTime("2024-05-05T"+value.dailyTimeMasterclass)}
                </td>
              }
              <td style={{ textAlign: 'center' }}>{value.noOfSeats}</td>
              <td style={{ textAlign: 'right' }} onClick={() => handleRemoveSlot(value.id)}><DeleteOutlined/></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleRemoveSlot = (id) => {
  
    let tempData = cloneDeep(dataList);
    tempData[ 'slot' ].list = tempData[ 'slot' ].list.filter((item) => item.id !== id);
    setDataList(tempData);

  };

  const handleNewSlot = async (slottype, payload) => {
    console.log('payload in exp form', slottype, payload)

    if (slottype == 'singleslot') {
      props.createData('slot', payload)
        .then((res) => {
          console.log('this is res', res);
          let tempData = cloneDeep(dataList);
          if(!tempData.slot.list){
            tempData.slot.list = [];
          }
          tempData.slot.list.push(res.data);
          setDataList(tempData);
          setSlotDiv(false);
        })
        .catch((e) => {
          console.log(e);
        })
    }

    if (slottype == 'multislot') {
      let filters = {};
      filters.startRecEvt = payload.startRecEvt;
      filters.endRecEvt = payload.endRecEvt;
      filters.dailyTimeRecEvt = payload.dailyTimeRecEvt;
      let urlParams = generateFilterUrl(filters);
      let payload1 = { noOfSeats: payload.noOfSeats, classification: payload.classification }
      console.log('urlParams', urlParams, '>>>>>', payload1)
      await GetApis.slot.createMultiple.data(payload1, urlParams)
        .then((res) => {
          console.log('this is res', res);
          let tempData = cloneDeep(dataList);
          if(!tempData.slot.list){
            tempData.slot.list = [];
          }
          res.data?.map((item) => {
            tempData.slot.list.push(item);
          })
          setDataList(tempData);
          setSlotDiv(false);
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }
  // console.log('venues set are ', venues)

  // console.log('000000000', values.categorySlots)  
  useEffect(() => {
    setFieldValue('categoryClassification', classificationList)
  }, [ classificationList.length ])

  useEffect(() => {
    //check that  venues array is not empty
    //if not empty then set the value of venue in formik
    if (venues.length > 0) {
      setFieldValue('venue', venues);
    }
  }, [ venues.length ])

  useEffect(() => {
    if(dataList?.slot?.list?.length > 0){
    setFieldValue('categorySlots', dataList?.slot?.list?.map((item) => item.id))
    setClassificationEdit(true);
    }
    else{
      setFieldValue('categorySlots', null)
      setClassificationEdit(false);
    }
  }, [ dataList.slot?.list?.length ])

  //handling the changes in covermedia

  // const handleChange1 = (info) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading1(true);
  //     return;
  //   }
  //   getBase64(info.file.originFileObj, (imageUrl) => {
  //     setFieldValue('image1', imageUrl);
  //     setActiveImage1(imageUrl);
  //     setLoading1(false);
  //   });
  // };

  // const handleSaveClassification = async(values) => {
  //   let payload = values.categoryClassificationtemp;
  //   let response = await uploadClassification(payload); 
  //   let Classifications = values.categoryClassification;
  //   if (response?.status === 201)
  //    setClassificationList([...classificationList, response?.data?.id])    
  //    setClassificationDiv(false);
  //   //  setFieldValue('categoryMedium',mediumList);
  // };

  // useEffect(() => {
  //   if (values?.categoryClassification) {
  //     setClassificationList([values?.categoryClassification]);
  //   }
  //   if(classificationList.lenght >0){
  //     setShowClassifications(true);
  //   }
  // },[])

  // const addToImageList1 = useCallback(
  //   async (url) => {
  //     let images1 = values.coverMediaList;
  //     let formData = new FormData();
  //     let file1 = await dataURLtoFile(url, `image1_${Math.random()}.png`);
  //     formData.append('file', file1);
  //     setLoading1(true);
  //     let response = {};
  //     try {
  //       response = await uploadImage(formData);
  //     } catch (e) { }
  //     if (response?.status === 201)
  //       images1[ activeImageIndex1 ] = { url: response?.data?.url };
  //     setLoading1(false);
  //     setFieldValue('coverMediaList', images1);
  //   },
  //   [ activeImageIndex1 ]
  // );
  // const deleteImageFromList1 = useCallback(() => {
  //   let coverMediaList = values.coverMediaList;
  //   coverMediaList[ activeImageIndex1 ] = {
  //     url: '',
  //   };
  //   setFieldValue('coverMediaList', coverMediaList);

  //   let lastValidImage =
  //     coverMediaList?.filter((item) => item.url)?.slice(-1)?.[ 0 ] || [];
  //   setActiveImage1(lastValidImage?.url);
  //   let lastIndex = 0;
  //   for (let i = 0; i < coverMediaList?.length; i++) {
  //     if (coverMediaList[ i ]?.url) {
  //       lastIndex = i;
  //     }
  //   }
  //   setActiveImageIndex1(lastIndex);
  // }, [ activeImageIndex1 ]);

  //handling the host image 

  const handleChange2 = (info) => {
    if (info.file.status === 'uploading') {
      setLoading2(true);
      return;
    }
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (imageUrl) => {
      setFieldValue('hostImage', imageUrl);
      setLoading2(false);
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
      if (delta < 0 && dataList?.[ dataKey ]?.metadata?.next) {
        setLoadingMore(true);
        let page = dataList?.[ dataKey ]?.metadata?.next;
        props
          .fetchDataForInnerTabs(dataKey, `page=${page}&limit=10`, false, false)
          .then((res) => {
            let tempData = { ...dataList };
            tempData[ dataKey ].page = page;
            tempData[ dataKey ].list = [
              ...tempData[ dataKey ].list,
              ...(res?.data || []),
            ];
            tempData[ dataKey ].metadata = res?.metadata || {};
            tempData[ dataKey ].list = uniqBy(tempData[ dataKey ].list, 'id')
            setDataList(tempData);
            setLoadingMore(false);
          });
      }
    }
  };

  const uploadButton = (
    <div>
      {loading || loading1 || loading2 ? (
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

  const setCoverImage = useCallback(() => {
    let firstImage = values?.imageList?.[ 0 ]?.url;
    if (values?.imageList?.[ 0 ]?.url) {
      setIsPreviewMode(true);
      setActiveImage(firstImage);
    }
  }, []);
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    getBase64(info.file.originFileObj, (imageUrl) => {
      setFieldValue('image', imageUrl);
      setActiveImage(imageUrl);
      setLoading(false);
    });
  };



  const addToImageList = useCallback(
    async (url) => {
      let images = values.imageList;
      let formData = new FormData();
      let file = await dataURLtoFile(url, `image_${Math.random()}.png`);
      formData.append('file', file);
      setLoading(true);
      let response = {};
      try {
        response = await uploadImage(formData);
      } catch (e) { }
      if (response?.status === 201)
        images[ activeImageIndex ] = { url: response?.data?.url };
      setLoading(false);
      setFieldValue('imageList', images);
    },
    [ activeImageIndex ]
  );
  const deleteImageFromList = useCallback(() => {
    let imageList = values.imageList;
    imageList[ activeImageIndex ] = {
      url: '',
    };
    setFieldValue('imageList', imageList);

    let lastValidImage =
      imageList?.filter((item) => item.url)?.slice(-1)?.[ 0 ] || [];
    setActiveImage(lastValidImage?.url);
    let lastIndex = 0;
    for (let i = 0; i < imageList?.length; i++) {
      if (imageList[ i ]?.url) {
        lastIndex = i;
      }
    }
    setActiveImageIndex(lastIndex);
  }, [ activeImageIndex ]);

  const hasError = (field) => {
    return errors[ field ] && touched[ field ] && errors[ field ];
  };
  return (
    <div className="whole">
      <Form className="formss">
        <div className="add-form">

          <p className="mb-10 mt-24 field-label">Images*</p>
          {activeImage ? (
            <ImageCropper
              onCancel={() => {
                setActiveImage('');
                deleteImageFromList();
                setIsPreviewMode(false);
              }}
              setLoading={(state) => setLoading(state)}
              // isSaved={values?.image}
              onSave={(url) => {
                addToImageList(url);
                setIsPreviewMode(true);
              }}
              isPreviewMode={isPreviewMode}
              src={activeImage}
            />
          ) : (
            <Upload
              listType={`picture-card ${hasError('imageList') ? 'error' : ''}`}
              className="picture-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
          )}
          <div className="upload-list">
            <div
              style={{
                display: 'flex',
                overflowX: 'auto',
                maxWidth: '85%',
                padding: '0 0 10px 0',
              }}
            >
              {values.imageList?.map(
                (item, index) =>
                  item.url && (
                    <div
                      key={index}
                      className={[
                        'uploaded-image-container',
                        index === activeImageIndex ? 'selected' : '',
                      ].join(' ')}
                    >
                      <img
                        onClick={() => {
                          setActiveImageIndex(index);
                          setActiveImage(item.url);
                          setIsPreviewMode(true);
                        }}
                        alt={'upload-image'}
                        className={[ 'uploaded-image-container-item' ].join(' ')}
                        src={item.url}
                      />
                    </div>
                  )
              )}
            </div>
            <div className={`upload-button-small ${loading ? 'disabled' : ''}`}>
              <input
                disabled={loading}
                onChange={(e) => {
                  if (loading) return;
                  const file = e.target.files[ 0 ];
                  if (file && beforeUpload(file))
                    getBase64(file, (imageUrl) => {
                      setActiveImage(imageUrl);
                      setIsPreviewMode(false);
                      e.target.value = '';
                    });
                }}
                type="file"
                id="file"
                accept="image/png, image/jpeg, image/jpg"
              />
              <label
                onClick={() => {
                  setActiveImageIndex(values.imageList?.length);
                }}
                htmlFor="file"
              >
                {loading ? (
                  <div className="upload-loading">
                    <LoadingOutlined />
                  </div>
                ) : (
                  <PlusIcon />
                )}
              </label>
            </div>
          </div>
          {hasError('imageList') && (
            <div className="ant-form-item-explain ant-form-item-explain-error mt-12">
              {hasError('imageList')}
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
          {/* <p className="mb-10 mt-24 field-label">Cover Images</p>
          {activeImage1 ? (
            <ImageCropper1
              onCancel={() => {
                setActiveImage1('');
                deleteImageFromList1();
                setIsPreviewMode1(false);
              }}
              setLoading1={(state) => setLoading1(state)}
              // isSaved={values?.image}
              onSave={(url) => {
                addToImageList1(url);
                setIsPreviewMode1(true);
              }}
              isPreviewMode1={isPreviewMode1}
              src={activeImage1}
            />
          ) : (
            <Upload
              listType={`picture-card ${hasError('coverMediaList') ? 'error' : ''}`}
              className="picture-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange1}
            >
              {uploadButton}
            </Upload>
          )}
          <div className="upload-list">
            <div
              style={{
                display: 'flex',
                overflowX: 'auto',
                maxWidth: '85%',
                padding: '0 0 10px 0',
              }}
            >
              {values.coverMediaList?.map(
                (item, index) =>
                  item.url && (
                    <div
                      key={index}
                      className={[
                        'uploaded-image-container',
                        index === activeImageIndex1 ? 'selected' : '',
                      ].join(' ')}
                    >
                      <img
                        onClick={() => {
                          setActiveImageIndex1(index);
                          setActiveImage1(item.url);
                          setIsPreviewMode1(true);
                        }}
                        alt={'upload-image'}
                        className={[ 'uploaded-image-container-item' ].join(' ')}
                        src={item.url}
                      />
                    </div>
                  )
              )}
            </div>
            <div className={`upload-button-small ${loading1 ? 'disabled' : ''}`}>
              <input
                disabled={loading1}
                onChange={(e) => {
                  if (loading1) return;
                  const file = e.target.files[ 0 ];
                  if (file && beforeUpload(file))
                    getBase64(file, (imageUrl) => {
                      setActiveImage1(imageUrl);
                      setIsPreviewMode1(false);
                      e.target.value = '';
                    });
                }}
                type="file"
                id="file1"
                accept="image/png, image/jpeg, image/jpg"
              />
              <label
                onClick={() => {
                  setActiveImageIndex1(values.coverMediaList?.length);
                }}
                htmlFor="file1"
              >
                {loading1 ? (
                  <div className="upload-loading">
                    <LoadingOutlined />
                  </div>
                ) : (
                  <PlusIcon />
                )}
              </label>
            </div>
          </div>
          {hasError('coverMediaList') && (
            <div className="ant-form-item-explain ant-form-item-explain-error mt-12">
              {hasError('coverMediaList')}
            </div>
          )} */}

          <p className="mb-10 mt-24 field-label">Host Image (optional)</p>
          {values?.hostImage ? (
            <ImageCropper2
              onCancel={() => {
                setFieldValue('hostImage', '');
                setIsPreviewMode2(false);
              }}
              isPreviewMode2={isPreviewMode2}
              setLoading2={(state) => setLoading2(state)}
              onSave={async (url) => {
                setFieldValue('hostImage', url);
                setIsPreviewMode2(true);
                let formData = new FormData();
                let file2 = await dataURLtoFile(url, `image_${Math.random()}.png`);
                formData.append('file', file2);
                let response = await uploadImage(formData);
                if (response?.status === 201)
                  setFieldValue('hostImage', response?.data?.url);
                setLoading2(false);
              }}
              src={values?.hostImage}
            />
          ) : (
            <Upload
              // name="media.url"
              listType={`picture-card ${hasError('hostImage') ? 'error' : ''}`}
              className="picture-uploader"
              showUploadList={false}
              // action={handleUpload}
              beforeUpload={beforeUpload}
              onChange={handleChange2}
            >
              {uploadButton}
            </Upload>
          )}
          {hasError('hostImage') && (
            <div className="ant-form-item-explain ant-form-item-explain-error">
              {hasError('hostImage')}
            </div>
          )}


          {/* <p className="mb-5 mt-24 field-label">Rating</p>
        <FastField value={values.rating} name="rating" component={AntRating} /> */}

          <p className="mb-7 mt-24 field-label">Price/person*</p>
          <FastField
            value={values.price}
            name="price"
            type="text"
            size={'large'}
            component={AntInput}
            placeholder={'Price in ₹'}
          />
          <p className="mb-10 mt-24 field-label">Title*</p>
          <FastField
            value={values.title}
            name="title"
            type="text"
            suffix={<div>{50 - (values.name?.length || 0)} letters</div>}
            component={AntInput}
            placeholder={'Enter content title'}
            maxLength={50}
          // label="City Name *"
          />

          <p className="mb-10 mt-24 field-label">Select venue of the experience*</p>
          {/* <FastField
            value={values.venue[3]}
            name="venue"
            component={<LocationPicker setVenues={setVenues} />}
          /> */}
          {/* <LocationPicker setVenues={setVenues} /> */}
          <FastField name="venue">
            {({ field, form }) => (
              <LocationPicker setVenues={setVenues} editing={props.isEditing} place={values?.venue} {...field} />
            )}
          </FastField>
          <div className="flex justify-between">

            <section className="flex-1 mr-5">

              <p className="mb-10 mt-24 field-label">Whats Included (optional)</p>

              <FieldArray name="whatsIncluded">
                {({ insert, remove, push }) => (
                  <div>
                    {values?.whatsIncluded?.length > 0 &&
                      values?.whatsIncluded?.map((item, index) => (
                        <div key={index} style={{ display: "flex", "flexDirection": "row" }}>

                          <FastField
                            style={{ width: "90%" }}
                            name={`whatsIncluded[${index}]`}
                            type="text"
                            component={AntTextArea}
                            placeholder={'Enter Inclusion'}
                          />
                          {index >= 0 && (
                            <Button type="button" onClick={() => remove(index)}>
                              X
                            </Button>
                          )}
                        </div>
                      ))}
                    <Button
                      type="button"
                      onClick={() => push("")}
                    >
                      Add another including
                    </Button>
                  </div>
                )}


              </FieldArray>
            </section>
            <section className="flex-1 ml-5">
              <p className="mb-10 mt-24 field-label">Whats Not Included (Optional)</p>

              <FieldArray name="whatsNotIncluded">
                {({ insert, remove, push }) => (
                  <div>
                    {values?.whatsNotIncluded?.length > 0 &&
                      values?.whatsNotIncluded?.map((item, index) => (
                        <div key={index} style={{ display: "flex", "flexDirection": "row" }}>

                          <FastField
                            style={{ width: "90%" }}
                            name={`whatsNotIncluded[${index}]`}
                            type="text"
                            component={AntTextArea}
                            placeholder={'Enter exclusion'}
                          />
                          {index >= 0 && (
                            <Button type="button" onClick={() => remove(index)}>
                              X
                            </Button>
                          )}
                        </div>
                      ))}
                    <Button
                      type="button"
                      onClick={() => push("")}
                    >
                      Add another exclusion
                    </Button>
                  </div>
                )}
              </FieldArray>
            </section>
          </div>

          <div className="flex justify-between">

            <section className="flex-1 mr-5">
              <p className="mb-10 mt-24 field-label">Accessibility (Optional)</p>

              <FieldArray name="accessibility">
                {({ insert, remove, push }) => (
                  <div>
                    {values?.accessibility?.length > 0 &&
                      values?.accessibility?.map((item, index) => (
                        <div key={index} style={{ display: "flex", "flexDirection": "row" }}>

                          <FastField
                            style={{ width: "90%" }}
                            name={`accessibility[${index}]`}
                            type="text"
                            component={AntTextArea}
                            placeholder={'Enter Accessibility'}
                          />
                          {index >= 0 && (
                            <Button type="button" onClick={() => remove(index)}>
                              X
                            </Button>
                          )}
                        </div>
                      ))}
                    <Button
                      type="button"
                      onClick={() => push("")}
                    >
                      Add another accessibility
                    </Button>
                  </div>
                )}
              </FieldArray>
            </section>
            <section className="flex-1 ml-5">
              <p className="mb-10 mt-24 field-label">Offers IDs (optional)</p>

              <FieldArray name="offers">
                {({ insert, remove, push }) => (
                  <div>
                    {values?.offers?.length > 0 &&
                      values?.offers?.map((item, index) => (
                        <div key={index} style={{ display: "flex", "flexDirection": "row" }}>

                          <FastField
                            style={{ width: "90%" }}
                            name={`offers[${index}]`}
                            type="text"
                            component={AntInput}
                            placeholder={'Enter applicable razorpay offer IDs'}
                          />
                          {index >= 0 && (
                            <Button type="button" onClick={() => remove(index)}>
                              X
                            </Button>
                          )}
                        </div>
                      ))}
                    <Button
                      type="button"
                      onClick={() => push("")}
                    >
                      Add another including
                    </Button>
                  </div>
                )}
              </FieldArray>

            </section>
          </div>
          <p className="mb-10 mt-24 field-label">Short description*</p>
          <FastField
            value={values.shortDescription}
            name="shortDescription"
            type="editor"
            onChangeEditor={(htmlValue) => {
              setFieldValue('shortDescription', htmlValue);
            }}
            component={RTEditor}
            // showCount={{
            //   formatter: ({ maxLength, count }) => {
            //     return `${maxLength - count} letters`;
            //   },
            // }}
            placeholder={'Enter short description about the content'}
          />

          <p className="mb-10 mt-24 field-label">Long Description*</p>
          <FastField
            value={values.longDescription}
            name="longDescription"
            type="editor"
            onChangeEditor={(htmlValue) => {
              setFieldValue('longDescription', htmlValue);
            }}
            component={RTEditor}
            // showCount={{
            //   formatter: ({ maxLength, count }) => {
            //     return `${maxLength - count} letters`;
            //   },
            // }}
            placeholder={'Enter long description about the content'}
          />
          <p className="mb-10 mt-24 field-label">host description (optional)</p>
          <FastField

            name="hostDescription"
            type="text"
            component={AntTextArea}
            maxLength={500}
            showCount={{
              formatter: ({ maxLength, count }) => {
                return `${maxLength - count} letters`;
              },
            }}
            placeholder={'Enter description about the host'}
          />



        </div>
        <div className="another">
          <p className="mb-10 mt-24 field-label">Tags*</p>
          <FastField
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
                <div>{`${values?.categoryTags?.length} ${values.categoryTags?.length === 1 ? 'Tag' : 'Tags'
                  } Selected`}</div>
              )
            }
          />


          <p className="mb-10 mt-24 field-label">Web URL (Optional)</p>
          <FastField
            value={values.webUrl}
            name="webUrl"
            type="text"
            component={AntInput}
            placeholder={'Enter web url'}
          />

          <p className="mb-7 mt-24 field-label">Minimum people Required*</p>
          <FastField
            value={values.minPeopleRequired}
            name="minPeopleRequired"
            type="number"
            size={'large'}
            component={AntInput}
            placeholder={'minPeopleRequired'}
          />

          <p className="mb-7 mt-24 field-label">Vendor Account Id (optional)</p>
          <FastField
            value={values.vendorAccountId}
            name="vendorAccountId"
            type="text"
            size={'large'}
            component={AntInput}
            placeholder={'vendor account id'}
          />


          <p className="mb-7 mt-24 field-label">Vendor Cut % (optional) </p>
          <FastField
            value={values.vendorAmount}
            name="vendorAmount"
            type="text"
            size={'large'}
            component={AntInput}
            placeholder={'vendorAmount in ₹'}
          />

          <p className="mb-10 mt-24 field-label">City*</p>
          <FastField
            value={values.city}
            name="city"
            optionValueKey="id"
            optionNameKey="name"
            mode="single"
            showRadioButton={true}
            RenderWithFilter={true}
            disableOptionsOn={props.isEditing}
            component={AntSelect}
            selectOptions={dataList.cities?.list}
            placeholder={'Select location'}
            shouldUpdate={(nextProps, props) => true}
            dropdownRender={(menu) => (
              <div onWheel={(e) => handleScroll(e, 'cities')}>
                {menu}
                {loadingMore && (
                  <p className="mb-2 mt-2 field-label align-center">Loading...</p>
                )}
              </div>
            )}
          />
          <p className="mb-10 mt-24 field-label">Booking URL (optional)</p>
          <FastField
            value={values.bookingUrl}
            name="bookingUrl"
            type="text"
            component={AntInput}
            placeholder={'Enter web url'}
          />

          <p className="mb-10 mt-24 field-label">Author*</p>
          <FastField
            value={values.adminHost}
            name="adminHost"
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
            placeholder='Select Author'
          />

          <p className="mb-10 mt-24 field-label">Classification*</p>
          
          <FastField
            value={values.categoryClassification}
            name="categoryClassification"
            allowClear
            clearIcon={<CloseIcon width={18} height={18} color={'#C9C4C4FF'} />}
            component={AntSelect}
            RenderWithFilter={true}
             disabled={classificationEdit}
            disableOptionsOn={props.isEditing}
            // onChange={handleEmptySlot}
            mode={'single'}
            optionValueKey="id"
            optionNameKey="name"
            dropdownRender={(menu) => (
              <div onWheel={(e) => handleScroll(e, 'classification')}>
                {menu}
                {loadingMore && (
                  <p className="mb-2 mt-2 field-label align-center">Loading...</p>

                )}
                <button className='medium-add' onClick={(e) => { e.preventDefault(); setClassificationDiv(true) }}>Add another clasification</button>
                <button className='medium-add' onClick={(e) => { e.preventDefault(); setClassificationDiv(false) }}>Cancel</button>
                {/* {classificationDiv && <div className='medium'>
                  <AddNewClassification onAdd={handleNewClassification} setClassificationDiv={setClassificationDiv} />
                </div>
                } */}
              </div>
            )}

            shouldUpdate={(nextProps, props) => true}
            selectOptions={dataList.classification?.list}
            placeholder={'Select Classification'}
          // label="City Name *"
          />
          <small>* you cant edit the classification if there are slots already present for this Exeprience</small>
          {
            (values?.categoryClassification?.length > 0 && (slotDivNumber == 3 || slotDivNumber == 1 || slotDivNumber == 2 )) &&

            <div className="flex justify-between">

              <section className="flex-1 mr-5">
                <Button className="mb-7  field-label" onClick={() => setSlotDiv(true)}>+ Add a Slot</Button>
              </section>
              {/* <section className="flex-1 mr-5">
             <p className="mb-7  field-label" onClick={()=>setSlotDiv(true)}>+ Add multiple Slot</p>
           </section>  */}
              <section className="flex-1 ml-5">
                <Button className="mb-7 field-label" style={{backgroundColor:'grey'}} onClick={() => setSlotDiv(false)}>X Cancel</Button>
              </section>

            </div>
          }


          {(slotDiv && slotDivNumber == 1) && <div className='medium'>
            <AddNewMasterclassSlot onAdd={handleNewSlot} setSlotDiv={setSlotDiv} classification={values.categoryClassification} />
          </div>}
          {(slotDiv && slotDivNumber == 2) && <div className='medium'>
            <AddNewEventSlot onAdd={handleNewSlot} setSlotDiv={setSlotDiv} classification={values.categoryClassification} />
          </div>}
          {(slotDiv && slotDivNumber == 3) && <div className='medium'>
          
            <AddNewRecEventSlot onAdd={handleNewSlot} setSlotDiv={setSlotDiv} classification={values.categoryClassification} />
            <hr/>
            <p className="ml-5" style={{marginTop:'20px'}} >Use the below form to add a single slot for this recurring event</p>
            <AddNewEventSlot onAdd={handleNewSlot} setSlotDiv={setSlotDiv} classification={values.categoryClassification} />
          </div>}
          {/* {(values?.categoryClassification?.length > 0 && slotDiv && slotDivNumber == 4) &&
            <div className="flex justify-between">

              <section className="flex-1 mr-5">
                <p className="mb-7  field-label">Start Time*</p>
                <FastField
                  defaultValue={values.startCsExp}
                  name="startCsExp"
                  size={'large'}

                  component={Date}
                  placeholder={moment().format('MM/DD/YYYY')}
                />
              </section>
              <section className="flex-1 ml-5">
                <p className="mb-7 field-label">End Time*</p>
                <FastField
                  defaultValue={values.endCsExp}
                  name="endCsExp"
                  size={'large'}
                  component={Date}
                  placeholder={moment().add(1, 'days').format('MM/DD/YYYY')}
                />
              </section>

            </div>
          } */}
          {/*TODO: Add CS experiecne fields too to show */}

          {(slotDivNumber==1 || slotDivNumber==2 || slotDivNumber==3) && <div className="flex justify-between">
          {
            dataList.slot?.list?.length > 0 &&
            <Table values={dataList.slot?.list} />
          }  
            </div>}
          
          {(slotDivNumber==4) &&  <div className="flex justify-between">
          {/* <h3 className='ml-5' style={{marginTop:'20px',fontWeight:'bold'}}>Adding Dates for CityScope Exp</h3> */}
<section className="flex-1 mr-5">
  <p className="mb-7  field-label">Start Time*</p>
  <FastField
    defaultValue={values.startCsExp}
    name="startCsExp"
    size={'large'}

    component={DateComp}
    placeholder={moment().format('MM/DD/YYYY')}
  />
</section>
<section className="flex-1 ml-5">
  <p className="mb-7 field-label">End Time*</p>
  <FastField
    defaultValue={values.endCsExp}
    name="endCsExp"
    size={'large'}
    component={DateComp}
    placeholder={moment().add(1, 'days').format('MM/DD/YYYY')}
  />
</section>

</div>}


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

                      
                <p>Before clicking submit please check whether all the required fields marked with * are filled properly</p>



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

const mapStateToProps = ({ cities, classification, tags, admins, slot }) => ({
  classification,
  tags,
  cities,
  admins,
  slot,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddExperienceForm);
