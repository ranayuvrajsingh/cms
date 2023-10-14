

import * as Yup from 'yup';
import { extractIdFromObject } from '../../utils/helper';
import { array, bool, number, object, string } from 'yup';

export const WEATHERS_SCHEMA = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  city: string().required('City is required'),
});

export const DAILYNEWS_SCHEMA = Yup.object().shape({
  // title: string().required('Title is required'),
  // mainContent: string().required('Description is required'),
  // city: string().required('City is required'),
  // backgroundImage: string()
  // .matches(
  //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  //   'Please save the image'
  // ).required('Please upload an image'),
});

export const BYTES_SCHEMA = Yup.object().shape({
  // title: Yup.string().required('Title is required'),
  // city: string().required('City is required'),
  // image: string()
  // .matches(
  //   /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  //   'Please save the image'
  // ).required('Please upload an image'),
  // colorCode : string().required('Color Code is required'),

});

export const getWeathersInitialValues = (values = {}) => ({

  id: values?.id || '',
  description: values?.description || '',
  city: extractIdFromObject(values, 'city') || undefined,
  
 
});

export const getDailynewsInitialValues = (values = {}) => ({
  image: values?.backgroundImage || '',
  id: values?.id || '',
  title: values?.title || '',
  mainContent: values?.mainContent || '', 
  city: extractIdFromObject(values, 'city') || undefined,
 
});


export const getBytesInitialValues = (values = {}) => ({
  image: values?.image || '',
  id: values?.id || '',
  title: values?.title || '',
  description: values?.description || '',
  contentLink: values?.contentLink || '',
  colorCode: values?.colorCode || 'ffffff',
  categoryCity: values?.city?.map((item) => item.id) || undefined,
  extraOptions: {
    cities: values?.cities || [],
  }
 
 
});
