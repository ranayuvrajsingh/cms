import * as Yup from 'yup';
import { array, bool, number, object, string } from 'yup';
import { extractIdFromObject } from '../../utils/helper';

export const EXPERIENCES_SCHEMA = object().shape({
  imageList: array()
    .of(
      object().shape({
        url: string(),
      })
    )
    .test('imageList', 'Please upload at-least two image', function (value) {
      let count = 0;
      const { imageList } = this.parent;
      for (let i = 0; i < imageList?.length; i++) {
        if (count === 2) {
          break;
        }
        let value = imageList[i];
        if (value?.url) count++;
      }
      return count > 1;
    }),
  title: string().required('Title is required'),
  price: number().min(1, 'Price must be a positive number').typeError('Price should be in numbers').required('Price is required'),
  minPeopleRequired: number().min(1, 'Price must be a positive number').typeError('Minimum guests should be in numbers').required('Minimum guests is required'),
  shortDescription: string().required('Short description is required'),
  longDescription: string().required('Long description is required'),
  // validate for venue array 
  // venue: array()
  // .of(
  //   object().shape({
  //     // Validate that 0 index is a number
  //     '0': Yup.number().required('Venue number is required'),
  //     // Validate that 1 index is a number
  //     '1': Yup.number().required('Venue capacity is required'),
  //     // Validate that 2 index is a string
  //     '2': Yup.string().required('Venue name is required'),
  //   })
  // )
  // .required('Venue is required'),
  categoryClassification: string().required('Classification is required'),
  city: string().required('City is required'),
  categoryTags: array()
  .of(string())
  .min(1, 'At-least 1 tag is required')
  .required(' Tags are required'),
  adminHost: string().required('Host is required'),
//   rating: number().required('Please rate your experience'),
//   summary: string().required('Summary is required'),
//   category: string().nullable(),
//   location: string().required('Location is required'),
//   start: string().nullable(),
//   end: string().nullable(),
//   bookingUrl: string()
//     .test('link checker', 'Enter a valid url!', function (value) {
//       return new RegExp(
//         /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
//       ).test(value);
//     })
//     .test(
//       'ssl checker',
//       'Did you forget to add "https://" ?',
//       function (value) {
//         return value?.indexOf('https://') > -1;
//       }
//     )
//     .required('Booking URL is required'),
});

export const getExperienceInitialValues = (values = {}) => ({
  id: values?.id || '',
  imageList: populateImagesList(values?.images) || [],
  // coverMediaList: populateImagesList1(values?.coverMedia) || [],
  hostImage: values?.hostImage || '',
  title: values?.title || '',
  shortDescription: values?.shortDescription || '',
  longDescription: values?.longDescription || '',
  hostDescription: values?.hostDescription || '',
  webUrl:values?.webUrl || '',
  vendorAccountId:values?.vendorAccountId || '',
  price: values?.pricePerPass || '',
  minPeopleRequired: values?.minPeopleRequired || 1,
  vendorAmount: values?.vendorAmount || 20,
  bookingUrl: values?.bookingUrl || '',
  adminHost: values?.adminHost || '',
  categoryClassification: extractIdFromObject(values, 'classification') || null,
  whatsIncluded: values?.whatsIncluded?.map((item)=>item) || null,
  whatsNotIncluded: values?.whatsNotIncluded?.map((item)=>item) || null,
  accessibility: values?.accessibility?.map((item)=>item) || null,
  offers: values?.offers?.map((item)=>item) || null,
  categoryTags: values?.tags?.map((item) => item.id) || undefined,
  city: extractIdFromObject(values, 'city') || undefined,
  categoryClassificationtemp: values?.categoryClassification?.map((item) => item.id) || undefined,
  categorySlots: values?.slots?.map((item) => item.id) || null,
  startCsExp: values?.startCsExp || '',
  endCsExp: values?.endCsExp || '',
  extraOptions: {
    cities: values?.city || {},
    classification: values?.classification || [],
     whatsIncluded: values?.whatsIncluded || [],
     whatsNotIncluded: values?.whatsNotIncluded || [],
     accessibility: values?.accessibility || [],
     offers: values?.offers || [],
    tags: values?.tags || [],
    admins: values?.admins || {},
    slots: values?.slots || null,
    
  },
  inApp: values?.inApp || true,
  inWeb: values?.inWeb || true,
  isFeatured: values?.isFeatured || true,
  venue: values?.venue || '',
});

const populateImagesList = (imagesList = []) => {
  let arr = [];
  arr = imagesList?.map((item) => ({ url: item }));
  return arr;
};
const populateImagesList1 = (coverMediaList = []) => {
  let arr = [];
  arr = coverMediaList?.map((item) => ({ url: item }));
  return arr;
};