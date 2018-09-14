import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
  state = {

  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .map((book) => (
                <Book
                  id={book.id}
                  key={book.id}
                  title={book.title}
                  author={book.authors ? book.authors[0] : ''}
                  backgroundImage={book.imageLinks ? book.imageLinks.thumbnail : ''}
                  shelf={book.shelf}
                  onChange={this.props.onChange}
                />
              )
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
