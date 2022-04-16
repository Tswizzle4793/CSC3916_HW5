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
            if (!this.props.selectedMovie.msg) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.msg.imageUrl} thumbnail />
                    </Card.Body>
                    <ListGroup>
                        <ListGroupItem>{this.props.selectedMovie.msg.title}</ListGroupItem>
                        <ListGroupItem>
                            <p>Actors</p>
                            <p><b>{this.props.selectedMovie.msg.actorOne}</b></p>
                            <p><b>{this.props.selectedMovie.msg.actorTwo}</b></p>
                            <p><b>{this.props.selectedMovie.msg.actorThree}</b></p>

                        </ListGroupItem>
                        <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.movRating.avgRating}</h4></ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        {this.props.selectedMovie.msg.movie_reviews.map((review, i) =>
                        <p key ={i}>
                            <b>{review.name}</b>&nbsp; {review.review}
                            &nbsp; <BsStarFill /> {review.rating}
                        </p>
                        )}
                    </Card.Body>
                    <iframe title={"dummyframe"} name={"dummyframe"} id={"dummyframe"}/>
                    <form id={"review form"} action={`https://csc3916assignment4.herokuapp.com/reviews?title=${this.props.selectedMovie.msg.title}&token=${localStorage.getItem("token")}`} method={"post"} target={"dummyframe"}>
                        <label>Enter Your Review</label>
                        <p><input type={"text"} id={"review"} name={"review"}/></p>
                        <label>Enter Number Of Stars Out Of Five</label>
                       <p> <input type={"text"} id={"rating"} name={"rating"}/></p>
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

