import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { Player } from 'video-react';

interface userVideoInfoType {
  id: string;
  stream_id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  title: string;
  description: string;
  created_at: string;
  published_at: string;
  url: string;
  thumbnail_url: string;
  viewable: string;
  view_count: number;
  language: string;
  type: string;
  duration: string;
  muted_segments: string;
}

const videoInfoUrl = 'https://api.twitch.tv/helix/videos?id=';
const Stream = (props: any) => {
  const params = useParams();
  const [twitchTokenCookies] = useCookies(['twitchAccessToken']);
  const [userVideoInfo, setUserVideoInfo] = useState<userVideoInfoType>();

  const header = {
    'client-id': 'k5fvg1rha0tyqhd8hwsavocg2h051u',
    Authorization: `Bearer ${twitchTokenCookies.twitchAccessToken}`,
  };

  // 서버에서 하나의 아이템을 가져오는 함수
  const getItem = () => {
    axios
      .get(`${videoInfoUrl}${params.sereadId}`, {
        headers: header,
      })
      .then(response => {
        setUserVideoInfo(response.data.data[0]);
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
      {!userVideoInfo ? (
        <></>
      ) : (
        <>
          <div className="flex flex-col font-sans text-white  m-2 bg-black">
            <p>
              타이틀 : {userVideoInfo.title}
              <br />
            </p>
            <p>
              {userVideoInfo.user_name} - 시청자 : {userVideoInfo.view_count}{' '}
              {userVideoInfo.type}
            </p>
            {/* <Player playsInline src={userVideoInfo.url}>
              aaa
            </Player> */}
          </div>
        </>
      )}
    </>
  );
};

export default Stream;
