import {Button, Col, Row} from 'antd';
import {FastField, Field, Form} from 'formik';
import React from 'react';
import {AntDatePicker, AntInput, AntTextArea,} from '../../components/CreateAntFields/CreateAntFields';
// import PropTypes from 'prop-types';
import '../index.scss'

const AddComponentForm = (props) => {
    const {values, setFieldValue, isSubmitting, states} = props;

    return (
        <Form>
            <div className="add-form">
                <Row className={'mt-20 mb-0'}>
                    <Col span={11}>
                        <p className="mb-10 field-label">Date Created</p>
                        <FastField
                            name="createdAt"
                            component={AntDatePicker}
                            value={values.createdAt}
                            placeholder={'DD/MM/YYYY'}
                            format={'DD/MM/YYYY'}
                            inputReadOnly={true}
                        />
                    </Col>
                </Row>
                <p className="mb-10 mt-24 field-label">Component Name</p>
                <Field
                    value={values.componentName}
                    name="categoryName"
                    type="text"
                    validate={(value) => {
                        if (!value) {
                            return 'rew';
                        }
                    }}
                    suffix={<div>{50 - (values.name?.length || 0)} letters</div>}
                    component={AntInput}
                    placeholder={'Enter name'}
                    maxLength={50}
                    // label="City Name *"
                />
                <p className="mb-10 mt-24 field-label">Description (optional)</p>
                <Field
                    value={values.description}
                    name="description"
                    type="text"
                    validate={(value) => {
                        if (!value) {
                            return 'Fact can not be empty';
                        }
                    }}
                    component={AntTextArea}
                    maxLength={500}
                    showCount={{
                        formatter: ({maxLength, count}) => {
                            return `${maxLength - count} letters`
                        }
                    }}
                    placeholder={'Enter short description about the component'}
                />

                <Button
                    loading={isSubmitting}
                    className="mt-40 submit-btn"
                    type="primary"
                    htmlType="submit"
                >
                    Add Component
                </Button>
            </div>
        </Form>
    );
};

export default AddComponentForm;
