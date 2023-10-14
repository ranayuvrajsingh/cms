import { DatePicker, Space } from 'antd';
import moment from 'moment';

const dateFormat = 'MM/DD/YYYY hh:mm a';

function DateComp(props) {
  const onChange = (val) => {
    props.form.setFieldValue(props.field.name, val);
  };
  const disabledDate = (currentDate) => {
    console.log('jhahkedfbk',currentDate)
    return currentDate && currentDate < moment().startOf('day');
  }


  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        showTime={props.showw |{use12Hours: true, format: 'HH:mm a' }}
        format={dateFormat}
        disabledDate={disabledDate}
        allowClear
        onChange={onChange}
        defaultValue={props.defaultValue? moment(props.defaultValue):''}
        placeholder={props.placeholder}
      />
    </Space>
  );
}
export default DateComp;
