import * as Yup from 'yup';
import { extractIdFromObject } from '../../utils/helper';
import { array, bool, number, object, string } from 'yup';




export const TAGS_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  // name: Yup.string().required('Name Name is required'),
});

export const getTagsInitialValues = (values = {}) => ({
  
  id: values?.id || '',
  name: values?.name || '',
  shortDescription: values?.shortDescription || '',
  image: values?.image || '',
});
export const ROLES_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  categoryPermissions: array()
  .of(string())
  .min(1, 'At-least 1 permission is required')
  .required('permission are required'),
  // name: Yup.string().required('Name Name is required'),
});

export const getRolesInitialValues = (values = {}) => ({
  id: values?.id || '',
  name: values?.name || '',
  categoryPermissions: values?.permissions?.map((item) => item.id) || undefined,
  extraOptions: {
    permissions: values?.permission || [],
    
  },
  
});


