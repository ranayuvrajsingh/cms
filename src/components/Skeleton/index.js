import { Skeleton } from 'antd';
import React from 'react';

export default class SimpleSkeleton extends React.Component {
  render() {
    return (
      <>
        <Skeleton avatar paragraph={{ rows: this.props.rows }} />
      </>
    );
  }
}
