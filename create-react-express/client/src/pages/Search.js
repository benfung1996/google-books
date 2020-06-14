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
    value: ""
  };

  componentDidMount() {
    this.searchBook();
  }

  displayBook = bookData => {
    return {
      _id: bookData.id,
      title: bookData.volumeInfo.title,
      authors: bookData.volumeInfo.authors,
      description: bookData.volumeInfo.description,
      image: bookData.volumeInfo.imageLinks.thumbnail,
      link: bookData.volumeInfo.previewLink
    }
  }

  searchBook = query => {
    API.searchBook(query)
      .then(res => this.setState({ 
        books: res.data.items
        .map(result => this.displayBook(result)) 
      }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  };

  handleFormSubmit = event => {
    event.preventDefault();
      this.searchBook(this.state.search,
)

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
                search={this.state.search}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <p>Test: {this.state.title}</p>

              <FormBtn
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
