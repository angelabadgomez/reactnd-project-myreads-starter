import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import * as BooksApp from './App'
import { Link, Route } from 'react-router-dom'

class Search extends Component {

  state = {
    searchKeywords: '',
    myBooks: []
  }

  search = (searchKeywords) => {
    this.setState({searchKeywords: searchKeywords.trim() })
    console.log(searchKeywords)
    BooksAPI.search(searchKeywords).then((myBooks) => {
      this.setState({myBooks})
      this.setState((state) => ({
      }))
    })
    .catch((e) =>
    {console.log('error ' + e)}
    )
  }

  // get books from API
  componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({myBooks})
      this.setState((state) => ({
            shelves: {
              currentlyReading: state.myBooks.map((book) => (book.shelf === 'currentlyReading')),
              wantToRead: state.myBooks.map((book) => (book.shelf === 'wantToRead')),
              read: state.myBooks.map((book) => (book.shelf === 'read'))
            }
          }))
    })
  }

  // update books in API
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
    alert('Book added to my collection')
    window.history.back();
  }

  render(){
    const searchValidation = this.state.searchKeywords;
    return (
      <div className="search-books">
      <div>
        <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" defaultValue={this.state.searchKeywords} onChange= {(event) => this.search(event.target.value)}/>
        </div>
      </div>
      <div className="search-books-results">
        {searchValidation.length < 1 || this.state.myBooks === null  || this.state.myBooks === undefined || typeof this.state.myBooks.map === 'undefined'  ?  (
          <span>Still nothing found</span>
        ) : (
        <ol className="books-grid">
          {this.state.myBooks.map((book) =>{
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks === undefined ? (
                      <div className="book-cover"><span>Image cover not available</span></div>
                      ) : (
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                      ) }
                      <div className="book-shelf-changer">
                        {book.shelf === undefined ? (
                            <select defaultValue='none' onChange={(event)=>{this.updateBookShelf(book, event.target.value) } } >
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          ) : (
                            <select defaultValue={book.shelf} onChange={(event)=>{this.updateBookShelf(book, event.target.value) } } >
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          )
                        }
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                    {book.authors === undefined ? (
                      <div className="book-authors">Author not available</div>
                      ) : (
                        <div className="book-authors">{book.authors}</div>
                    )}
                    </div>
                  </li>
                )
              })
            }
        </ol>
        )
        }
        </div></div>
    </div>
    )
  }
}

export default Search
