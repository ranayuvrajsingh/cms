import { number, object, string } from 'yup';

export const LOGIN_SCHEMA = object().shape({
  email: string().email('Invalid email').required('Email is required'),
  password: string().required('Password is required'),
});
export const RESET_PASS_SCHEMA = object().shape({
  email: string().email('Invalid email').required('Email is required'),
});
export const LOGIN_INIT_VALUES = {
  email: process.env.NODE_ENV === 'development' ? 'saksham@gmail.com' : '',
  password: process.env.NODE_ENV === 'development' ? 'saksham@123' : '',
};
export const RESET_PASS_VALUES = {
  email: process.env.NODE_ENV === 'development' ? 'admin@mail.com' : '',
};
export const otpValidation = object().shape({
  email: number().required('OTP is required'),
  // .max(4, 'OTP must be 4 digits long')
  // .min(4, 'OTP must be 4 digits long')
});
