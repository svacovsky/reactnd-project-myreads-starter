import React from 'react'
import '../App.css'
import Book from './Book.js'

class BookShelf extends React.Component {
  state = {
    books:[]
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      books: nextProps.books
    },()=>{
      console.log(this.state.books);
    })
  }

  render(){
    console.log("Rendering Bookshelf!!");
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}><Book updateBookState={this.props.updateBookState} book={book} /></li>
            ))}
            </ol>
          </div>
        </div>
      )
  }
}

export default BookShelf
