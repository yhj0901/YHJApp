import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const getVideosUrl = 'https://api.twitch.tv/helix/videos?first=40&user_id=';

interface userVideoListType {
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
  muted_segments: [];
}

const Channel = (props: any) => {
  const [twitchTokenCookies] = useCookies(['twitchAccessToken']);
  const [uservideosList, setUserVideosList] = useState([]);
  const [ref, inView] = useInView();
  const params = useParams().userId;

  // TODO: 이부분 글로벌로 해야할거같다.
  const header = {
    'client-id': 'k5fvg1rha0tyqhd8hwsavocg2h051u',
    Authorization: `Bearer ${twitchTokenCookies.twitchAccessToken}`,
  };

  useEffect(() => {
    axios
      .get(`${getVideosUrl}${params}`, {
        headers: header,
      })
      .then(response => {
        setUserVideosList(uservideosList.concat(response.data.data));
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(uservideosList);
  }, []);

  return (
    <>
      {uservideosList.length > 0 ? (
        <div className="bg-black">
          <h1>{uservideosList[0].user_name} 채널입니다.</h1>
          {uservideosList.map((item: userVideoListType, idx: number) => {
            const thumbnail = item.thumbnail_url.replace(
              '%{width}x%{height}',
              '300x230',
            );
            return (
              <Link
                to={`/channel/${params}/${item.id}`}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-8"
              >
                <div key={item.id}>
                  {uservideosList.length - 5 === idx ? (
                    <div
                      className="flex flex-col font-sans text-white  m-2"
                      ref={ref}
                    >
                      <img src={thumbnail} alt={item.title} className="" />
                      <p key={item.id}>
                        {item.title}
                        <br />
                      </p>
                      <p>
                        {item.user_name} - 시청자 : {item.view_count}{' '}
                        {item.type}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col font-sans text-white  m-2">
                      <img
                        src={thumbnail}
                        alt={item.title}
                        className="rounded"
                      />
                      <p key={item.id}>
                        {item.title}
                        <br />
                      </p>
                      <p>
                        {item.user_name} - 시청자 : {item.view_count}{' '}
                        {item.type}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Channel;
