import * as Yup from 'yup';
import { extractIdFromObject } from '../../utils/helper';

export const CITY_SCHEMA = Yup.object().shape({
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City Name is required'),
  image: Yup.string().required('Please upload an image'),
  description: Yup.string().required('Short description is required'),
});
export const STATE_SCHEMA = Yup.object().shape({
  state: Yup.string().required('State is required'),
});
export const getCityInitialValues = (values = {}) => ({
  state: extractIdFromObject(values, 'state') || undefined,
  city: values?.city || '',
  image: values.image || '',
  description: values.description || '',
  illustration: values.illustration || 'https://cityscope-dev.s3.ap-south-1.amazonaws.com/city_illustrations/udaipur_illustration.svg',
  extractOptions : {
    state : values?.state || {}
  },
});
export const getStateInitialValues = (values = {}) => ({
  state: extractIdFromObject(values, 'state') || undefined,
});
