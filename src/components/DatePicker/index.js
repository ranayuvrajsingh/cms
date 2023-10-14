import { DatePicker, Space } from 'antd';
import React from 'react';
import moment from 'moment';
import './index.scss';

const { RangePicker } = DatePicker;
export const DateRangePicker = ({ onChange, format, value, ...props }) => {
  const today = [
    moment().format(format),
    moment().add(-1, 'days').format(format),
  ];
  const disabledDate = (currentDate) => {
    return currentDate && currentDate < moment().startOf('day');
  }

  const val = value
    ? [
        moment(value?.[0])?.toISOString()?.substring(0, 10),
        moment(value?.[1])?.toISOString()?.substring(0, 10),
      ]
    : today;

  return (
    <div className="pickerRange">
      <Space direction="vertical" size={12}>
        <RangePicker
          disabledDate={disabledDate}
          onChange={onChange}
          defaultValue={[moment(val?.[0], format), moment(val?.[1], format)]}
          format={format}
        />
      </Space>
    </div>
  );
};
