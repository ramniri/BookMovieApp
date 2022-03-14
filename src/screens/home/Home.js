import React from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import BookShow from "../../screens/bookshow/BookShow"

const Home = (props) => {
return(
    <div>
       <Header baseUrl={props.baseUrl} />

    </div>
)

};

export default Home;