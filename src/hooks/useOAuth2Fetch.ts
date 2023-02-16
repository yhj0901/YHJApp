import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const useOAuth2Fetch = () => {
  const [twitchTokenCookies, setCookie] = useCookies(['twitchAccessToken']);
  const validateTokenUrl = 'https://id.twitch.tv/oauth2/validate';
  const gettokenUrl = 'https://id.twitch.tv/oauth2/token';
  const header = {
    Authorization: `OAuth ${twitchTokenCookies.twitchAccessToken}`,
  };

  const body = {
    client_id: 'k5fvg1rha0tyqhd8hwsavocg2h051u',
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
    grant_type: 'client_credentials',
  };

  /**
   * 토큰 획득 함수
   * 획득한 토큰은 twitchAccessToken key로 cookie에 저장
   */
  const setOAuth2Token = async () => {
    try {
      const res = await axios.post(gettokenUrl, body);
      if (res.status === 200)
        setCookie('twitchAccessToken', res.data.access_token);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *  토큰 검증 함수
   *  쿠키 검증 후 없으면 토큰 획득
   *  @returns true : 유효한 토큰
   *           false : 유효하지 않은 토큰
   */
  const isValidateToken = async () => {
    try {
      const res = await axios.get(validateTokenUrl, {
        headers: header,
      });
      if (res.data.status === 401) return false;
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (twitchTokenCookies.twitchAccessToken) {
      if (!isValidateToken()) setOAuth2Token();
    } else {
      setOAuth2Token();
    }
  }, []);
};

export default useOAuth2Fetch;
