import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = (query: string, page: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const header = {
    'client-id': 'k5fvg1rha0tyqhd8hwsavocg2h051u',
    Authorization: `Bearer ${query}`,
  };

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(
        `https://api.twitch.tv/helix/streams?first=40${page}`,
        { headers: header },
      );
      await setList([...list, res.data.data]);

      setLoading(false);
    } catch (err) {
      setError(false);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery();
  }, [query, sendQuery, page]);

  return { loading, error, list };
};

export default useFetch;
