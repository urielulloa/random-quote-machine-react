const quoteURL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const tweetIntent = "https://twitter.com/intent/tweet?text=";

import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      quotes: [],
      authors: [],
      tweetLink: ""
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getRandomQuote() {
    const quotes = this.state.quotes;
    const authors = this.state.authors;
    const index = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[index];
    const newAuthor = authors[index];
    this.setState({
      quote: newQuote,
      author: newAuthor
    });
    this.createTweetURI(newQuote, newAuthor);
  }
  createTweetURI(quote, author) {
    this.setState({
      tweetLink: tweetIntent + encodeURIComponent('"' + quote + '" - ' + author)
    });
  }
  handleClick() {
    this.getRandomQuote();
  }
  componentDidMount() {
    fetch(quoteURL)
      .then(response => response.json())
      .then(responseJson => {
        return (
          this.setState({
            quotes: responseJson.quotes.map(a => a.quote),
            authors: responseJson.quotes.map(a => a.author)
          }),
          this.handleClick()
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <div class="app">
        <div class="quote-box">
          {this.state.quote === "" ? (
            <div class="text-box">
              <p />
            </div>
          ) : (
            <div class="text-box">
              <p class="quotation" id="text">
                {this.state.quote}
              </p>
              <p class="author" id="author">
                - {this.state.author}
              </p>
            </div>
          )}
          <br />
          <br />
          <a
            class="twitter-share-button"
            title="Tweet this quote!"
            href={this.state.tweetLink}
            target="_blank"
          >
            <i class="fa fa-twitter" />
          </a>
          <button
            class="new-quote"
            title="Click here for a new quote."
            onClick={this.handleClick}
          >
            new quote
          </button>
        </div>
        <div class="footer">
          by&nbsp;
          <a href="https://github.com/urielulloa" target="_blank">
            Uriel Ulloa
          </a>
        </div>
      </div>
    );
  }
}
