import { Button,Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
  return (
    <div>
    <Result
    status="404"
    title="404"
    subTitle={props.title?props.title:"Sorry, the page you visited does not exist."}
    extra={<Link to='/'><Button type="primary">Back Home</Button></Link>}
  />
  </div>
  );
};
export default NotFound;
