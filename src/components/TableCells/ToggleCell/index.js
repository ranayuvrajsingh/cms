import { Component } from 'react';
import './index.scss';
import { Switch} from 'antd';

export class ToggleCell extends Component {
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
      <Switch
        checked={this.props.status}
        onChange={this.toggleStatus}
        className={'toggle-switch'}
      />,
      <div style={{ display: 'none' }}>
   
        {this.props.status ? 'Active' : 'Inactive'}
      </div>, //for keeping the values in exported excel
    ];
  }
}
