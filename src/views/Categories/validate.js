import * as Yup from 'yup';
import { string } from 'yup';
import { extractIdFromObject } from '../../utils/helper';

export const getCategoryInitialValues = (values = {}) => ({
  categoryName: values?.name || '',
  image: values?.image || '',
  colorCode: values?.colorCode || {
    hex: '',
  },
  shortDescription: values?.shortDescription || '',
});
export const CATEGORY_SCHEMA = Yup.object().shape({
  categoryName: Yup.string().required('Category name is required'),
  colorCode: Yup.object()
    .shape({
      hex: string().required('Color Code is required'),
    })
    .nullable()
    .required('Color Code is required'),
  image: Yup.string()
    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
      'Please save the image'
    )
    .required('Please upload an image'),
  shortDescription: Yup.string(),
});
export const getTagInitialValues = (values = {}) => ({
  tagName: values?.name || '',
  category: extractIdFromObject(values, 'category') || undefined,
  shortDescription: values?.shortDescription || '',
});
export const TAG_SCHEMA = Yup.object().shape({
  tagName: Yup.string().required('Category name is required'),
  category: Yup.string().required('Category name is required'),
  shortDescription: Yup.string(),
});
