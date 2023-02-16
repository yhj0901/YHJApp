import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

interface userChannelListType {
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

const useUserChannelFetch = (query: string, userId: string, page: string) => {
  const [list, setList] = useState<userChannelListType[]>([]);
  const [nextPage, setNextPage] = useState('');
  const header = {
    'client-id': 'k5fvg1rha0tyqhd8hwsavocg2h051u',
    Authorization: `Bearer ${query}`,
  };

  const sendQuery = useCallback(async () => {
    try {
      let res = null;
      if (page.length <= 0) {
        res = await axios.get(
          `https://api.twitch.tv/helix/videos?first=40&user_id=${userId}`,
          { headers: header },
        );
      } else {
        res = await axios.get(
          `https://api.twitch.tv/helix/videos?first=40&user_id=${userId}&after=${page}`,
          { headers: header },
        );
      }

      await setList(list.concat(res.data.data));
      setNextPage(res.data.pagination.cursor);
    } catch (err) {
      console.error(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [page]);

  return { nextPage, list };
};

export default useUserChannelFetch;
