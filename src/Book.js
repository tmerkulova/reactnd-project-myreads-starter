import React, { Component } from 'react';
import Changer from './Changer';

class Book extends Component {
  render () {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={
                {
                  width: 128,
                  height: 193,
                  backgroundImage: `url("${this.props.backgroundImage}")`
                }
              }>
            </div>
            <Changer
              book={this.props}
              onChange={this.props.onChange}
            />
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.author}</div>
        </div>
      </li>
    )
  }
}

export default Book;
