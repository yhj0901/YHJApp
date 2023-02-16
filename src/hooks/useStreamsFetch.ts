import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

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

const useStreamsFetch = (query: string, page: string) => {
  const [list, setList] = useState<streamsType[]>([]);
  const [nextPage, setNextPage] = useState('');

  const header = {
    'client-id': 'k5fvg1rha0tyqhd8hwsavocg2h051u',
    Authorization: `Bearer ${query}`,
  };

  const sendQuery = useCallback(async () => {
    try {
      let res = null;
      if (page.length <= 0) {
        res = await axios.get(`https://api.twitch.tv/helix/streams?first=40`, {
          headers: header,
        });
      } else {
        res = await axios.get(
          `https://api.twitch.tv/helix/streams?first=40&after=${page}`,
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

export default useStreamsFetch;
