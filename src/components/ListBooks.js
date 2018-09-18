import React from 'react'
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import Bookshelf from './Bookshelf.js'

class ListBooks extends React.Component {
  state = {
    books: [],
    crBooks:[],
    wtrBooks:[],
    rBooks:[]
  }
  constructor(props) {
    super(props)

    this.handleStateUpdate = this.handleStateUpdate.bind(this)
  }

  handleStateUpdate(){
    console.log("Should be rerendering!!!");
    BooksAPI.getAll().then((apiBooks) => this.setState({
      books:apiBooks,
      crBooks: apiBooks.filter(book => book.shelf === "currentlyReading"),
      wtrBooks: apiBooks.filter(book => book.shelf === "wantToRead"),
      rBooks: apiBooks.filter(book => book.shelf === "read")
    },()=>{
      console.log("State has been set!");
    }))
  }

  componentWillMount() {
    BooksAPI.getAll().then((apiBooks) => {
      console.log("Setting initial state full of books!");
      this.setState({
        books:apiBooks,
        crBooks: apiBooks.filter(book => book.shelf === "currentlyReading"),
        wtrBooks: apiBooks.filter(book => book.shelf === "wantToRead"),
        rBooks: apiBooks.filter(book => book.shelf === "read")
      },()=>{
        console.log("List Of Books rendered!");
      });
    },(err)=>{
      console.log("Promise Errd");
    });
  }

  render(){
    console.log("Rendering List of Books!!");
    console.log(this.state.crBooks);
    return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf shelfTitle="Currently Reading" updateBookState={this.handleStateUpdate}  books={this.state.crBooks}  />
          <Bookshelf shelfTitle="Want to Read" updateBookState={this.handleStateUpdate}  books={this.state.wtrBooks} />
          <Bookshelf shelfTitle="Read" updateBookState={this.handleStateUpdate}  books={this.state.rBooks} />
        </div>
      </div>
    </div>
  )
  };
}

export default ListBooks
