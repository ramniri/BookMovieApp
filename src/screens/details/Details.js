import React,{useState, useEffect} from "react";
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './Details.css';
import YouTube from 'react-youtube';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom';

const Details = (props) => {
    
    // const [rating, setRating] = useState(0);
    // const [movie, setMovie] = useState({});
    

    const { classes } = props;
    const [movie, setMovie] = useState("");
    const [posterUrl, setPosterUrl] = useState("");
    const [title, setTitle] = useState("");
    const [genres, setGenres] = useState([]);
    const [duration, setDuration]= useState(0);
    const [releaseDate, setRelaesedDate] = useState("");
    const [rating, setRating] = useState(0);
    const [storyLine, setStoryLine] = useState("");
    const [wikiUrl, setWikiUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [starRating, setStarRating] = useState(0);
    const [artists, setArtists] = useState([]);
   
    async function movieData() {
        const rawResponse = await fetch(props.baseUrl + "movies/" + props.match.params.id,
            {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                },
            });
        const result = await rawResponse.json();
        setMovie(result);
        setPosterUrl(result.poster_url);
    setTitle(result.title);
    setGenres(result.genres);
    setDuration(result.duration);
    setRelaesedDate(result.release_date);
    setRating(result.rating);
    setStoryLine(result.storyline);
    setWikiUrl(result.wiki_url);
    setVideoUrl(result.trailer_url);
    setArtists(result.artists);
    
    }

 
    useEffect(() => {
        movieData();
       
    }, []);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
    };

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    function getYouTubeVideoId() {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;

        let id = videoUrl.match(regExp);
        if (id && id[2].length === 11) {
            return id[2];
        }
    }
    const videoId = getYouTubeVideoId();

    function videoOnReady(e) {
        e.target.playVideoAt(10);
    };
    

    return (
        <div className="details">
            <Header id={props.match.params.id} baseUrl={props.baseUrl} showBookShowButton="true" {...props}/>
            <div className="back">
                <Typography>
                    <Link to="/">  &#60; Back to Home</Link>
                </Typography>
            </div>
            <div className="flex-containerDetails">
                <div className="leftDetails">
                    <img src={posterUrl} alt={title} />
                </div>

                <div className="middleDetails">
                    <div>
                        <Typography variant="headline" component="h2">{title} </Typography>
                    </div>
                    <br />
                    <div>
                        <Typography>
                            <span className="bold">Genres: </span> {genres.join(", ")}
                        </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Duration:</span> {duration} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold">Release Date:</span> {new Date(releaseDate).toDateString()} </Typography>
                    </div>
                    <div>
                        <Typography><span className="bold"> Rating:</span> {rating}  </Typography>
                    </div>
                    <div className="marginTop16">
                        <Typography><span className="bold">Plot:</span> <a href={wikiUrl}>(Wiki Link)</a> {storyLine} </Typography>
                    </div>
                    <div className="trailerContainer">
                        <Typography>
                            <span className="bold">Trailer:</span>
                        </Typography>
                        <YouTube
                            videoId={videoId}
                            opts={opts}
                            onReady={videoOnReady}
                        />
                    </div>
                </div>

                <div className="rightDetails">
                    <Typography>
                        <span className="bold">Rate this movie: </span>
                    </Typography>
                    <Typography>
                    {[...Array(5)].map((star, i)=>{
                            const ratingValue = i+1;
                            return(
                                <label key={i}>
                                    <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={()=>setStarRating(ratingValue)} />

                                    <StarBorderIcon 
                                    className="star"
                                    fontSize="default"
                                    htmlColor={(ratingValue <= starRating) ? "#ffff00":"#000000"} />
                                </label>
                            )
                        })}
</Typography>
                    <div className="bold marginBottom16 marginTop16">
                        <Typography>
                            <span className="bold">Artists:</span>
                        </Typography>
                    </div>
                    <div className="paddingRight">
                        <GridList cellHeight={160} cols={2}>
                            {artists != null && artists.map(artist => (
                                <GridListTile
                                    className="gridTile" datat-value = {artist.wiki_url}
                                    // onClick={artistClickHandler}
                                    key={artist.id}>
                                    <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                    <GridListTileBar
                                        title={artist.first_name + " " + artist.last_name}
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Details;