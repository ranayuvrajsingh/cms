

import * as Yup from 'yup';
import { extractIdFromObject } from '../../utils/helper';

export const ADMINS_SCHEMA = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  // name: Yup.string().required('Name Name is required'),
});

export const getAdminsInitialValues = (values = {}) => ({
  email:values?.email || '',
  categoryRole: extractIdFromObject(values, 'role') || undefined,
  extraOptions : {
    role : values?.role || {}
  },
});
