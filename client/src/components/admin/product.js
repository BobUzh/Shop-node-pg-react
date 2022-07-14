import React from "react";

import './admin.scss';


const Product = () => {
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
                        <label htmlFor="category">category</label>
                        <select id="category" name="category">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className="group_item">
                        <label htmlFor="price">price</label>
                        <input id="price" type="price" placeholder="price" name="price"/>
                    </div>
                </div>
                <div className="row_group">
                    <div className="group_item">
                        <label htmlFor="img">img</label>
                        <input id="img" type="img" placeholder="img" name="img"/>
                    </div>
                </div>
                <div className="row_group">
                    <div className="group_item">
                        <label htmlFor="description">description</label>
                        <textarea id="description" placeholder="description" name="description"/>
                    </div>
                </div>
                <div className="row_group btn">
                    <button className="btn_send" type="button" onClick={submit}>Send</button>
                </div>
            </div>
        </div>
    )
};

export default Product;