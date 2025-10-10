import React from 'react'

function App() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Hello React!</h1>
      <p>Welcome to your first React application</p>
      <button onClick={() => alert('Hello from React!')}>
        Click me!
      </button>
    </div>
  )
}

export default App