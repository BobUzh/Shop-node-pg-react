import React from "react";

import './admin.scss';


const Category = () => {
    const submit = () => {

    };

    return (
        <div className="categories">
            <div className="categories_form">
                <div className="row_group">
                    <div className="group_item">
                        <label htmlFor="name">name</label>
                        <input id="name" type="text" placeholder="name" name="name"/>
                    </div>
                    <div className="group_item">
                        {/*<div className="">*/}
                            <div className="group_item">
                                <label htmlFor="code">code</label>
                                <input id="code" type="code" placeholder="code" name="code"/>
                            </div>
                            <div className="group_item">
                                <label htmlFor="parent_code">parent_code</label>
                                <input id="parent_code" type="" placeholder="parent_code" name="parent_code"/>
                            </div>
                        {/*</div>*/}
                    </div>
                </div>
                <div className="row_group group_item">
                    <label htmlFor="description">description</label>
                    <textarea id="description" placeholder="description" name="description"/>
                </div>
                <div className="row_group btn">
                    <button className="btn_send" type="button" onClick={submit}>Send</button>
                </div>
            </div>
        </div>
    )
};

export default Category;