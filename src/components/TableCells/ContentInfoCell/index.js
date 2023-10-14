import './index.scss';
import ReadMore from '../../ReadMore';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

export const ContentInfoCell = ({
  contentType,
  title,
  author,
  publisheOnDate,
  enableReadMore = false,
  sortedColumn,
  isBold,
  text,
  ...props
}) => {

  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push('/contributors')

  }

  return (
    <div className={sortedColumn ? 'sorted' : ''}>
      {enableReadMore ? (
        <ReadMore className={['listing-row-text1', isBold && 'bold',text&&'text'].join(' ')}>
          {contentType && title && author && publisheOnDate} || {'-'}
        </ReadMore>
      ) : (
        <p className={['listing-row-text1', isBold && 'bold',text&&'text'].join(' ') }>
             
            <span className='type'>{contentType}</span>
            <span className='title'>{title}</span>
            <span className='author' onClick={handleClick}>{author}</span>
            <span className='dot'>{'\u2022'}</span>
            <span className='publishedOn'>{moment(publisheOnDate)?.format('DD MM YYYY')}</span>
            

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
