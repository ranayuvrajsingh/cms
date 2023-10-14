import * as Yup from 'yup';
import { extractIdFromObject } from '../../utils/helper';

export const USER_SCHEMA = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  name: Yup.string().required('Name Name is required'),
});

export const getUserInitialValues = (values = {}) => ({
  city: extractIdFromObject(values, 'city') || undefined,
  extractOptions : {
    city : values?.city || {}
  },
});
