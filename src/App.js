import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BookShelf from "./bookShelf"
import Search from "./search"
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {

  state = {
    myBooks: [],
    searchKeywords: '',
    foundBooks: [],
    shelves:{
      currentlyReading: 'currentlyReading',
      wantToRead: 'wantToRead',
      read:'read'},
   }

   componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
       this.setState({myBooks})
     });
   }

   //update books in API
   updateBookShelf = (book, event) => {
     BooksAPI.update(book, event).then(result => {
       BooksAPI.getAll().then(myBooks => {
         this.setState({myBooks})
       });
   })
   }

   updateBookShelfSearch = (book, event) => {
     BooksAPI.update(book, event).then(result => {
       BooksAPI.getAll().then(myBooks => {
         this.setState({myBooks})
       });
   })
    window.history.back();
   }

   search = (searchKeywords) => {
     this.setState({searchKeywords: searchKeywords.trim() })
     console.log(searchKeywords)
     BooksAPI.search(searchKeywords).then((foundBooks) => {
       this.setState({foundBooks})
       this.setState((state) => ({
       }))
     })
     .catch((e) =>
     {console.log('error ' + e)}
     )
   }

   checkShelf = (bookId, shelf) => {
     for( var i = 0; i < this.state.myBooks.length; i++) {
       if(this.state.myBooks[i].id === bookId) {
         let result = this.state.myBooks[i].shelf;
         return result;
       }
     }
   };

  render() {
    return (
      <div className="app">

      <Route exact path="/search" render={() => (
        <Search books={this.state.myBooks} updateBookShelf={this.updateBookShelf} updateBookShelfSearch={this.updateBookShelfSearch} searchKeywords={this.state.searchKeywords} search={this.search} foundBooks={this.state.foundBooks} checkShelf={this.checkShelf}/> )} />

      <Route exact path="/" render={() =>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf books={this.state.myBooks} updateBookShelf={this.updateBookShelf} updateBookShelfSearch={this.updateBookShelfSearch} />
            </div>
          </div>
          <div className="open-search">
            <Link to='/search' >Add a book</Link>
          </div>
        </div>
      } />
      </div>
    )
  }
}

export default BooksApp
