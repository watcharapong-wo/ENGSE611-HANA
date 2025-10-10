import React, { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (count > 0) {
      setMessage(`You clicked ${count} times!`);
    }
  }, [count]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>React Hooks Lab</h1>
      <p>{message}</p>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>
        Reset
      </button>
    </div>
  )
}

export default App