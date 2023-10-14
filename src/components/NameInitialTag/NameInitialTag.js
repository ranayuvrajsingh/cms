import React from 'react';
// import PropTypes from 'prop-types';
import './NameInitialTag.scss';

const NameInitialTag = (props) => {
  const { name, image, style, className } = props;
  return !!image ? (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        ...style,
      }}
      className="capitalize name-initial-tag"
    />
  ) : (
    // <img src={image} className="capitalize name-initial-tag" />
    <div style={style} className={`capitalize name-initial-tag ${className}`}>
      {name}
    </div>
  );
};

// NameInitialTag.propTypes = {};

export default NameInitialTag;
