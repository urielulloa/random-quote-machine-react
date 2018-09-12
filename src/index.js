const quoteURL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const tweetIntent = "https://twitter.com/intent/tweet?text=";

import React from "react";
import ReactDOM from "react-dom";

class TwitterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: this.props.quote,
      author: this.props.author
    };
    this.createTweetURI = this.createTweetURI.bind(this);
  }
  createTweetURI() {
    return (
      tweetIntent +
      encodeURIComponent(
        '"' + this.state.quote + '"' + "- " + this.state.author
      )
    );
  }
  render() {
    const tweetLink = this.createTweetURI();
    return (
      <a class="twitter-share-button" href={tweetLink}>
        Tweet
      </a>
    );
  }
}

class App extends React.Component {
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
  }
  createTweetURI() {
    this.setState({
      tweetLink:
        tweetIntent +
        encodeURIComponent('"' + this.state.quote + '" - ' + this.state.author)
    });
  }
  handleClick() {
    this.getRandomQuote();
    this.createTweetURI();
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
      <div>
        {this.state.quote === "" ? (
          <div id="quote-box">
            <p />
          </div>
        ) : (
          <div id="quote-box">
            <p id="text">"{this.state.quote}"</p>
            <p id="author">- {this.state.author}</p>
          </div>
        )}
        <button id="new-quote" onClick={this.handleClick}>
          Get random quote
        </button>
        <br />
        <a class="twitter-share-button" href={this.state.tweetLink}>
          Tweet
        </a>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
