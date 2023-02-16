import React from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import useViedoFetch from '../hooks/useViedoFetch';

const VideoViewComponent = () => {
  const params = useParams().sereadId;
  const [twitchTokenCookies] = useCookies(['twitchAccessToken']);
  const { userVideoInformation } = useViedoFetch(
    twitchTokenCookies.twitchAccessToken,
    params,
  );

  return (
    <>
      {!userVideoInformation ? (
        <div className="flex text-white h-screen">
          비디오 데이터가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col font-sans text-white  m-2 bg-black h-screen">
          <p>
            타이틀 : {userVideoInformation.title}
            <br />
          </p>
          <p>
            {userVideoInformation.user_name} - 시청자 :{' '}
            {userVideoInformation.view_count} {userVideoInformation.type}
          </p>
          <iframe
            src={`https://player.twitch.tv/?video=${params}&parent=localhost`}
            height="500"
            width="700"
            allowFullScreen
            title={userVideoInformation.title}
          />
        </div>
      )}
    </>
  );
};

export default VideoViewComponent;
