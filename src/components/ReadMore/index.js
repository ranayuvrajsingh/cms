import React, { useCallback, useState } from 'react';
import './index.scss';

const TEXT_LENGTH_THRESHOLD = 100;
const ReadMore = ({
  className,
  maxLength = TEXT_LENGTH_THRESHOLD,
  children,
}) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = useCallback(
    (e) => {
      e.stopPropagation();
      setIsReadMore(!isReadMore);
    },
    [isReadMore]
  );
  let truncatedText = text?.slice(0, maxLength);
  return (
    <p className={className}>
      {isReadMore ? truncatedText : text}
      {text?.length > truncatedText?.length && (
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? ' ...read more' : ' show less'}
        </span>
      )}
    </p>
  );
};
export default React.memo(ReadMore);
