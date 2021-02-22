import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CircularUnderLoad() {
  return (
    <CircularProgress
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
      }}
      disableShrink
    />
  );
}
