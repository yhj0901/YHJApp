import React from 'react';
import { Link } from 'react-router-dom';
import ResultNonItem from './ResultNonItem';

interface PropTypes {
  setfunc(data: string): void;
  filterList: string[];
  inputValue: string;
}

const ResultSearch = (props: PropTypes) => {
  const { filterList, inputValue, setfunc } = props;

  const handleInputValse = (e: any) => {
    console.log('handleInputValse : ', e.target.innerHTML);
    setfunc(e.target.innerHTML);
  };

  return (
    <div className="bg-slate-800 w-80 absolute top-[37px] left-0 z-40">
      {filterList.length === 0 ? (
        inputValue.length > 0 && <ResultNonItem />
      ) : (
        <>
          {Array.isArray(filterList) ? (
            filterList.map(item => {
              return (
                <li className="list-none mb-2 mt-1">
                  <button type="button" onClick={handleInputValse}>
                    <h3 className="text-white">{item}</h3>
                  </button>
                </li>
              );
            })
          ) : (
            <div>
              <h3>{filterList}</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultSearch;
