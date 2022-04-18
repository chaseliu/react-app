import React, { Fragment, useContext, useReducer } from 'react';
import { Button, Container } from 'react-bootstrap';
import { ThemeContext } from '../App';



interface CounterState {
  count: number
}

interface Action {
  type: string,
  payload?: object
}

function reducer(state: CounterState, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      throw new Error();
  }
}

export default function Counter(props: CounterState) {
  const [state, dispatch] = useReducer(reducer, {...props});

  const theme = useContext(ThemeContext);

  return (
    <Fragment>
      <h2>Counter</h2>
      <p>You clicked {state.count} times</p>
      <Button onClick={() => dispatch({ type: 'DECREMENT' })}>-</Button>{' '}
      <Button variant={theme.name} onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </Button>{' '}
      <Button onClick={() => dispatch({ type: 'INCREMENT' })}>+</Button>
    </Fragment>
  );
};
