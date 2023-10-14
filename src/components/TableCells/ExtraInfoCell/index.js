import './index.scss';
import ReadMore from '../../ReadMore';
import { Checkbox } from 'antd';
import { Redirect } from 'react-router-dom';
import { StarredCell } from '../StarredCell';
import { COLUMN_ACTIONS } from '../../../constants/dummyData';

export const ExtraInfoCell = ({
  tags,
  city,
  contributor,
  inApp,
  // inWeb,
 
  enableReadMore = false,
  sortedColumn,
  isBold,
  text,
  ...props
}) => {

  // const handleClick =(e) => {
  //   e.preventDefault();
  //    <Redirect to="/contributors" />
  // }
  console.log(city, typeof(city));
  return (
    <div className={sortedColumn ? 'sorted' : ''}>
        
      {enableReadMore ? (
        <ReadMore className={['listing-row-text', isBold && 'bold',text&&'text'].join(' ')}>
          {/* {contentType && title && author && publisheOnDate} || {'-'} */}
          {'-'}
        </ReadMore>
      ) : (
        <p className={['listing-row-text', isBold && 'bold',text&&'text'].join(' ') }>
             
             <div className='topbar'>
             {(tags.length <= 1) &&
             tags.map(tag => {return <span className='tag'>{tag}</span>})
            }
            {(tags.length > 1) &&
            tags.slice(0,1).map(tag => {return <>
            <span className='tag'>{tag}</span> </>})
            }
            {(tags.length > 1) &&
            <span className='tag'>+{tags.length-1}more</span>
            }
            {/* {city.map(city => {return <span className='city'>{city}</span>})} */}
            { (typeof(city) === 'string') && 
            
            <span className='city'>{city}</span>
          }
          {((typeof(city) === 'object') && (city.length <=1)) &&
            city.map(city => {return <span className='city'>{city}</span>})
          }
          {((typeof(city) === 'object') && (city.length >1)) &&
            city.slice(0,1).map(city => {return <span className='city'>{city}</span>})
            
          }
          {((typeof(city) === 'object') && (city.length >1)) && 
            <span className='city'>+{city.length-1}more</span>
        }
            <span className='contributor'  >{contributor}</span>  
             </div>
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
