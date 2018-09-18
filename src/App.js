import React from 'react'
import './App.css'
import SearchPage from './components/SearchPage.js'
import ListBooks from './components/ListBooks.js'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        {window.location.pathname==='/search' ? (
          <SearchPage />
        ) : (
          <ListBooks />
        )}

        <div className="open-search">
          <a href="/search">Add a book</a>
        </div>
      </div>
    )
  }
}

export default BooksApp
