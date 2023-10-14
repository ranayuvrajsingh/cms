import './index.scss';
import { TrendingIcon } from '../../../assets/svgs';

export const ImageCell = ({ data, isTrending = false }) => {
  return (
    <div>
      <img className={'listing-row-image'} src={data} />
      <div style={{ display: 'none' }}>{data}</div>
      {/*for keeping the values in exported excel*/}
      {isTrending && (
        <div className={'trending'}>
          <TrendingIcon height={10} />
        </div>
      )}
    </div>
  );
};
