import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class BookShelf extends Component {

  state = {

		myBooks: [],
    shelves:{
        currentlyReading: 'currentlyReading',
        wantToRead: 'wantToRead',
        read:'read'},
   }

  componentDidMount() {
   BooksAPI.getAll().then((myBooks, shelves) => {
      this.setState({myBooks})
      this.setState((state) => ({
       shelves: {
         currentlyReading: state.myBooks.filter((book) => (book.shelf === 'currentlyReading')),
         wantToRead: state.myBooks.filter((book) => (book.shelf === 'wantToRead')),
         read: state.myBooks.filter((book) => (book.shelf === 'read'))
        }
      }))
    })
  }

  //update books in API
  updateBookShelf = (book, event) => {
    BooksAPI.update(book, event).then(result => {
      BooksAPI.getAll().then(myBooks => {
        this.setState({myBooks})
        this.setState((state) => ({
          shelves: {
            currentlyReading: state.myBooks.filter((book) => (book.shelf === 'currentlyReading')),
            wantToRead: state.myBooks.filter((book) => (book.shelf === 'wantToRead')),
            read: state.myBooks.filter((book) => (book.shelf === 'read'))
          }
        }))
      });
    });
  }

  render() {
    return (
        <div>
          <div className="bookshelf"  key='currentlyReading' >
            <h2 className="bookshelf-title">Currently reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.state.myBooks.map((bookShelf) => {
                  if(bookShelf.shelf === 'currentlyReading') {
                    return (
                      <li key={bookShelf.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookShelf.imageLinks.smallThumbnail}")` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={bookShelf.shelf} onChange={(event)=>{this.updateBookShelf(bookShelf, event.target.value); }} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                            </div>
                            <div className="book-title">{bookShelf.title}</div>
                            <div className="book-authors">{bookShelf.authors}</div>
                        </div>
                      </li>
                    )
                  }
                })}
              </ol>
            </div>
          </div>
          <div className="bookshelf" key='wantToRead'>
            <h2 className="bookshelf-title">Want to read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.state.myBooks.map((bookShelf) => {
                  if(bookShelf.shelf === 'wantToRead') {
                    return (
                      <li key={bookShelf.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookShelf.imageLinks.smallThumbnail}")` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={bookShelf.shelf} onChange={(event)=>{this.updateBookShelf(bookShelf, event.target.value); }} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                            </div>
                            <div className="book-title">{bookShelf.title}</div>
                            <div className="book-authors">{bookShelf.authors}</div>
                        </div>
                      </li>
                    )
                  }
                })}
              </ol>
            </div>
          </div>
          <div className="bookshelf" key='read'>
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.state.myBooks.map((bookShelf) => {
                  if(bookShelf.shelf === 'read') {
                    return (
                      <li key={bookShelf.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookShelf.imageLinks.smallThumbnail}")` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={bookShelf.shelf} onChange={(event)=>{this.updateBookShelf(bookShelf, event.target.value); }} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                            </div>
                            <div className="book-title">{bookShelf.title}</div>
                            <div className="book-authors">{bookShelf.authors}</div>
                        </div>
                      </li>
                    )
                  }
                })}
              </ol>
            </div>
          </div>
        </div>
    )
  }
}

export default BookShelf
