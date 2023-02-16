import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

interface channelListType {
  broadcaster_language: string;
  broadcaster_login: string;
  display_name: string;
  game_id: string;
  game_name: string;
  id: string;
  is_live: string;
  tag_ids: string[];
  tags: string[];
  thumbnail_url: string;
  title: string;
  started_at: string;
}

const SearchChannels = (props: any) => {
  const [twitchTokenCookies] = useCookies(['twitchAccessToken']);
  const [channelList, setChannelList] = useState<channelListType[]>([]);
  const [ref, inView] = useInView();
  const [page, setPage] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams().channels;
  const getChannelsUrl = 'https://api.twitch.tv/helix/search/channels?query=';

  console.log(params);

  // TODO: 이부분 글로벌로 해야할거같다.
  const header = {
    'client-id': 'k5fvg1rha0tyqhd8hwsavocg2h051u',
    Authorization: `Bearer ${twitchTokenCookies.twitchAccessToken}`,
  };

  const getItemList = () => {
    setLoading(true);
    axios
      .get(`${getChannelsUrl}${params}&after=${page}`, {
        headers: header,
      })
      .then(response => {
        setChannelList(channelList.concat(response.data.data));
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

  // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      getItemList();
    }
  }, [inView, loading]);

  return (
    <>
      {channelList.length > 0 ? (
        <div className="bg-black grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4">
          {channelList.map((item: channelListType, idx: number) => {
            return (
              <Link
                to={`/stream/game_id=${item.game_id}`}
                className="flex justify-center  border-2 border-gray-300 rounded-xl h-250"
              >
                <div key={item.id}>
                  {channelList.length - 5 === idx ? (
                    <div
                      className="flex flex-col font-sans text-white  m-2"
                      ref={ref}
                    >
                      <img
                        src={item.thumbnail_url}
                        alt={item.title}
                        className="w-300 h-300"
                      />
                      <p key={item.id}>
                        {item.title}
                        <br />
                      </p>
                      <p>
                        {item.game_name}
                        {item.display_name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col font-sans text-white  m-2">
                      <img
                        src={item.thumbnail_url}
                        alt={item.title}
                        className="rounded"
                      />
                      <p key={item.id}>
                        {item.title}
                        <br />
                      </p>
                      <p>
                        {item.game_name}
                        {item.display_name}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <>데이터가 없습니다.</>
      )}
    </>
  );
};

export default SearchChannels;
