import React from 'react'
import FileUpload from './components/FileUpload'
import Archive from './components/Archive'
import './App.css';

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        File Archive
      </header>
      <Archive />
      <FileUpload />
    </div>
  )
}

export default App
