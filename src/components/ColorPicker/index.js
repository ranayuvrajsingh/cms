import { SketchPicker } from 'react-color';
import React, { useEffect, useRef, useState } from 'react';
import throttle from 'lodash/throttle';
import './index.scss';

export const ColorPicker = ({ colorCode, onChangeColor, ...props }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [color, setColor] = useState({});
  const throttledOnChange = useRef(throttle(onChangeColor, 1000));

   useEffect(() =>{
      if(color?.hex){
      throttledOnChange.current(color)
    }
   }, [color]);
   


  useEffect(() => {
    setColor(colorCode);
  }, [colorCode?.hex]);
  console.log(color,"color")
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        setColorPickerVisible((prevState) => !prevState);
      }}
      className={'color-picker'}
    >
      {color?.hex || '#000000'}
      <div>
        <div
          style={{
            background: color?.hex || '#000',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
            borderRadius: 3,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 3,
              background: `rgba(${color?.rgb?.r}, ${color?.rgb?.g}, ${color?.rgb?.b}, ${color?.rgb?.a})`,
            }}
          />
        </div>
        {colorPickerVisible && (
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
            }}
          >
            <div
              style={{
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              }}
            />
            <SketchPicker
              width={215}
              color={color.rgb}
              onChange={(val) => setColor(val)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
