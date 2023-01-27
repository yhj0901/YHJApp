import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import HeaderComponent from './HeaderComponent';
import VideoListComponent from './VideoListComponent';

const MainComponent = () => {
  const [twitchTokenCookies, setCookie] = useCookies(['twitchAccessToken']);
  const body = {
    client_id: 'k5fvg1rha0tyqhd8hwsavocg2h051u',
    client_secret: 'vm5z2idkol2n3r4vdpsx3eim7tng5v',
    grant_type: 'client_credentials',
  };

  /** 여기서 토큰 정보 획득 해서 쿠키에 저장함 */
  useEffect(() => {
    const getOAuth2Token = (): void => {
      axios
        .post('https://id.twitch.tv/oauth2/token', body)
        .then(response => {
          console.log(response);
          setCookie('twitchAccessToken', response.data.access_token);
        })
        .catch(error => {
          console.log(error);
        });
    };

    if (twitchTokenCookies.twitchAccessToken) {
      // 토큰 검증
      axios
        .get('https://id.twitch.tv/oauth2/validate', {
          headers: {
            Authorization: `OAuth ${twitchTokenCookies.twitchAccessToken}`,
          },
        })
        .then(response => {
          if (response.data.status === 401) getOAuth2Token();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      getOAuth2Token();
    }
  }, []);

  /**
   * 미리 구현한 HTML(jsx)를 화면상에 보여주는 메서드 추가
   */
  return (
    <>
      {console.log('Renering...')}
      <div className="bg-black">
        {/** header */}
        <HeaderComponent />
        {/** body */}
        <VideoListComponent />
      </div>
    </>
  );
};

export default MainComponent;
