import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './bookShelf'
import BooksApp from './App'

  const Shelf = ({ books, title, updateBookShelf }) => {
    return (
        <div>
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.map((book) => {
                  const { id, imageLinks, shelf, title, authors } = book;
                  const thumbnail = imageLinks ? imageLinks.smallThumbnail : '';
                    return (
                      <li key={id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }} />
                            <div className="book-shelf-changer">
                              <select defaultValue={shelf} onChange={(event)=>{updateBookShelf(book, event.target.value); }} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
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
          </div>
        </div>
    )
  }

export default Shelf
