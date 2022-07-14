import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';

import './page.scss';

import Category from "../components/admin/category";
import Product from "../components/admin/product";
import Crud from "../components/crud/crud";

const AdminPage = () => {
    const [active, setActive] = useState(CATEGORIES);

    function isActive(name) {
        return name === active;
    }

    const activeIComponent = (name) => {
        switch (name) {
            case PRODUCTS: return <Product/>;
            case CATEGORIES: return <Category/>;

            default: return <h1>oops</h1>;
        }
    };

    return (
        <div className="admin">
            <div className="nav">
                <ul>
                    <div>
                        <li
                            className={isActive(CATEGORIES) && 'active'}
                            onClick={() => setActive(CATEGORIES)}
                        >Categories</li>
                        <Crud cls="category" isActive={isActive(CATEGORIES)}/>
                    </div>
                    <div>
                        <li
                            className={isActive(PRODUCTS) && 'active'}
                            onClick={() => setActive(PRODUCTS)}
                        >Products</li>
                        <Crud cls="product" isActive={isActive(PRODUCTS)}/>
                    </div>
                </ul>
            </div>
            { activeIComponent(active) }
        </div>
    );
};

export default AdminPage;
