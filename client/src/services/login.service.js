// import axios from 'axios';
// import React, { useState } from 'react';
// import GenericModal from '../components/genericModal';
// import GenericButton from '../components/genericButton';

// const API_URL = process.env.REACT_APP_API_URL;

// // const login = async (password) => {
// //     const systemPassword = {
// //         "password": password
// //     }
// //     try {
// //         const response = await axios.post(`${API_URL}/auth/login`, systemPassword);
// //         const token = response.data
// //         localStorage.setItem('token', token);
// //     } catch (error) {
// //         console.log(error.response.data);
// //     }
// // };


// const SystemPasswordModal = ({ show, onHide, onLogin }) => {
//     const [password, setPassword] = useState('');
//     const handleSubmit = () => {
//         try {
//             const response = await axios.post(`${API_URL}/auth/login`, {
//                 "password": password
//             });
//             const token = response.data
//             localStorage.setItem('token', token);
//             onLogin();
//         } catch (error) {
//             alert('Invalid system password. Please try again.'); // Show error message
//             console.log(error.response.data);
//         }
//     };

//     return (
//         <GenericModal
//             show={show}
//             handleClose={onHide}
//             title="Enter System Password"
//         >
//             <input
//                 type="password"
//                 placeholder="Enter system password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <GenericButton variant="primary" onClick={handleSubmit} label={"Login"} />
//         </GenericModal>
//     );
// };

// export default SystemPasswordModal;

import axios from 'axios';
import React, { useState } from 'react';
import GenericModal from '../components/genericModal';
import GenericButton from '../components/genericButton';

const API_URL = process.env.REACT_APP_API_URL;

const SystemPasswordModal = ({ show, onHide, onLogin }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = async () => { 
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                "password": password
            });
            const token = response.data.token; 
            localStorage.setItem('token', token);
            onLogin();
        } catch (error) {
            alert('Invalid system password. Please try again.'); 
            console.log(error.response.data);
        }
    };

    return (
        <GenericModal
            show={show}
            handleClose={onHide}
            title="Enter System Password"
        >
            <input
                type="password"
                placeholder="Enter system password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{marginRight:"2vw"}}
            />
            <GenericButton variant="primary" onClick={handleSubmit} label={"Login"} />
        </GenericModal>
    );
};

export default SystemPasswordModal;
