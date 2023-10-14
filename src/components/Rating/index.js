import { Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

export const Rating = ({ onChange, ...fieldProps }) => {
  const ratingChanged = (newRating) => {
    onChange(newRating);
  };
  return (
    <Rate
      {...fieldProps}
      onChange={ratingChanged}
      tooltips={!fieldProps.disabled && ['1', '2', '3', '4', '5']}
      character={({ index }) => customIcons[index + 1]}
    />
  );
};
