import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import * as BooksApp from './App'
import { Link, Route } from 'react-router-dom'

  const Search = ({ books, updateBookShelfSearch, searchKeywords, search, foundBooks, checkShelf }) => {
    const searchValidation = searchKeywords;
    return (
      <div className="search-books">
        <div>
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" defaultValue={searchKeywords} onChange= {(event) => search(event.target.value)}/>
            </div>
          </div>
          <div className="search-books-results">
          {searchValidation.length < 1 || foundBooks === null  || foundBooks === undefined || typeof foundBooks.map === 'undefined'  ?  (
            <span>Still nothing found</span>
          ) : (
              <ol className="books-grid">
              {foundBooks.map((foundBook) => {
                let { id, imageLinks, shelf, title, authors } = foundBook;
                const thumbnail = imageLinks ? imageLinks.smallThumbnail : '';
                return (
                  <li key={id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }} />
                        <div className="book-shelf-changer">
                          <select defaultValue={checkShelf(id, shelf) } onChange={(event)=>{updateBookShelfSearch(foundBook, event.target.value); }} >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option selected value="none">None</option>
                          </select>
                        </div>
                        </div>
                        <div className="book-title">{title}</div>
                        <div className="book-authors">{authors}</div>
                    </div>
                  </li>
                );
              })}
              </ol>
            )
          }
          </div>
        </div>
      </div>
    )
  };

export default Search
