import React, {useEffect, useState} from "react";
import { product } from '../api/authApi';

import Spinner from '../components/spiner/spiner';

function Product() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function f() {
            setLoading(true)
            const response = await product();
            console.log(response)
            setProducts(response.data)
            setLoading(false)
        }
        f();
    }, []);
    return (
        <>
        <h1>Product</h1>
            { loading && <Spinner/>}
            {!loading && products.map(e => {
                    return (
                        <>
                            <p key={e.id}>{e.name}</p>
                            <p>{e.description}</p>
                        </>
                    )
                })
            }
        </>
    );
}

export default Product;
