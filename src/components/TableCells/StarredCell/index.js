import { Component } from 'react';
import './index.scss';
import { Switch } from 'antd';
import { StarIcon } from '../../../assets/svgs';

export class StarredCell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleStatus = (isActive, e) => {
    e?.stopPropagation();
    this.props.onToggle && this.props.onToggle(isActive);
  };

  render() {
    return [
      <>
      <div className='switch-div'>
            <Switch
        checked={this.props.status}
        onChange={this.toggleStatus}
        className={'toggle'}
      />
      <span className='show'>{this.props.showIn}</span>
      </div>
   
      {/* // <div className={this.props.status==true ? 'checked' : 'unchecked'} onClick={this.toggleStatus()}>
      //   <StarIcon  />
      // </div>
    */}
    
      <div style={{ display: 'none' }}>
        
        {this.props.status ? 'Active' : 'Inactive'}
      </div>
      {/* //for keeping the values in exported excel */}
      </>
    ];
  }
}

// export const StarredCell = ({
//   status,
//   onToggle,
// }) => {
//   const toggleStatus = (isActive, e) => {
//     e?.stopPropagation();
//     onToggle && onToggle(isActive);
//   };
//   return [
//     <div className={status==true ? 'checked' : 'unchecked'} onClick={toggleStatus()}>
//       <StarIcon  />
//     </div>
//   ];
// }
