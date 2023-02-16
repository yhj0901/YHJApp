import React from 'react';
import VideoListComponent from '../components/VideoListComponent';
import useOAuth2Fetch from '../hooks/useOAuth2Fetch';

const Main = () => {
  /**
   * 토큰 획득 hook
   */
  useOAuth2Fetch();

  /**
   * 미리 구현한 HTML(jsx)를 화면상에 보여주는 메서드 추가
   */
  return (
    <>
      <VideoListComponent />
    </>
  );
};

export default Main;
