import { array, bool, number, object, string } from 'yup';
import { extractIdFromObject } from '../../utils/helper';

export const ARTICLES_SCHEMA = object().shape({
  coverImage: string()
    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
      'Please save the image'
    ).required('Please upload an image'),
  timeToRead: string().nullable(),
  title: string().required('Title is required'),
  summary: string().required('Summary is required'),
  city: string().required('city is required'),
  webUrl: string()
    .test('link checker', 'Enter a valid url!', function (value) {
      return value
        ? new RegExp(
            /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
          ).test(value)
        : true;
    })
    .test(
      'ssl checker',
      'Did you forget to add "https://" ?',
      function (value) {
        return value ? value?.indexOf('https://') > -1 : true;
      }
    ).nullable(),
  articleDetails: string().required('Article details are required'),
  categoryTags: array()
    .of(string())
    .min(1, 'At-least 1 tag is required')
    .required('Category tags are required'),
});

export const CHANNELS_SCHEMA = object().shape({
  image: string()
    .matches(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
      'Please save the image'
    ).required('Please upload an image'),
  name: string().required('Title is required'),
 description: string().required('Description is required'),
 categoryTags: array()
 .of(string())
 .min(1, 'At-least 1 tag is required')
 .required('Category tags are required'),
  colorCode: string().required('colorCode Category is required'),
  // categoryArticles: array()
  // .of(string()).nullable(),
  // categoryExperiences: array()
  // .of(string()).nullable(),
  // categoryMedium: array()
  // .of(string()).nullable(),
});

export const getArticlesInitialValues = (values = {}) => (
  {
  coverImage: values?.coverImage || '',
  id: values?.id || '',
  title: values?.title || '',
  summary: values?.shortDescription || '',
  city: extractIdFromObject(values, 'city') || undefined,
  admin: values?.author || '',
  channels:extractIdFromObject(values, 'channels')||undefined,
  articleDetails: values?.content || '',
  categoryTags: values?.tags?.map((item) => item.id) || undefined,
  timeToRead: values?.timeToRead || '',
  webUrl: values?.webUrl || '',
  extraOptions: {
    cities: values?.city || {},
    tags: values?.tags || [],
    categories: values?.category || {},
    admins: values?.admins || {},
  },
  inApp: values?.inApp || true,
  inWeb: values?.inWeb || true,
  isFeatured: values?.isFeatured || true,
 
});
export const getChannelInitialValues = (values = {}) => ({
  image: values?.image || '',
  id: values?.id || '',
  name: values?.name || '',
  description: values?.description || '',
  colorCode: values?.colorCode || '',
  categoryCity: values?.city?.map((item) => item.id) || undefined,
  categoryTags: values?.tags?.map((item) => item.id) || undefined,
  categoryArticles: values?.articles?.map((item) => item.id) || undefined,
  categoryExperiences: values?.experiences?.map((item) => item.id) || undefined,
  categoryMedium: values?.medium_type?.map((item) => item.id) || undefined,
  // categoryMediumtemp: values?.medium?.map((item) => item.id) || undefined,
  extraOptions: {
    city: values?.city || [],
    tags: values?.tags || [],
    articles: values?.articles || {},
    experiences: values?.experiences || {},
    medium_type: values?.medium_type || [],
  },
  inApp: values?.inApp || true,
  inWeb: values?.inWeb || true ,
  isFeatured: values?.isFeatured || true,
});

const populateImagesList = (imagesList = []) => {
  let arr = [];
  arr = imagesList?.map((item) => ({ url: item }));
  return arr;
};


// export const EXPERIENCES_SCHEMA = object().shape({
//   imageList: array()
//     .of(
//       object().shape({
//         url: string(),
//       })
//     )
//     .test('imageList', 'Please upload at-least two image', function (value) {
//       let count = 0;
//       const { imageList } = this.parent;
//       for (let i = 0; i < imageList?.length; i++) {
//         if (count === 2) {
//           break;
//         }
//         let value = imageList[i];
//         if (value?.url) count++;
//       }
//       return count > 1;
//     }),
//   title: string().required('Title is required'),
//   price: number().typeError('Price should be in numbers'),
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
// });

// export const AUTHORS_SCHEMA=object().shape({
//   image: string()
//   .matches(
//     /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
//     'Please save the image'
//   )
//   .required('Please upload an image'),
//   name:string().required('Author Name is required'),
//   email:string().email("Invalid Email")
// })

// export const getExperienceInitialValues = (values = {}) => ({
//   id: values?.id || '',
//   imageList: populateImagesList(values?.images) || [],
//   title: values?.title || '',
//   summary: values?.shortDescription || '',
//   price: values?.pricePerPass || '',
//   bookingUrl: values?.bookingUrl || '',
//   category: extractIdFromObject(values, 'category') || null,
//   location: extractIdFromObject(values, 'city') || undefined,
//   rating: values?.rating || '',
//   start: values?.start || '',
//   end: values?.end || '',
//   extraOptions: {
//     cities: values?.city || {},
//     categories: values?.category || {},
//   },
// });
// export const getAuthorsInitialValues=(values={})=>({
//   image:values?.image || '',
//   name:values?.name||'',
//   email:values?.email||''
// })