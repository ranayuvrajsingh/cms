import React, { useState } from 'react';

import './FloatLabel.scss';

const FloatLabel = (props) => {
  const [focus, setFocus] = useState(false);
  const { children, label, val, nolabel } = props;
  const labelClass =
    focus ||
    (Array.isArray(val)
      ? val.length > 0
      : val !== undefined && val !== '' && val !== null)
      ? 'label label-float'
      : 'label';
  return (
    <>
      {nolabel ? (
        children
      ) : (
        <div
          className="float-label"
          data-testid="float-label"
          id="float-label"
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
        >
          {children}
          <label className={labelClass}>{label}</label>
        </div>
      )}
    </>
  );
};

export default FloatLabel;
