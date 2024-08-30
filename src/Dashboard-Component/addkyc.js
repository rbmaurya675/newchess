import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Addkyc = ({ onKycSubmitted }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        accountHolderName: '',
        accountNumber: '',
        confirmAccountNumber: '',
        ifscCode: '',
        bankName: '',
        branch: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.password) formErrors.password = 'Password is required';
        if (!formData.accountHolderName) formErrors.accountHolderName = 'Account Holder Name is required';
        if (!formData.accountNumber) formErrors.accountNumber = 'Account Number is required';
        if (formData.accountNumber !== formData.confirmAccountNumber) formErrors.confirmAccountNumber = 'Account Numbers do not match';
        if (!formData.ifscCode) formErrors.ifscCode = 'IFSC Code is required';
        if (!formData.bankName) formErrors.bankName = 'Bank Name is required';
        if (!formData.branch) formErrors.branch = 'Branch is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:7000/api/kyc', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        email_id: formData.email,
                        password: formData.password,
                        account_holder_name: formData.accountHolderName,
                        account_number: formData.accountNumber,
                        confirm_account_number: formData.confirmAccountNumber,
                        ifsc_code: formData.ifscCode,
                        bank_name: formData.bankName,
                        branch: formData.branch
                    })
                });

                const result = await response.json();
                if (response.status === 201) {
                    console.log('KYC created successfully:', result);
                    toggleModal(); // Close the modal
                    onKycSubmitted(); // Fetch updated KYC data
                } else {
                    console.error('Error creating KYC:', result);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            console.log('Form has errors', errors);
        }
    };

    return (
        <div>
            <div className="row mt-3">
                <div className='col-sm-12'>
                    <div className='bg-info p-2 text-white'>
                        <button
                            onClick={toggleModal}
                            className="block ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                        >
                            Add Kyc
                        </button>

                        {isModalOpen && (
                            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                                <div className="relative  w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between  md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            <div className='text-dark'> UserKyc Form</div>
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={toggleModal}
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 1" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className='col-sm-12 shadow-md p-3 mt-1 mb-5' style={{ background: 'white' }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <input
                                                    type="email"
                                                    className={`form-control mt-2 ${errors.email ? 'is-invalid' : ''}`}
                                                    name="email"
                                                    placeholder='Email Id'
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="password"
                                                    className={`form-control mt-2 ${errors.password ? 'is-invalid' : ''}`}
                                                    name="password"
                                                    placeholder='Password'
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control mt-2 ${errors.accountHolderName ? 'is-invalid' : ''}`}
                                                    name="accountHolderName"
                                                    placeholder='Account Holder Name'
                                                    value={formData.accountHolderName}
                                                    onChange={handleChange}
                                                />
                                                {errors.accountHolderName && <div className="invalid-feedback">{errors.accountHolderName}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control mt-2 ${errors.accountNumber ? 'is-invalid' : ''}`}
                                                    name="accountNumber"
                                                    placeholder='Account Number'
                                                    value={formData.accountNumber}
                                                    onChange={handleChange}
                                                />
                                                {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control mt-2 ${errors.confirmAccountNumber ? 'is-invalid' : ''}`}
                                                    name="confirmAccountNumber"
                                                    placeholder='Confirm Account Number'
                                                    value={formData.confirmAccountNumber}
                                                    onChange={handleChange}
                                                />
                                                {errors.confirmAccountNumber && <div className="invalid-feedback">{errors.confirmAccountNumber}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control mt-2 ${errors.ifscCode ? 'is-invalid' : ''}`}
                                                    name="ifscCode"
                                                    placeholder='IFSC Code'
                                                    value={formData.ifscCode}
                                                    onChange={handleChange}
                                                />
                                                {errors.ifscCode && <div className="invalid-feedback">{errors.ifscCode}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control mt-2 ${errors.bankName ? 'is-invalid' : ''}`}
                                                    name="bankName"
                                                    placeholder='Bank Name'
                                                    value={formData.bankName}
                                                    onChange={handleChange}
                                                />
                                                {errors.bankName && <div className="invalid-feedback">{errors.bankName}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control mt-2 ${errors.branch ? 'is-invalid' : ''}`}
                                                    name="branch"
                                                    placeholder='Branch'
                                                    value={formData.branch}
                                                    onChange={handleChange}
                                                />
                                                {errors.branch && <div className="invalid-feedback">{errors.branch}</div>}
                                            </div>
                                            <button type="submit" className="btn btn-info">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addkyc;
