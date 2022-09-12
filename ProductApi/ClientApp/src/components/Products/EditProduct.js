import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiConfig } from '../../msal/MsalConfig'
import { msalAuth } from '../../msal/MsalAuthProvider'

const EditProduct = () => {
    let history = useHistory();
    const { id } = useParams();
    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        units: ""
    });

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

    const { productName, productDescription, units } = product;

    const onInputChange = e => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const onInputNumericChange = e => {
        let tValue = e.target.validity.valid ? e.target.value : product.units;
        setProduct({ ...product, [e.target.name]: tValue });
    }

    const onSubmit = async e => {
        e.preventDefault();
        const api = apiConfig.resourceUri + "/" + 'product' + "/" + `${id}`;
        await axios.put(api, product, { headers: { "Authorization": `Bearer ${token}` } });
        history.push("/");
    }

    const loadProduct = async (token1) => {
        const api = apiConfig.resourceUri + "/" + 'product' + "/" + `${id}`;
        const result = await axios.get(api, { headers: { "Authorization": `Bearer ${token1}` } });
        setProduct(result.data);
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <h1>Edit product</h1>
            </div>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text"
                        className="form-control"
                        placeholder="Enter Product Name"
                        name='productName'
                        value={productName}
                        onChange={e => onInputChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text"
                        className="form-control"
                        placeholder="Enter Product Description"
                        name='productDescription'
                        value={productDescription}
                        onChange={e => onInputChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text"
                        pattern="[0-9]*"
                        className="form-control"
                        placeholder="Enter No. Of Units"
                        name='units'
                        value={units}
                        onChange={e => onInputNumericChange(e)} />
                </div>
                <button type="submit" className="btn btn-warning">Update Product</button>
            </form>
        </div>
    )
}

export default EditProduct;