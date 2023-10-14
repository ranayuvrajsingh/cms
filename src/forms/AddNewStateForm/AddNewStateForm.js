import { Button } from 'antd';
import { Field, Form } from 'formik';
import React, { useState, useEffect } from 'react';
import { AntSelect } from '../../components/CreateAntFields/CreateAntFields';
// import PropTypes from 'prop-types';

import '../index.scss';

const AddNewStateForm = (props) => {
  const { values, setFieldValue, handleSubmit, isSubmitting, states } = props;
  const [loading, setLoading] = useState(false);
  
  return (
    <Form>
      <div className="add-form">
        <p className="mb-10 mt-24 field-label">State name</p>
        <div>
          <Field
            name="state"
            component={AntSelect}
            optionValueKey="name"
            optionNameKey="name"
            mode="single"
            RenderWithFilter={true}
            
            value={values.state}
            selectOptions={states}
            placeholder={'Select state'}
          />
        </div>

        <Button
          onClick={handleSubmit}
          loading={isSubmitting}
          className="mt-40 submit-btn"
          type="primary"
          htmlType="submit"
        >
          Add State
        </Button>
      </div>
    </Form>
  );
};


export default AddNewStateForm;
