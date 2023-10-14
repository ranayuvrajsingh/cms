import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Row } from 'antd';
import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Login.scss';
import * as AuthSuppliers from '../../store/auth/actions';
import {
  AntInput,
  AntPasswordInput,
} from '../../components/CreateAntFields/CreateAntFields';
import Modal from '../../components/Modal';
import { Link, useHistory } from 'react-router-dom';
import LoginImage from '../../assets/loginImage.webp';
import { AppLogo } from '../../assets/svgs';
import {
  LOGIN_INIT_VALUES,
  LOGIN_SCHEMA,
  RESET_PASS_SCHEMA,
  RESET_PASS_VALUES,
} from './validate';
import { storage } from '../../services/config/storage';
import { motion } from 'framer-motion';

const FORM_MODES = {
  LOGIN: 'login',
  RESET_PASS: 'resetPassword',
};
const Login = (props) => {
  const [otpSent, setOtpSent] = useState(false);
  const [persistUser, setPersistUser] = useState(false);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [formTitle, setFormTitle] = useState('Hello, Welcome back');
  const [formText, setFormText] = useState('Please login to your account');
  const [formMode, setFormMode] = useState(FORM_MODES.LOGIN);
  const history = useHistory();

  useEffect(() => {
    if (history?.location?.pathname?.indexOf('login') > -1) {
      setFormMode(FORM_MODES.LOGIN);
    } else {
      setFormMode(FORM_MODES.RESET_PASS);
      setFormTitle('Reset Password');
      setFormText(
        'Enter your registered email below to get the reset password link'
      );
    }
  }, []);
  const submitHandler = async (values, { setSubmitting }) => {
    let data = {},
      result = {};
    if (formMode === FORM_MODES.LOGIN) {
      data = {
        email: values.email,
        password: values.password,
      };
    } else
      data = {
        email: values.email,
      };
    setSubmitting(true);
    try {
      if (formMode === FORM_MODES.LOGIN) {
        result = await props.login(data);
      } else result = await props.forgotPassword(data);
    } catch (e) {
      setSubmitting(false);
    }
    if (result.status === 201) {
      if (persistUser) storage.set.authToken(result?.data?.accessToken); //is remember me is selected? save user token in LS
      let route = formMode === FORM_MODES.LOGIN ? '/' : '/login';
      history.replace(route);
    }
    setSubmitting(false);
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  const backClicked = () => {
    setOtpSent(false);
    setFormText(
      `Enter your email so that we can send an OTP to you for verification.`
    );
  };

  return (
    <div className="flex flex-row login-form-container">
      <img
        className="flex justify-center items-center login-banner"
        src={LoginImage}
        alt={'login banner'}
      />
      <Modal visible={isModalVisible} onCancel={closeModal}>
        <div className="align-center">
          <img src="./assets/icons/email_sent.svg" className="m-auto" />
          <h1 className="size-32 weight-700 mb-10">Check your inbox!</h1>
          <p className="size-15 weight-400 mb-20">
            We've sent an OTP in your email for account verification.
          </p>
          <Button
            key="ok"
            className="ant-btn ant-btn-lg ant-btn-primary"
            onClick={closeModal}
          >
            Ok, Got it!
          </Button>
        </div>
      </Modal>
      <Formik
        enableReinitialize
        initialValues={
          formMode === FORM_MODES.LOGIN ? LOGIN_INIT_VALUES : RESET_PASS_VALUES
        }
        onSubmit={submitHandler}
        validationSchema={
          formMode === FORM_MODES.LOGIN ? LOGIN_SCHEMA : RESET_PASS_SCHEMA
        }
      >
        {({ setFieldValue, isSubmitting, values, errors }) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: 400 }}
            className="login-form"
          >
            <AppLogo
              className={'app-logo'}
              width={146}
              height={134}
              color={'black'}
            />
            {/*<img src={LoginImage} alt={'banner'} />*/}
            {otpSent && (
              <button
                className="back-btn cursor-pointer ant-btn-lg mb-30"
                onClick={backClicked}
              >
                <img src="./assets/icons/arrow-left.svg" />
              </button>
            )}

            <p className="title">{formTitle}</p>

            <p className="sub-title mt-8">{formText}</p>

            {/* {props.error && (
              <div className="error-banner p-15 mt-20">
                <img src="./assets/icons/stopsign-alert.svg" className="mr-5" />
                <span className="size-12 weight-400">
                  Looks like you’ve entered a wrong email. Please try again.
                </span>
              </div>
            )}*/}

            <div className="mt-30 ">
              <Form>
                {otpSent ? (
                  <Field
                    name="otp"
                    value={values.otp}
                    component={AntInput}
                    label="Enter OTP"
                    type="text"
                    validate={(value) => {
                      let errors = '';
                      if (!value) errors = 'Please enter OTP';
                      if (value) {
                        const digitValidate = /\d{4}/.test(value);
                        if (!digitValidate)
                          errors = 'OTP should be 4 digits long';
                      }
                      return errors;
                    }}
                    hasFeedback
                  />
                ) : (
                  <>
                    <p className="field-label">Email ID</p>
                    <Field
                      value={values.email}
                      name="email"
                      type="text"
                      component={AntInput}
                      placeholder={'Enter your email ID'}
                    />
                    {formMode === FORM_MODES.RESET_PASS && (
                      <p
                        className="sub-title mt-0"
                        style={{ fontSize: 13, opacity: 0.4 }}
                      >
                        Click on the link sent to your registered email to
                        create your new password
                      </p>
                    )}
                    {formMode === FORM_MODES.LOGIN && (
                      <>
                        <p className="field-label">Password</p>
                        <Field
                          value={values.password}
                          name="password"
                          type="text"
                          component={AntPasswordInput}
                          placeholder={'Enter password'}
                        />
                        <Row style={{ justifyContent: 'space-between' }}>
                          <Col span={11}>
                            <Checkbox
                              value={persistUser}
                              onChange={({ target }) => {
                                setPersistUser(target.checked);
                                storage.set.rememberUser(target.checked);
                              }}
                            >
                              <p className={'field-label'}>Remember me</p>
                            </Checkbox>
                          </Col>
                          <Col
                            span={11}
                            style={{
                              textAlign: 'right',
                            }}
                          >
                            {/* <Link to={'/forgot-password'}>
                              Forgot Password?
                            </Link> */}
                          </Col>
                        </Row>
                      </>
                    )}
                  </>
                )}

                <Button
                  type="primary"
                  htmlType="submit"
                  className="ant-btn-block bg-color-primary size-14 weight-700 mt-60"
                  disabled={isSubmitting}
                >
                  {formMode === FORM_MODES.LOGIN ? 'Login' : 'Send Link'}
                </Button>
              </Form>
            </div>
          </motion.div>
        )}
      </Formik>
    </div>
  );
};

function mapStateToProps({ auth }) {
  return {
    loading: auth.loading,
    error: auth.error,
    data: auth.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(AuthSuppliers.login, dispatch),
    forgotPassword: bindActionCreators(AuthSuppliers.forgotPassword, dispatch),
  };
}

Login.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
