import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { apiConfig } from '../../msal/MsalConfig'
import { Link } from 'react-router-dom';

import { msalAuth } from '../../msal/MsalAuthProvider'

const Home = () => {
  const [products, setProduct] = useState([]);
  const [token, setToken] = useState("");
  const product = "/product/";

  async function fetchData() {
    var accessToken = null;
    const accessTokenRequest = {
      scopes: apiConfig.resourceScopes
    }
    try {
      accessToken = await msalAuth.acquireTokenSilent(accessTokenRequest);
      setToken(accessToken.accessToken);
      loadProducts(accessToken.accessToken);
    }
    catch (error) {
      console.log("AquireTokenSilent failure");
      accessToken = await msalAuth.acquireTokenPopup(accessTokenRequest);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const loadProducts = async (token1) => {
    // const product = "/product/";
    const api = apiConfig.resourceUri + `${product}`;
    const result = axios.get(api, { headers: { "Authorization": `Bearer ${token1}` } });
    result.then(res => {
      // console.log(res.data);
      setProduct(res.data.reverse());
    });
    result.catch((error) => {
      console.log(error)
    });
  };

  const deleteUser = async id => {
    const api = apiConfig.resourceUri + `${product}`;
    const deleteApi = api + `${id}`;
    const result = axios.delete(deleteApi, { headers: { "Authorization": `Bearer ${token}` } });
    result.then(res => {
      // console.log(res.data);
      loadProducts(token);
    });
    result.catch((error) => {
      console.log(error)
    });
  }

  return (
    <div className='container'>
      <div className='py-4'>
        <div className='addUserBtn'>
          <Link className='btn btn-outline-primary' to='/products'>Add Product</Link>
        </div>
        <table className="table boarder shadow">
          <thead className='thead-dark'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Description</th>
              <th scope="col">Units</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product, index) => (
                <tr key={product.id}>
                  <th scope="row"> {index + 1}</th>
                  <td>{product.productName}</td>
                  <td>{product.productDescription}</td>
                  <td>{product.units}</td>
                  <td>
                    <Link className='btn btn-primary mr-2' to={`/products/${product.id}`}>View</Link>
                    <Link className='btn btn-outline-primary mr-2' to={`/products/edit/${product.id}`}>Edit</Link>
                    <Link className='btn btn-danger mr-2' to="/" onClick={() => deleteUser(product.id)}>Delete</Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;