
import React, { useEffect, useState } from 'react';
//import '../css files/update.css'; // Import the CSS file
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
 
function UpdateOrder() {
    const navigate=useNavigate();
    const {orderId}=useParams();
    const [formData, setFormData] = useState({ orderStatus: '' });
   
 
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]:e.target.value });
    };
 
 
    const handleSubmitForm = async(e) => {
        e.preventDefault();
        const response = await axios.put('http://localhost:8085/api/v1/orders/', formData)
        navigate('/order-details');
       
    };
 
    const getOrderById=async()=>{
        const response=await axios.get(`http://localhost:8085/api/v1/orders/orderid/${orderId}`)
        setFormData(response.data);
    }
 
    useEffect(()=>{
      getOrderById()
    },[])
 
    return (
        <div style = {{ backgroundColor: '#e7eaf6' , width:'100%'}}>
        <div className="container" style={{display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 height: '100vh',
                 }}>
            <div className="form-container"  style = {{ backgroundColor: '#a2a8d3',
     borderRadius: '10px',
     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
     padding: '20px',
     width: '400px'}}>
                <h2 className="header" style = {{   color: 'black',
    textAlign: 'center',
   marginBottom: '20px'}}>Update:</h2>
               
                    <form onSubmit={handleSubmitForm}>
                        <div className="form-group" style={{display: 'block',
    fontWeight: 'bold' ,  marginBottom: '5px'}}>
                            <label className="label">Order Status:</label>
                            <input
                                type="text"
                                name="orderStatus"
                                className="input"
                                value={formData.orderStatus}
                                onChange={(e)=>handleInputChange(e)}
                            />
                        </div>
                        <button style={{backgroundColor:'#38598b',
     color: 'white',
     border: 'none',
     borderRadius: '5px',
     padding: '10px 20px',
     cursor: 'pointer',
     fontSize: '16px',
     width: '100%',
     marginTop:'20px'}} type="submit" className="button" onClick={(e)=>handleSubmitForm(e)}>Update</button>
                    </form>
               
            </div>
        </div>
        </div>
    );
}
 
export default UpdateOrder;
 


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
 
// function UpdateOrder() {
//     const navigate = useNavigate();
//     const { orderId } = useParams();
//     const [formData, setFormData] = useState({ orderStatus: '' });
 
//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
 
//     const handleSubmitForm = async (e) => {
//         e.preventDefault();
//         const response = await axios.put(`http://localhost:8085/api/v1/orders/${orderId}`, formData);
//         navigate('/order-details');
//     };
 
//     const getOrderById = async () => {
//         const response = await axios.get(`http://localhost:8085/api/v1/orders/orderid/${orderId}`);
//         setFormData(response.data);
//     };

//     const handleBack = () => {
//         navigate('/order'); // Navigate to the customer page when the back button is clicked
//     };
 
//     useEffect(() => {
//         getOrderById();
//     }, []);
 
//     return (
//         <div>
//         <div style={containerStyle}>
//             <div style={formContainerStyle}>
//                 <h2 style={headerStyle}>Update Order</h2>
//                 <form onSubmit={handleSubmitForm}>
//                     <div style={formGroupStyle}>
//                         <label htmlFor="orderStatus" style={labelStyle}>
//                             Order Status:
//                         </label>
//                         <input
//                             type="text"
//                             id="orderStatus"
//                             name="orderStatus"
//                             style={inputStyle}
//                             value={formData.orderStatus}
//                             onChange={(e) => handleInputChange(e)}
//                         />
//                     </div>
//                     <button type="submit" style={buttonStyle}>
//                         Update
//                     </button>
//                 </form>
//             </div>
//         </div>
//         <div style={{ textAlign: 'center' }}>
//         <button onClick={handleBack} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor:'#38598b' }}>Back to Orders</button>
//       </div>
//       </div>
//     );
// }
 
// export default UpdateOrder;
 
// const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: '#e7eaf6'
// };
 
// const formContainerStyle = {
//     backgroundColor: '#f8f9fa',
//     borderRadius: '10px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     padding: '20px',
//     width: '400px',
// };
 
// const headerStyle = {
//     color: '#38598b',
//     textAlign: 'center',
//     marginBottom: '20px',
// };
 
// const labelStyle = {
//     display: 'block',
//     fontWeight: 'bold',
//     marginBottom: '5px',
// };
 
// const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     marginBottom: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     fontSize: '16px',
// };
 
// const buttonStyle = {
//     backgroundColor: '#38598b',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     padding: '10px 20px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     width: '100%',
// };
 
// const formGroupStyle = {
//     marginBottom: '20px',
// };
 