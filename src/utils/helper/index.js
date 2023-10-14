import { useLocation } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import moment from 'moment';
import XLSX from 'xlsx';
import { GetApis } from '../../services/apis/common';
import Toast from '../../components/Toast';
import { storage } from '../../services/config/storage';
import Store from '../../store';

import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
export const capitalizeTitle = (title) => {
  const replacedTitle = title.replace(/([a-z])([A-Z])/g, '$1 $2');
  const firstWord = replacedTitle.split(' ')[0];
  const lower = firstWord.toLowerCase();
  const capitalizedFirstWord = lower.charAt(0).toUpperCase() + lower.slice(1);
  return `${capitalizedFirstWord} ${replacedTitle
    .split(' ')
    .slice(1)
    .join(' ')}`;
};
export const generateFilterUrl = (filters) => {
  let mappings = {},
    params = [],
    url = '';
  if (!isEmpty(filters)) {
    Object.keys(filters).map((filterKey) => {
      if (filters?.[filterKey] || filters?.[filterKey] === 0)
        mappings = { ...mappings, ...filters };
      else {
        delete filters[filterKey];
        mappings = { ...filters };
      }
      if (Array.isArray(filters?.[filterKey])) {
        if (isEmpty(filters?.[filterKey])) delete filters[filterKey];
        mappings = { ...filters };
      }
    });
    
    params = createQueryParamUrl(mappings).join('');
    url = params;
  }
  return url;
};
export const createQueryParamUrl = (filterKeys) => {
  let params = [];
  try {
    let filterKeysArray = Object.keys(filterKeys);
    filterKeysArray.map((key, index) => {
      if (filterKeys[key] !== null) {
        params.push(
          `${key}=${filterKeys[key]}${
            index !== filterKeysArray?.length - 1 ? '&' : ''
          }`
        );
      }
    });
  } catch (e) {}
  return params;
};
export const getActiveTabLabel = (INNER_HEADERS, innerHeader) => {
  return INNER_HEADERS.filter(
    (item) => item.label?.toLowerCase() === innerHeader
  )?.[0]?.singular;
};
export const sortData = (sourceData, sortOrder, sortKey) => {
  sortKey = sortKey?.trim();

  let sortedData = orderBy(
    sourceData,
    [
      (row) => {
        let data = get(row, sortKey);
        if (moment(data).isValid()) {
          //handle date sorting
          return new moment(data);
        }
        if (typeof data === 'string') {
          //handle alphabetical sorting
          data = data?.toLowerCase();
        }
        return data;
      },
    ],
    [sortOrder]
  );
  return sortedData;
};
export const exportAsExcel = (type, fileName) => {
  const elt = document.getElementsByTagName('table')?.[0];
  console.log(elt);
  const wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet JS', raw: true });
  return XLSX.writeFile(wb, `${fileName}.${type || 'xlsx'}`);
};
export const uploadImage = async (payload) => {
  try {
    const response = await GetApis.common.createImage(payload);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadMedium = async (payload) => {
  try {
    let innerTab = 'medium';
    const response = await GetApis[innerTab].create.data(payload);;
    return response;
  }
  catch(error){
    return Promise.reject(error);
  }
}

export const uploadClassification = async (payload) => {
  try {
    let innerTab = 'classification';
    const response = await GetApis[innerTab].create.data(payload);;
    return response;
  }
  catch(error){
    return Promise.reject(error);
  }
}

export const getBase64 = (img, callback) => {
  try {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  } catch (e) {}
};

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    Toast('error', 'You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    Toast('error', 'Image must smaller than 10MB!');
  }
  return isJpgOrPng && isLt2M;
};
export const dataURLtoFile = async (dataurl, filename) => {
  if (!dataurl) return null;
  const arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)?.[1],
    bstr = atob(arr?.[1]);
  let n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const fetchAccessToken = () => {
  const isRememberUserEnabled = storage.fetch.rememberUser();
  return isRememberUserEnabled
    ? storage.fetch.authToken()
    : Store.getState()?.auth?.data?.accessToken;
};
export const extractIdFromObject = (values, sourceKey, dataKey = 'id') =>
  values?.[sourceKey] && typeof values?.[sourceKey] === 'object'
    ? values?.[sourceKey]?.[dataKey]
    : values?.[sourceKey];

export const generateOptions = (
  tempData,
  masterData,
  newOption,
  keyName,
  isEditing,
  type
) => {

  //generate options for dropdown and if editing mode append the previous selected value
  let temp = { ...masterData, list: masterData.list?.filter((item) => item) };
  tempData[keyName] = temp;

  if (
    isEditing &&
    newOption?.id &&
    !type &&
    tempData[keyName].list?.[0]?.id !== newOption?.id
  )
    tempData[keyName].list = uniqBy(
      [newOption, ...tempData[keyName].list],
      'id'
    );
  else if (isEditing && type && newOption.length !== 0)
    tempData[keyName].list = uniqBy(
      [...newOption, ...tempData[keyName].list],
      'id'
    );
      // console.log('tempData[keyName]',tempData[keyName])
  return tempData;
};

export const getFormattedHtmlString = function (wrapperClass, str) {
  // Otherwise, fallback to old-school method
  if (!str) return;
  var dom = document.createElement('div');
  // dom.setAttribute('class', wrapperClass || 'specialContent');
  dom.innerHTML = str;
  let elements = dom.getElementsByTagName('p');
  let divss = dom.getElementsByTagName('div');
  let elementList = Array.prototype.slice.call(elements);
  divss &&
    Array.prototype.slice.call(divss)?.map((item) => {
      if (item?.className?.indexOf('brdiv') > -1) {
        dom.removeChild(item);
      }
    });
  elementList?.map((el, index) => {
    let isElementSpecial = el?.style['padding-left'];
    if (isElementSpecial) {
      if (el.innerHTML === '&nbsp;') return dom.removeChild(el); //remove empty special elements
      el.style['padding-left'] = '';
      el.style['background-color'] = '';
      let childArr = [...el.childNodes];
      let backgroundColor = '#ea9446';
      childArr.map((child) => {
        if (child.style) {
          backgroundColor = child.style['background-color'];
          child.style['background-color'] = '';
        } //remove special elements child's highlighted color
      });
      let wrapperSpecialNode = document.createElement('div');
      wrapperSpecialNode.setAttribute(
        'class',
        wrapperClass || 'specialContent'
      );
      wrapperSpecialNode.setAttribute(
        'style',
        `padding:10px;background-color: ${backgroundColor};`
      );
      wrapperSpecialNode.appendChild(el.cloneNode(true)); //create a copy of target element and append to the special div
      try {
        dom.replaceChild(wrapperSpecialNode, el);
      } catch (e) {}
    }
  });
  return dom;
};
export const getReadingTime = (text) => {
  const wpm = 200;
  const words = text?.trim()?.split(/\s+/)?.length;
  let time = undefined;
  if (text) time = Math.ceil(words / wpm);
  return time;
};
export const gcd = (a, b) => {
  return b == 0 ? a : gcd(b, a % b);
};

export const copyToClipboard = (data) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(data);
    return;
  }
  navigator.clipboard.writeText(data);
  Toast('success', '', 'ID Copied');
};
export const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    if (successful) Toast('success', '', 'ID Copied');
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
};



// export const beforeUpload1 = (file) => {
//   console.log('file', file.type);
//   const ismp4 = file.type === 'video/mp4';
//   if (!ismp4) {
//     Toast('error', 'You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 10;
//   if (!isLt2M) {
//     Toast('error', 'Image must smaller than 10MB!');
//   }
//   return ismp4 && isLt2M;
// };


// export const getbase = (video,callback) => {
//   try{
//     console.log('video',video)
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     console.log('lobbbb', reader.readAsDataURL(video))
//     reader.readAsDataURL(video);
//   }catch (e) {}
// }
