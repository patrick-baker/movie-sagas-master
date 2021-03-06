import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
// material ui imports
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class MovieCard extends Component {

    handleLearnMoreClick = (id) => {
        this.props.dispatch({ type: 'FETCH_DETAILS', payload: id }); // fetches details of chosen movie from database with fetchMovieDetailsSaga
        console.log(id);
        this.props.history.push('/details')
    }

    render() {
        return (
            <Card style={{ maxWidth: this.props.cardWidth }} className="card">
                <CardActionArea>
                    <CardMedia
                        style={{ height: this.props.imageHeight }}
                        image={this.props.poster}
                        title={this.props.title}
                    />
                    <CardContent style={{maxHeight: this.props.textHeight}}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.title}
                        </Typography>
                        <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        component="p"
                        >
                            {this.props.description}
                            {
                                // renders genres onto DOM if details reducer contains data
                                this.props.movieDetails && this.props.movieDetails.genres && 
                            <>
                            <br />
                            <br />
                            <b>GENRES:</b>
                            <ul>
                                {this.props.movieDetails.genres.map(genre => <li>{genre}</li>)}
                            </ul>
                            </>
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {this.props.showEditButton && // renders edit button of showEditButton prop is set to true
                        <Button size="small" variant="contained" color="primary" onClick={() => this.props.history.push('/edit')}>
                        Edit
                        </Button>
                    }
                    {this.props.clickId && // renders learnMore button if clickID prop set to true
                        <Button size="small" variant="contained" color="primary" onClick={() => this.handleLearnMoreClick(this.props.clickId)}>
                        Learn More
                        </Button>
                    }
                </CardActions>
            </Card>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default withRouter(connect(mapReduxStateToProps)(MovieCard));
