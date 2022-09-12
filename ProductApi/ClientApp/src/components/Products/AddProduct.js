import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { apiConfig } from '../../msal/MsalConfig'
import { msalAuth } from '../../msal/MsalAuthProvider'

const AddProduct = () => {
    let history = useHistory();

    // const [value, setValue] = useState('');
    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        units: ""
    });

    const { productName, productDescription, units } = product;

    const onInputChange = e => {
        // console.log(e.target.value);
        setProduct({ ...product, [e.target.name]: e.target.value })
    };

    const onInputNumericChange = e => {
        if (e.target.value !== "") {
            let tValue = e.target.validity.valid ? e.target.value : product.units;
            setProduct({ ...product, [e.target.name]: tValue });
        } 
        else {
            let tValue = "";
            setProduct({ ...product, [e.target.name]: tValue });
        }
    }

    const onSubmit = async e => {
        e.preventDefault();
        const api = apiConfig.resourceUri + "/" + 'product';
        let result = await axios.get(api, { headers: { "Authorization": `Bearer ${token}` } });
        let resData = result.data;

        let isUnique = resData.filter(x => x.productName.includes(product.productName)).length ? true : false;
        if (!isUnique) {
            await axios.post(api, product, { headers: { "Authorization": `Bearer ${token}` } });
            history.push("/");
        } else
            alert('Duplicate record');
    }

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
            }
            catch (error) {
                console.log("AquireTokenSilent failure");
                accessToken = await msalAuth.acquireTokenPopup(accessTokenRequest);
            }
        }
        fetchData();
    }, []);

    // const handleChange = e => {
    //     const res = e.target.validity.valid ? e.target.value : value;
    //     setValue(res);

    //     let newArr = { ...product }; // copying the old data array
    //     newArr.units = e.target.value; // replace e.target.value with whatever you want to change it to
    //     setProduct(newArr);
    // }

    return (
        <div className='container'>
            <div className='py-4'>
                <h1>Add product</h1>
            </div>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text"
                        className="form-control"
                        placeholder="Enter Product Name"
                        name='productName'
                        value={productName}
                        onChange={e => onInputChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text"
                        className="form-control"
                        placeholder="Enter Product Description"
                        name='productDescription'
                        value={productDescription}
                        onChange={e => onInputChange(e)} required />
                </div>
                {/* <div className="form-group">
                    <input type="text"
                        pattern="[0-9]*"
                        className="form-control"
                        placeholder="Enter No. Of Units"
                        name='value'
                        value={value}
                        onChange={handleChange} required />
                </div> */}

                <div className="form-group">
                    <input type="text"
                        pattern="[0-9]*"
                        className="form-control"
                        placeholder="Enter No. Of Units"
                        name='units'
                        value={units}
                        onChange={e => onInputNumericChange(e)} required />
                </div>

                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct;