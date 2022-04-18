import React, { useEffect, useState, useReducer } from 'react';

import axios from 'axios';
import { Container } from 'react-bootstrap';

interface Hit {
  objectID: string,
  url: string,
  title: string,
}

interface ReducerState<S> {
  isLoading: boolean,
  isError: boolean,
  data: S,
}

interface Action {
  type: string,
  payload?: any,
}



function dataFetchReducer<S>() {
  return function reducer(prevState: ReducerState<S>, action: Action): ReducerState<S> {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...prevState,
          isLoading: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...prevState,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'FETCH_FAILURE':
        return {
          ...prevState,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  }
};


function useDataApi<S>(initialUrl: string, initialData: S): [ReducerState<S>, React.Dispatch<React.SetStateAction<string>>] {

  const [url, setUrl] = useState(initialUrl);

  const initialState: ReducerState<S> = {
    isLoading: false,
    isError: false,
    data: initialData,
  }

  const [state, dispatch] = useReducer(dataFetchReducer<S>(), initialState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url, { timeout: 1_000 });
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE', payload: error });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };

  }, [url]);

  return [state, setUrl];
}


export default function NewsFeed() {
  const [query, setQuery] = useState('redux');
  const defaultUrl = 'https://hn.algolia.com/api/v1/search?query=redux';
  const [{ data, isLoading, isError }, doFetch] = useDataApi(defaultUrl, { hits: [] });

  return (
    <Container>
      <h2>News Feed</h2>
      <form onSubmit={e => {
        doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);
        e.preventDefault();
      }}>
        <input
          name='query'
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item: Hit) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
