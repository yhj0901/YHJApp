import React, { useEffect } from 'react';

const LifeCycleUnmountComponent = () => {
  useEffect(() => {
    return () => {
      console.log('LigeCycleUnmountComponent가 Unmount 되었습니다.');
    };
  }, []);
  return (
    <div>
      <h1> Unmount Component</h1>
    </div>
  );
};

export default LifeCycleUnmountComponent;
