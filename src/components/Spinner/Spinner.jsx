// src/components/Spinner.jsx
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <ClipLoader color="#36D7B7" size={50} />
    </div>
  );
};

export default Spinner;