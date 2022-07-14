import React from "react";

import './crud.scss';

const Crud = (props) => {
    const { cls, isActive } = props;

    let style = cls;
    style += isActive ? ' show' : ' hidden';

    return (
        <div className={'crud ' + style}>
            <span className="active">all</span>
            <span>create</span>
            <span>edit</span>
        </div>
    )
};

export default Crud;