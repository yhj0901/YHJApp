import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

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
const useViedoFetch = (query: string, sereadId: string) => {
  const [userVideoInformation, setUserVideoInformation] =
    useState<userVideoInfoType>();
  const videoInfoUrl = `https://api.twitch.tv/helix/videos?${sereadId}`;
  const header = {
    'client-id': 'k5fvg1rha0tyqhd8hwsavocg2h051u',
    Authorization: `Bearer ${query}`,
  };

  console.log('videoInfoUrl:', videoInfoUrl);
  const sendQuery = useCallback(async () => {
    try {
      const res = await axios.get(videoInfoUrl, { headers: header });
      console.log('res:', res);
      setUserVideoInformation(res.data.data[0]);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    sendQuery();
  }, []);

  return { userVideoInformation };
};

export default useViedoFetch;
