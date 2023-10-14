import './index.scss';
import ReadMore from '../../ReadMore';

export const TextCell = ({
  data,
  enableReadMore = false,
  sortedColumn,
  isBold,
  text,
  ...props
}) => {

  return (
    <div className={sortedColumn ? 'sorted' : ''}>
      {enableReadMore ? (
        <ReadMore className={['listing-row-text', isBold && 'bold',text&&'text'].join(' ')}>
          {data || '-'}
        </ReadMore>
      ) : (
        <p className={['listing-row-text', isBold && 'bold',text&&'text'].join(' ') }>
          {data || '-'}
        </p>
      )}
    </div>
  );
};
// overflow: hidden;
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   -webkit-line-clamp: 2; /* number of lines to show */
//   -webkit-box-orient: vertical;
