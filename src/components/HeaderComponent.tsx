import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import useGlobalClick from '../hooks/useGlobalClick';
import ResultSearch from './Search/ResultSearch';

const HeaderComponent = (props: any) => {
  const navigate = useNavigate();
  // 검색어 이거 하나 지금 리덕스로 뺄수 있겠는데
  const [searchText, setSearchText] = useState('');
  const [showHideResultSearch, setShowHideResultSearch] = useState(false);
  const [searchHistoryList, setSearchHistoryList] = useState<string[]>([]);
  const [twitchSearchHistoryListCookies, setTwitchSearchHistory] = useCookies([
    'twitchSearchHistoryList',
  ]);

  // 검색 필터
  const filterItems = (query: string): string[] => {
    let filterList: string[] = [];
    if (query === '') {
      filterList = twitchSearchHistoryListCookies.twitchSearchHistoryList;
    } else {
      filterList =
        twitchSearchHistoryListCookies.twitchSearchHistoryList.filter(
          (item: string) =>
            item.toLowerCase().indexOf(query.toLowerCase()) > -1,
        );
    }

    return filterList;
  };

  const handlerSetShowResultSearch = () => {
    setShowHideResultSearch(true);
  };

  const handlerSetHidenResultSearch = () => {
    setShowHideResultSearch(false);
  };

  /**
   * 자식 컴포넌트에서 사용하는 핸들러
   * 이전 검색 리스트에서 하나의 검색문자열을 선택했을때
   * 선택된 문자열을 인풋박스에 표시하고 검색 리스트 닫기
   * @param text 선택된 문자열
   */
  const handlerChangeSearchText = (text: string) => {
    setSearchText(text);
    handlerSetHidenResultSearch();
  };

  /**
   * 검색 텍스트 변경
   * 변경된 검색어로 필터 검색
   * @param e
   */
  const onChangeSearchText = (e: any) => {
    setSearchText(e.target.value);
    const items = filterItems(e.target.value);
    if (items) setSearchHistoryList(filterItems(e.target.value));
  };

  /**
   * 검색 결과 페이지로 이동
   */
  const handleSearchChannelButton = () => {
    let tempSearchTextList: string[] =
      twitchSearchHistoryListCookies.twitchSearchHistoryList;
    // 히스토리 리스트 추가하여 cookie에 저장
    if (tempSearchTextList) {
      if (tempSearchTextList.indexOf(searchText) === -1)
        tempSearchTextList.push(searchText);
    }
    // 히스토리가 없을 경우 해당 값을 배열로 만들어 cookie에 저장
    else tempSearchTextList = [searchText];

    setTwitchSearchHistory('twitchSearchHistoryList', tempSearchTextList);
    handlerSetHidenResultSearch();

    if (searchText.length <= 0) {
      alert('검색어를 입력하지 않았습니다.'); // eslint-disable-line no-alert
      return;
    }
    // 페이지 이동
    navigate(`/search/${searchText}`);
  };

  const cleanSearchText = () => {
    setSearchText('');
  };

  useGlobalClick({
    id: 'searchBox',
    useClick: true,
    callback: (isSearch: boolean) => {
      if (isSearch) {
        const Items = filterItems(searchText);
        handlerSetShowResultSearch();
        if (Items) setSearchHistoryList(Items);
      } else {
        handlerSetHidenResultSearch();
      }
    },
  });

  return (
    <div className="inline-flex bg-gray-800 w-full items-center  justify-start gap-4  ">
      <div className="text-white ml-3">
        <Link to="/" onClick={cleanSearchText}>
          <h1>Twitch</h1>
        </Link>
      </div>
      <div className="ml-8 mr-8 mb-3">
        <div className="relative">
          <input
            id="searchBox"
            type="text"
            className="border-slate-200"
            onChange={onChangeSearchText}
            value={searchText}
          />
          {showHideResultSearch && (
            <ResultSearch
              setfunc={handlerChangeSearchText}
              inputValue={searchText}
              filterList={searchHistoryList}
            />
          )}
          <button
            type="button"
            className="text-white ml-10 mt-2"
            onClick={handleSearchChannelButton}
          >
            채널 검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
