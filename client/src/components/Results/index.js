import React, { Component } from "react";
import API from "../../utils/API";

class Results extends Component {

    state = {
        savedBooks: [],
    }

    componentDidMount() {
        API.savedBooks()
            .then(savedBooks => this.setState({ savedBooks: savedBooks }))
            .catch(err => console.error(err));
    }

    handleSave = book => {

        if (this.state.savedBooks.map(savedbook => savedbook._id).includes(book._id)) {
            API.deleteBook(book._id)
                .then(deletedBook => this.setState({
                    savedBooks: this.state.savedBooks
                        .filter(book => book._id !== deletedBook._id)
                }))
                .catch(err => console.error(err));
        } else {
            API.saveBook(book)
                .then(savedBook => this.setState({
                    savedBooks: this.state.savedBooks.concat([savedBook])
                }))
                .catch(err => console.error(err));
        }
    }

    render() {
        return (
            <div className="container">
                {!this.props.books.length ? (
                    <h1 className="text-center">No Results to Display</h1>
                ) : (
                        <div>
                            {this.props.books.map(result => (
                                <div className="card mb-3" key={result._id}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <ul>
                                                <li className="card-title">{result.title}</li>
                                                <li className="card-title">Written by {result.authors}</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="Btn">
                                                <a href={result.link} className="btn badge-pill btn-outline-dark mt-3" target="_blank" >View</a>
                                                <button onClick={() => this.handleSave(result)} className="btn badge-pill btn-outline-warning mt-3 ml-3" >
                                                    {this.state.savedBooks.map(book => book._id).includes(result._id) ? "Delete" : "Save"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img alt={result.title} className="img-fluid" src={result.image} />
                                        </div>
                                        <div className="col-md-9">
                                            <div className="card-body">
                                                <p className="card-text">{result.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        )
    }
}

export default Results;
