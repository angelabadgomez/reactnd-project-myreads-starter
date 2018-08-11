import React from 'react'
import './App.css'
import BookShelf from "./bookShelf"
import Search from "./search"
import { Route, Link } from 'react-router-dom'


class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
      <Route exact path="/search" component={Search} />

      <Route exact path="/" render={()=> (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
          <div>
            <BookShelf />
          </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      )} />
      </div>
    )
  }
}

export default BooksApp
