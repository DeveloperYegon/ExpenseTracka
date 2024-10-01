// components/FrameComponent.js
import React from 'react';
import Frame from 'react-frame-component';

const FrameComponent = ({ children }) => {
  return (
    <Frame
      style={{
        width: '100%',
        height: '500px',
        border: '2px solid #ddd',
        marginTop: '20px',
      }}
    >
      {children}
    </Frame>
  );
};

export default FrameComponent;
