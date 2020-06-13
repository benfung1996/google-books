import React, { Component } from "react";
import { DeleteBtn, ViewBtn } from "../components/Btn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Saved extends Component {
  state = {
    books: [],
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

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
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

            {this.state.books.length ? (
              <List>
                <h3>Results</h3>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title}
                      </strong>
                      <h3> Written by {book.authors} </h3>
                      <h3> Link {book.link} </h3>
                      <img src={book.image}></img>
                      <p> {book.description} </p>
                    </Link>
                    <ViewBtn onClick={() => this.getBook(book._id)} />
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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

export default Saved;
