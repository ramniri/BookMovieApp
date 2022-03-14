import React from "react";
import "./Details.css";
import Header from "../../common/header/Header";


const Details =(props) => {

    return(
        <div>
            <Header id={props.match.params.id} baseUrl={props.baseUrl} showBookShowButton="true"/>
        </div>
    )
};

export default Details;