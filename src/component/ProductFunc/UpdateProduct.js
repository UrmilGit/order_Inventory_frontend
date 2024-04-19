import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const navigate = useNavigate();
    const { cid } = useParams();
    const [formData, setFormData] = useState({ productId: 0, productName: '', unitPrice: '', colour: '', brand: '', size: '', rating: '' });


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmitForm = async (e) => {
        e.preventDefault();


        const response = await axios.put('http://localhost:8085/api/v1/products/update', formData)
        navigate('/all/products');

    };

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:8085/api/v1/products/prod/${cid}`)
        setFormData(response.data);
    }

    useEffect(() => {
        getProductById()
    }, [])

    return (
        <div style={{ backgroundColor: '#e7eaf6', width: '100%' }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>
                <div className="form-container" style={{
                    backgroundColor: '#a2a8d3',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    width: '400px'
                }}>
                    <h2 className="header" style={{
                        color: 'black',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>Update:</h2>

                    <form onSubmit={handleSubmitForm}>
                        <div className="form-group" >
                            <label className="label" style={{
                                display: 'block',
                                fontWeight: 'bold', marginBottom: '5px'
                            }}>Name:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                name="productName"
                                className="input"
                                value={formData.productName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label" style={{
                                display: 'block',
                                fontWeight: 'bold', marginBottom: '5px'
                            }}>Unit Price:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                name="unitPrice"
                                className="input"
                                value={formData.unitPrice}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label" style={{
                                display: 'block',
                                fontWeight: 'bold', marginBottom: '5px'
                            }}>Colour:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                name="colour"
                                className="input"
                                value={formData.colour}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label" style={{
                                display: 'block',
                                fontWeight: 'bold', marginBottom: '5px'
                            }}>Brand:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                name="brand"
                                className="input"
                                value={formData.brand}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label" style={{
                                display: 'block',
                                fontWeight: 'bold', marginBottom: '5px'
                            }}>Size:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                name="size"
                                className="input"
                                value={formData.size}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label" style={{
                                display: 'block',
                                fontWeight: 'bold', marginBottom: '5px'
                            }}>Rating:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                name="rating"
                                className="input"
                                value={formData.rating}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <button style={{
                            backgroundColor: '#38598b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            width: '100%',
                            marginTop: '20px'
                        }} type="submit" className="button" onClick={(e) => handleSubmitForm(e)}>Update</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;


