import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import useStreamsFetch from '../hooks/useStreamsFetch';

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
  const [page, setPage] = useState('');
  const [ref, inView] = useInView();
  /**
   * 스트리밍 획득 hook
   */
  const { nextPage, list } = useStreamsFetch(
    twitchTokenCookies.twitchAccessToken,
    page,
  );

  useEffect(() => {
    /**
     * intersection Observer api를 통해 infinite scroll을 구현할수 있다.
     * 브라우저에서 지원하는 api로 document의 viewport 사이의 intersection 내의 변화를 비동기적으로 관찰할수 있는 방법이다.
     * 해당 api를 react 라이브러리로 true/false 로 반환하는 hook이 있었고 그 hook을 통해서 구현하였다.
     */
    if (inView) {
      setPage(nextPage);
    }
  }, [inView]);

  return (
    <>
      <div id="greeting" className="bg-black m-4">
        <h1 className="text-white text-2xl m-4">트위치에 오신걸 환영합니다.</h1>
      </div>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4">
        {list &&
          list.map((item: streamsType, idx: number) => {
            const thumbnail = item.thumbnail_url.replace(
              '{width}x{height}',
              '300x230',
            );
            return (
              <Link
                to={`channel/${item.user_id}`}
                className="flex  justify-center items-center bg-gray-800 rounded-xl ml-3 mb-3"
                key={item.id}
              >
                <div>
                  {/** infinite scroll 구현에서 리스트 길이의 5번째 전에 ref로 돔의 변경 상태를 체크 해서 다음 리스트를 호출 */}
                  {list.length - 5 === idx ? (
                    <ul className="font-sans text-white p-3" ref={ref}>
                      <img
                        src={thumbnail}
                        alt={item.title}
                        className="rounded"
                      />
                      <li className="truncate">{item.title}</li>
                      <li>
                        아이디 : {item.user_name} - 시청자 : {item.viewer_count}{' '}
                      </li>
                    </ul>
                  ) : (
                    <div className=" font-sans text-white p-3">
                      <img
                        src={thumbnail}
                        alt={item.title}
                        className="rounded"
                      />
                      <li
                        key={item.id}
                        className="truncate list-none w-[250px]"
                      >
                        {item.title}
                      </li>
                      <li className="list-none">아이디 : {item.user_name}</li>
                      <li className="list-none">
                        시청자 : {item.viewer_count}{' '}
                      </li>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default VideoListComponent;
