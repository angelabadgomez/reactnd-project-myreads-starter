import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import BooksApp from './App'

      const BookShelf = ({ books, updateBookShelf }) => {
        const currentlyReading = books.filter((book) => (book.shelf === 'currentlyReading'));
        const wantToRead = books.filter((book) => (book.shelf === 'wantToRead'));
        const read = books.filter((book) => (book.shelf === 'read'));
        return (
          <div className="bookshelf"  >
            <Shelf books={currentlyReading} title='Currently reading' updateBookShelf={updateBookShelf} />
            <Shelf books={wantToRead} title='Want to read' updateBookShelf={updateBookShelf} />
            <Shelf books={read} title='Read' updateBookShelf={updateBookShelf} />
          </div>
        )
      };

export default BookShelf
