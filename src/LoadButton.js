import React from 'react';

export const LoadButton = ({onClickAction, loading, result, error}) => {
  return (
    <div>
      <button onClick={() => onClickAction(0)} disabled={loading}>
        {loading ? 'loading' : 'click me (success)!'}
      </button>
      <button onClick={() => onClickAction(1)} disabled={loading}>
        {loading ? 'loading' : 'click me (error)!'}
      </button>
      <div>Result: {result}</div>
      <div>Error: {error}</div>
    </div>
  );
}