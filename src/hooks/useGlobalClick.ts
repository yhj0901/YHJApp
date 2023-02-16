import { useEffect } from 'react';

interface PropsType {
  id: string;
  useClick: boolean;
  callback: (isSearch: boolean) => void;
}

const useGlobalClick = (props: PropsType) => {
  const { id, useClick, callback } = props;
  const handle = (e: any) => {
    // 자신부터 부모중에 매칭되는 id가 있는지 찾음
    if (e.target.closest(`#${id}`) !== null) {
      callback(true);
    } else {
      callback(false);
    }
  };

  useEffect(() => {
    if (useClick) {
      window.removeEventListener('click', handle);
      window.addEventListener('click', handle);
    } else {
      window.removeEventListener('click', handle);
    }

    return () => {
      window.removeEventListener('click', handle);
    };
  }, [useClick]);
};

export default useGlobalClick;
