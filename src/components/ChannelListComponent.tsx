import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import useUserChannelFetch from '../hooks/useUserChannelFetch';

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

const ChannelListComponent = (props: any) => {
  const [twitchTokenCookies] = useCookies(['twitchAccessToken']);
  const params = useParams();
  const [page, setPage] = useState('');
  const [ref, inView] = useInView();
  const { nextPage, list } = useUserChannelFetch(
    twitchTokenCookies.twitchAccessToken,
    params.userId,
    page,
  );

  console.log('params: ', params);

  useEffect(() => {
    if (inView) {
      if (nextPage) setPage(nextPage);
    }
  }, [inView]);

  return (
    <>
      {list.length > 0 ? (
        <div className="bg-black">
          <h1>{list[0].user_name} 채널입니다.</h1>
          <div>
            {list.map((item: userVideoListType, idx: number) => {
              const thumbnail = item.thumbnail_url.replace(
                '%{width}x%{height}',
                '300x230',
              );
              return (
                <Link
                  to={`/video/id=${item.id}`}
                  className="ml-8 max-w-xs w-64 align-items"
                >
                  <div key={item.id}>
                    {/** infinite scroll 구현에서 리스트 길이의 5번째 전에 ref로 돔의 변경 상태를 체크 해서 다음 리스트를 호출 */}
                    {list.length - 5 === idx ? (
                      <div className="font-sans text-white m-2" ref={ref}>
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
                    ) : (
                      <div className="font-sans text-white m-2">
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
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChannelListComponent;
