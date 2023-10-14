import React from 'react';

import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
} from '@ant-design/icons';

import './Toast.scss';

const ToastTemplate = (props) => {
  const fontSize = '26px';
  const margin = '0 21px';

  const colors = {
    success: '#00aa77',
    error: '#f13737',
    wait: '#f7b500',
    info: '#f7b500',
  };

  const defaultMessages = {
    success: 'Saved Successfully!',
    error: 'Uh oh, something went wrong',
    wait: 'Coming soon',
    info: 'Attention',
  };

  const color = colors[props.type];

  const getMessage = () => {
    if (!props.message) {
      return defaultMessages[props.type];
    } else if (typeof props.message === 'string') {
      return props.message;
    } else {
      return JSON.stringify(props.message);
    }
  };

  const getDescription = () => {
    if (!props.description) {
      return '';
    } else if (typeof props.description === 'string') {
      return props.description;
    } else {
      return JSON.stringify(props.description);
    }
  };

  return (
    <div className="toster-container flex items-center">
      <div className="toster-line" style={{ backgroundColor: color }} />
      {props.type === 'success' || props.type === 'wait' ? (
        <CheckCircleFilled
          className="self-center"
          style={{ color, fontSize, margin }}
        />
      ) : null}
      {props.type === 'info' ? (
        <InfoCircleFilled
          className="self-center"
          style={{ color, fontSize, margin }}
        />
      ) : null}
      {props.type === 'error' ? (
        <CloseCircleFilled
          className="self-center"
          style={{ color, fontSize, margin }}
        />
      ) : null}
      <div>
        <p className="toster-title">{getMessage()}</p>
        <p className="toster-desc">{getDescription()}</p>
      </div>
    </div>
  );
};

export default ToastTemplate;
