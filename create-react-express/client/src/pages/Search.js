import React, { Component } from "react";
import { SaveBtn, ViewBtn } from "../components/Btn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    books: [],
    query: "",
    title: "",
    authors: "",
    description: "",
    image: "",
    link: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", authors: "", description: "", image: "", link: "" })
      )
      .catch(err => console.log(err));
  };

  getBook = id => {
    API.getBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  saveBook = bookData => {
    API.saveBook(bookData)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.getBooks({
        title: this.state.title,
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h3>Search for and Save Book of Interest</h3>
            </Jumbotron>

            <form>
              <h3>Book Search</h3>
              <h5>Book</h5>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <p>Test: {this.state.title}</p>

              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>

            {this.state.books.length ? (
              <List>
                <h3>Results</h3>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <h3>
                        {book.title}
                      </h3>
                      <h5> Written by {book.authors} </h5>
                      <h5> Link {book.link} </h5>
                      <img src={book.image}></img>
                      <p> {book.description} </p>
                    </Link>
                    <ViewBtn onClick={() => this.getBook(book._id)} />
                    <SaveBtn onClick={() => this.saveBook(book.title, book.authors, book.link, book.image, book.description)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
