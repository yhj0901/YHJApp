import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const nextPageUrl = 'https://api.twitch.tv/helix/streams?first=40&after=';

interface streamsType {
  game_id: string;
  game_name: string;
  id: string;
  is_mature: boolean;
  language: string;
  started_at: string;
  tag_ids: string[];
  tags: string[];
  thumbnail_url: string;
  title: string;
  type: string;
  user_id: string;
  user_login: string;
  user_name: string;
  viewer_count: number;
}

const VideoListComponent = () => {
  const [twitchTokenCookies] = useCookies(['twitchAccessToken']);
  const [streamsList, setStreamsList] = useState([]);
  const [ref, inView] = useInView();
  const [page, setPage] = useState('');
  const [loading, setLoading] = useState(false);

  const header = {
    'client-id': 'k5fvg1rha0tyqhd8hwsavocg2h051u',
    Authorization: `Bearer ${twitchTokenCookies.twitchAccessToken}`,
  };

  // 서버에서 아이템을 가지고 오는 함수
  const getItemList = () => {
    setLoading(true);
    axios
      .get(`${nextPageUrl}${page}`, {
        headers: header,
      })
      .then(response => {
        setStreamsList(streamsList.concat(response.data.data));
        setPage(response.data.pagination.cursor);
      })
      .catch(error => {
        console.log(error);
      });
    setLoading(false);
  };

  // 페이지 마운트때 한번 호출
  useEffect(() => {
    getItemList();
  }, []);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      getItemList();
    }
  }, [inView, loading]);

  return (
    <>
      <div id="greeting" className="bg-black">
        <h1 className="text-white text-2xl">트위치에 오신걸 환영합니다.</h1>
      </div>
      {streamsList &&
        streamsList.map((item: streamsType, idx: number) => {
          const thumbnail = item.thumbnail_url.replace(
            '{width}x{height}',
            '300x230',
          );
          return (
            <Link
              to={`channel/${item.user_id}`}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-8"
            >
              <div key={item.id}>
                {streamsList.length - 5 === idx ? (
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
                      {item.user_name} - 시청자 : {item.viewer_count}{' '}
                      {item.type}
                    </p>
                    {item?.tags?.map((tag: any) => {
                      return <p className="">{tag}</p>;
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col font-sans text-white  m-2">
                    <img src={thumbnail} alt={item.title} className="rounded" />
                    <p key={item.id}>
                      {item.title}
                      <br />
                    </p>
                    <p>
                      {item.user_name} - 시청자 : {item.viewer_count}{' '}
                      {item.type}
                    </p>
                    {item?.tags?.map((tag: any) => {
                      return <p className="">{tag}</p>;
                    })}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default VideoListComponent;
