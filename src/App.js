import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route } from 'react-router-dom';
import BookShelf from './BookShelf';
import Book from './Book';

class BooksApp extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        books: [],
        query: '',
        filteredBooks: [],
      }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  onChange = (book, shelf) => {
    if (book.shelf !== 'none') {
      this.setState(state => ({
        books: state.books.map(element => {
          if (element.id === book.id) {
            return {
              ...element,
              shelf,
            };
          }
          return element;
        }),
        filteredBooks: state.filteredBooks.map(element => {
          if (element.id === book.id) {
            return {
              ...element,
              shelf,
            };
          }
          return element;
        })
      }));
      BooksAPI.update(book, shelf);
    } else {
      BooksAPI.get(book.id).then((result) => {
        this.setState(state => {
          state.books.push({ ...result, shelf });
          return {
            books: state.books,
            filteredBooks: state.filteredBooks.map(element => {
              if (element.id === book.id) {
                return {
                  ...element,
                  shelf,
                };
              }
              return element;
            })
          }
        })
        BooksAPI.update(result, shelf);
      })
    }
  }

  updateQuery = (query) => {
    if (query !== '') {
      BooksAPI.search(query).then(result => {
        if (!result.error) {
          this.setState(state => ({
            query: query.trim(),
            filteredBooks: result.map(element => {
              let success = false;
              let existingBook;
              state.books.forEach((book) => {
                if (element.id === book.id) {
                  success = true;
                  existingBook = book;
                }
              });
              return success ? { ...element, shelf: existingBook.shelf } : { ...element, shelf: 'none' }
            })
          }));
        } else {
          this.setState({ query: query.trim(), filteredBooks: []})
        }
      });
    } else {
      this.setState({ query: '', filteredBooks: []})
    }
  }

  handleChange = (event) => {
    this.updateQuery(event.target.value);
  }

  clearState = () => {
    this.setState({ query: '', filteredBooks: []})
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to="/"
                className="close-search"
              >Close</Link>
              <div className="search-books-input-wrapper">
                <input onChange={this.handleChange} type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.filteredBooks.map(book => (
                    <Book
                      id={book.id}
                      author={book.authors ? book.authors[0] : ''}
                      key={book.id}
                      title={book.title }
                      backgroundImage={book.imageLinks ? book.imageLinks.thumbnail :  ''}
                      shelf={book.shelf ? book.shelf : 'none'}
                      onChange={this.onChange.bind(this)}>
                    </Book>
                  ))
                }
              </ol>
            </div>
          </div>
        )}>
        </Route>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  title='Currently Reading'
                  books={this.state.books
                    .filter(book => book.shelf === 'currentlyReading')}
                  onChange={this.onChange.bind(this)}
                />
                <BookShelf
                  title='Want to Read'
                  books={this.state.books
                    .filter(book => book.shelf === 'wantToRead')}
                  onChange={this.onChange.bind(this)}
                />
                <BookShelf
                  title='Read'
                  books={this.state.books
                    .filter(book => book.shelf === 'read')}
                  onChange={this.onChange.bind(this)}
                />
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
                onClick={this.clearState}
              >Add a book</Link>
            </div>
          </div>
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp;
