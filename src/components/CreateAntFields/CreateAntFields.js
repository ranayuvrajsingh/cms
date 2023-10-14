import { DatePicker, Form, Input, InputNumber, Select, TimePicker } from 'antd';
import React from 'react';
import get from 'lodash/get';
import FloatLabel from '../FloatLabel';
import { CheckBoxTick, RadioButtonIcon } from '../../assets/svgs';
import { RichTextEditor } from '../RichTextEditor';
import { Rating } from '../Rating';
import uniqBy from 'lodash/uniqBy';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField =
  (AntComponent) =>
  ({
    field,
    form,
    hasFeedback,
    label,
    selectOptions,
    submitCount,
    type,
    value,
    heading,
    optionNameKey,
    optionValueKey,
    suffixIcon,
    disableOptionsOn,
    onChangeEditor,
    RenderWithFilter,
    ...props
  }) => {
    const touched = get(form?.touched, field?.name);
    const submitted = submitCount > 0;
    const hasError = get(form.errors, field.name);
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;
    const onInputChange = ({ target: { value } }) => {
      form.setFieldValue(field.name, value);
    };
    const onChange = (value) => form.setFieldValue(field.name, value||null);
    const onBlur = () => form.setFieldTouched(field.name, true);
    let selectProps = {};
   
    if (selectOptions) {
      selectProps = {
        dropdownClassName: props.mode,
        showRadioButton: props.showRadioButton,
        getPopupContainer: (trigger) => trigger.parentNode,
      };
     

    }
 
    return (
      <div className="field-container">
        <FloatLabel label={label} val={value}>
          <FormItem
            hasFeedback={
              !!((hasFeedback && submitted) || (hasFeedback && touched))
            }
            help={submittedError || touchedError ? hasError : false}
            validateStatus={
              submittedError || touchedError ? 'error' : 'success'
            }
          >
            <AntComponent
              {...field}
              onBlur={onBlur}
              {...(type === 'editor'
                ? {
                    onChangeEditor,
                  }
                : {
                    onChange: type ? onInputChange : onChange,
                  })}
              type={type}
              {...selectProps}
              {...props}
            >
              {selectOptions &&
                selectOptions.map((option) => (
                  <Option

                    disabled={
                      !disableOptionsOn && !option.isActive ? true : false
                    }
                    key={option?.value || option[optionValueKey]}
                    data={selectOptions}
                  >
                    {selectProps.showRadioButton ? (
                      <RadioButtonIcon />
                    ) : (
                      props.mode === 'multiple' && <CheckBoxTick />
                    )}
                    {RenderWithFilter &&
                    !option?.isActive &&
                    option?.hasOwnProperty('isActive') ? (
                      <span style={{justifyContent:'space-evenly'}}>
                      <span
                        style={{
                          color: 'grey',
                          maxWidth: '300px',
                          overflow: 'hidden',
                          textOverflow: 'eilipsis',
                         
                      
                        }}
                      >
                        {option?.name || option[optionNameKey]} {' '} 
                        <span style={{ color: 'grey',float:'right',marginRight:'20px'
                         }}> {` ${` ( Inactive )`}`}</span>
                        </span>
                      
                    
                      </span>
                    ) : (
                      option?.name || option[optionNameKey]
                    )}
                  </Option>
                ))}
            </AntComponent>
          </FormItem>
        </FloatLabel>
      </div>
    );
  };

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntPasswordInput = CreateAntField(Input.Password);
export const AntNumberInput = CreateAntField(InputNumber);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntTextArea = CreateAntField(TextArea);
export const RTEditor = CreateAntField(RichTextEditor); //not a ant component
export const AntRating = CreateAntField(Rating); //not a ant component
