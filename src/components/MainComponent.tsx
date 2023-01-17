import React, { useEffect, useState } from 'react';
import LifeCycleUnmountComponent from './LifeCycleUnmountComponent';

const MainComponent = (props: any) => {
  const [isShowTempComp, setIsShowTempComp] = useState(true);
  /**
   * 컴포넌트 호출 시 가장 먼저 호출이 되는 공간
   * 컴포넌트에서 사용 될 state나 함수들을 정의 하는 공간
   */
  console.log('해당 부분이 제일 먼저 호출된다.');

  const [userInfo, setUserInfo] = useState({
    useId: 'yangheejune',
    userAge: 37,
    isShowTempComponent: false,
  });

  useEffect(() => {
    console.log(
      '화면이 렌더링 된 이후에 바로 수행이 됨: componentDidMount()과 동일',
    );
  }, []);
  /**
   * 임시 컴포넌트 Unmount
   */
  const fnUnmountComponent = () => {
    setIsShowTempComp(!isShowTempComp);
  };

  useEffect(() => {
    console.log(
      '전달 받은 props의 값에 변화가 생겼을 경우 / 사용자 나이의 변화가 발생하였을 경우 수행이 된다. : componentDidUpdate()와 동일',
    );
  }, [props.appState, userInfo.userAge]);

  /**
   * 미리 구현한 HTML(jsx)를 화면상에 보여주는 메서드 추가
   */
  return (
    <>
      {console.log('Renering...')}
      <div>
        <h1>Main 컴포넌트입니다.</h1>
        <div>{userInfo.useId}</div>
        <div>{userInfo.userAge}</div>
        <div>{userInfo.isShowTempComponent}</div>
        <button type="button" onClick={fnUnmountComponent}>
          컴포넌트 제거
        </button>
        {isShowTempComp && <LifeCycleUnmountComponent />}
      </div>
    </>
  );
};

export default MainComponent;
