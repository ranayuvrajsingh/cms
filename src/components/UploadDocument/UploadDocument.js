import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Api } from '../../services/config/request';
import { get } from '../../utils/helper';
// import axios from 'axios';
import './UploadDocument.scss';

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { imagesUrl } from '../../constants/imagesUrl';

const { Dragger } = Upload;

const UploadDocument = (props) => {
  const {
    placeholder,
    onChange,
    accept,
    method,
    value,
    required,
    disabled,
    className,
  } = props;

  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [uploadUrl, setUploadUrl] = useState('');
  const [getUrl, setGetUrl] = useState('');
  const [documentName, setDocumentName] = useState('');

  useEffect(() => {
    if (!!value[0].url) {
      setUploadedDocuments(value);
    } else {
      setUploadedDocuments([]);
    }
  }, [get(value[0], 'url')]);

  const uploadDocProps = {
    multiple: false,
    method: method,
    accept: accept,
    action: uploadUrl,
    beforeUpload: async ({ name: documentName }) => {
      try {
        setDocumentName(documentName);
        const response = await Api.get(`file-upload?fileNames=${documentName}`);
        const data = response.data[0];
        setUploadUrl(data.putUrl);
        setGetUrl(data.getUrl);
        // const fileName = data['fileName'];
        // const newData = [...field[name], { name: fileName, url: data.getUrl }];
        // await setUploadedDocuments(newData);
      } catch (err) {
        console.log(err);
      }
    },
    onChange: (info) => {
      let fileList = [...info.fileList];
      console.log('>>FileList', fileList);

      // 1. Limit the number of uploaded files
      // Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-1);

      // 2. Read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      setUploadedDocuments(fileList);
      onChange({
        name: documentName,
        url: getUrl,
      });
      // handleValChange(uploadedDocuments, ele, 'docUpload', rateCardIndex);
    },
  };

  const handleRemoveDocument = (document) => {
    onChange({
      name: '',
      url: '',
    });
    setUploadedDocuments([]);
  };

  return (
    <div className={`upload-document ${className}`}>
      <div className="flex flex-col">
        {uploadedDocuments.map((file, index) => (
          <div key={index} className="upload-file flex justify-between">
            <div>
              {/* <img src={imagesUrl.icons.cloudUpload} alt="content" /> */}
              <a className="ml-10" href={file.url} target="_blank">
                {file.name}
              </a>
            </div>
            {!!disabled || props.disabled ? (
              <div></div>
            ) : (
              <div onClick={() => handleRemoveDocument(file)}>
                <img src="/img/delete.svg" alt="delete" />
                <a className="ml-10">Remove</a>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`
        ${required && !value[0]?.url ? 'upload-required ' : ''}
        ${uploadedDocuments.length > 0 ? 'hide ' : ''}
        ${!!disabled ? 'hide ' : ''}`}
      >
        <Dragger
          {...uploadDocProps}
          showUploadList={false}
          customRequest={({ onSuccess, onError, file, action }) => {
            Api.put(action, file)
              .then((resp) => {
                onSuccess(resp, file);
              })
              .catch((err) => {
                onError(err);
              });
          }}
        >
          <img
            className="upload-icon mr-10"
            src={imagesUrl.icons.cloudUpload}
            alt="content"
          />

          <p className="mt-5 weight-700 size-14 color-primary">{placeholder}</p>
          <p className="mt-15 weight-500 size-11 color-black">
            Max size: 50MB(png, jpeg, mp4, mov)
          </p>
        </Dragger>
      </div>
    </div>
  );
};

UploadDocument.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  accept: PropTypes.string,
  method: PropTypes.string,
  onChange: PropTypes.func,
};

UploadDocument.defaultProps = {
  placeholder: 'Click to upload',
  className: '',
  required: false,
  accept: '.doc,.docx,.pdf,.jpg,.jpge,.png',
  method: 'put',
  onChange: () => {},
};

export default UploadDocument;
