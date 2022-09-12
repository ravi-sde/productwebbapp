import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { apiConfig } from '../../msal/MsalConfig'
import { msalAuth } from '../../msal/MsalAuthProvider'

const Product = () => {
    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        units: ""
    });

    const { id } = useParams();

    // Gettoken
    const [token, setToken] = useState("");
    var accessToken = null;
    useEffect(() => {
        async function fetchData() {
            const accessTokenRequest = {
                scopes: apiConfig.resourceScopes
            }
            try {
                accessToken = await msalAuth.acquireTokenSilent(accessTokenRequest);
                setToken(accessToken.accessToken);
                loadProduct(accessToken.accessToken);
            }
            catch (error) {
                console.log("AquireTokenSilent failure");
                accessToken = await msalAuth.acquireTokenPopup(accessTokenRequest);
            }
        }
        fetchData();
    }, []);

    const loadProduct = async (token1) => {
        const api = apiConfig.resourceUri + "/" + 'product' + "/" + `${id}`;
        const res = await axios.get(api, { headers: { "Authorization": `Bearer ${token1}` } });
        setProduct(res.data);
    }

    return (
        <div className='container py-4'>
            <Link className='btn btn-primary' to='/'>
                back to Home
            </Link>
            <h1 className='display-4'> Product Id: {id}</h1>
            <hr />

            <ul className='list-group w-50'>
                <li className='list-group-item'>Product Name: {product.productName}</li>
                <li className='list-group-item'>Product Description: {product.productDescription}</li>
                <li className='list-group-item'>Units: {product.units}</li>
            </ul>
        </div>
    )
}

export default Product;