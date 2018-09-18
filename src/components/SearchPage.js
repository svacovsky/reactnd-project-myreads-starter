import React from 'react'
import * as BooksAPI from '../BooksAPI'
import '../App.css'
import Book from './Book.js'

class SearchPage extends React.Component {

  state = {
    books:[],
    searchTerm:''
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    const value = e.target.value;
    if(value === ''){
      this.setState({
        books:[],
        searchTerm:''
      })
    }else{
      BooksAPI.search(value).then((apiBooks) => {
        console.log(apiBooks);
        if('error' in apiBooks){
          this.setState({
            books:[],
            searchTerm:''
          })
        }else{
          this.setState({
            books:apiBooks,
            searchTerm:value
          },()=>{
            console.log("State has been set!");
          })
        }
      },(err)=>{
        console.log("no results");
        this.setState({
          books:[],
          searchTerm:''
        })
      })
    }
  }

  render(){
    return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" href="/">Close</a>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" placeholder="Search by title or author" onChange={this.handleChange}/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {this.state.books.map(book => (
          <li><Book book={book} /></li>
        ))}
        </ol>
      </div>
    </div>
    )
  };
}

export default SearchPage
