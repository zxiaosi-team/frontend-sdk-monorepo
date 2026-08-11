import { useState } from 'react';

import { name } from '../package.json';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>{name}</h2>

      <button
        type='button'
        className='counter'
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>

      <div className='global-style'>样式隔离</div>
    </>
  );
}

export default App;
