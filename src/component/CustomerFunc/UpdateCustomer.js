import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCustomer() {
    const navigate = useNavigate();
    const { cid } = useParams();
    const [formData, setFormData] = useState({ customerId: '', fullName: '', emailAddress: '' });


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getCustomerById = async () => {
        const response = await axios.get(`http://localhost:8085/api/v1/customers/cust/${cid}`)
        setFormData(response.data);
    }
    
    const handleSubmitForm = async (e) => {
        e.preventDefault();


        const response = await axios.put('http://localhost:8085/api/v1/customers/', formData)
        navigate('/all');

    };

    const handleBack = () => {
        navigate('/customers');
    };

    useEffect(() => {
        getCustomerById()
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
                        <div className="form-group">
                            <label className="label" style={{
                                display: 'block',
                                fontWeight: 'bold', marginBottom: '5px'
                            }}>Name:</label>
                            <input
                                style={{ width: '100%' }}
                                type="text"
                                name="fullName"
                                className="input"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label" style={{
                                display: 'block',
                                fontWeight: 'bold', marginBottom: '5px'
                            }}>Email:</label>
                            <input
                                style={{ width: '100%' }}
                                type="email"
                                name="emailAddress"
                                className="input"
                                value={formData.emailAddress}
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
            <div style={{ textAlign: 'center' }}>
                <button onClick={handleBack} className="btn btn-primary" style={{ marginRight: '10px', backgroundColor: '#38598b', marginTop: '20px' }}>Back to Customers</button>
            </div>
        </div>
    );
}

export default UpdateCustomer;





