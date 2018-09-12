const quoteURL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      quotes: []
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getRandomQuote() {
    const quotes = this.state.quotes.map(a => a.quote);
    const authors = this.state.quotes.map(a => a.author);
    const index = Math.floor(Math.random() * quotes.length);
    const newQuote = quotes[index];
    const newAuthor = authors[index];
    this.setState({
      quote: newQuote,
      author: newAuthor
    });
  }

  handleClick() {
    this.getRandomQuote();
  }
  componentDidMount() {
    fetch(quoteURL)
      .then(response => response.json())
      .then(responseJson => {
        return this.setState({ quotes: responseJson.quotes.map(a => a) });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.quote === "" ? (
          <div>
            <p />
          </div>
        ) : (
          <div>
            <p>"{this.state.quote}"</p>
            <p>- {this.state.author}</p>
          </div>
        )}
        <button onClick={this.handleClick}>Get random quote</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
