import React from "react";

import img from './spiner.svg';

const Spinner = () => {
    return (
        <div style={{display: 'flex',width: '100%',height: '100%',justifyContent: 'center',alignItems: 'center'}}>
            <img src={img} alt=""/>
        </div>
    )
};

export default Spinner;
