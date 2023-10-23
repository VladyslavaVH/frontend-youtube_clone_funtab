import React, {useEffect} from "react";
import {useParams} from 'react-router-dom';
import { connect } from "react-redux";

const Category = (props) => {
    
    const {category} = useParams();
    return <div>Category: {category}</div>;
};

let mapStateToProps = (state) => {
    return {
        
    }
};

export default connect(mapStateToProps,
    {  }
)(Category);