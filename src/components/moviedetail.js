import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie.movie_reviews) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                        <ListGroupItem>
                            <p>Actors</p>
                            <p><b>{this.props.selectedMovie.actorOne}</b></p>
                            <p><b>{this.props.selectedMovie.actorTwo}</b></p>
                            <p><b>{this.props.selectedMovie.actorThree}</b></p>

                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.movie_reviews.map((review, i) =>
                        <p key ={i}>
                            <b>{review.name}</b>&nbsp; {review.review}
                            &nbsp; <BsStarFill /> {review.rating}
                        </p>
                        )}
                    </Card.Body>
                    <iframe title={"dummyframe"} name={"dummyframe"} id={"dummyframe"}/>
                    <form id={"review form"} action={`https://csc3916assignment4.herokuapp.com/reviews?title=${this.props.selectedMovie.title}&token=${localStorage.getItem("token")}`} method={"post"} target={"dummyframe"}>
                        <label>Enter Your Review</label>
                        <input type={"text"} id={"review"} name={"review"}/>
                        <label>Enter Number Of Stars Out Of Five</label>
                        <input type={"text"} id={"rating"} name={"rating"}/>
                        <input type={"submit"} value={"Submit"} />

                    </form>



                </Card>
            )
        }

        return (
            <DetailInfo />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);

