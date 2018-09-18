import React from 'react'
import * as BooksAPI from '../BooksAPI'
import '../App.css'

class Book extends React.Component {

updateBookStatus(book, e){
  BooksAPI.update(book, e.target.value).then(()=>{
    if('updateBookState' in this.props){
      this.props.updateBookState();
    }
  });
}


  render() {
    let thumbnail = '';
    let shelf = 'none';
    if(typeof this.props.book.imageLinks !== 'undefined'){
      thumbnail = this.props.book.imageLinks.thumbnail;
    }
    if(typeof this.props.book.shelf !== 'undefined' ){
      shelf = this.props.book.shelf;
    }
    return (
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
              <div className="book-shelf-changer">
                <select value={shelf} onChange={(e) => this.updateBookStatus(this.props.book, e)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading" >Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors}</div>
          </div>
    )

  }
}

export default Book
