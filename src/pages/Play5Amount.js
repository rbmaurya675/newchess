import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigate for React Router v6
import Slider from "react-slick";
import styles from './Practice.module.css';

const Play5Amount = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // useNavigate replaces useHistory in React Router v6
    const token = localStorage.getItem('token');

    const handleDepositSubmit = async (amount) => {
        if (!token) {
            console.log("No token found. Redirecting to login.");
            navigate('/account/login');
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ amount: parseFloat(amount) }),
        };

        try {
            console.log("Sending request to add funds:", requestOptions);
            const response = await fetch('https://moneychess.in/api/add-fond', requestOptions);
            const data = await response.json();
            console.log("API response:", data);

            if (response.ok && data.statusCode === '201') {
                console.log("Deposit successful. Redirecting...");
                window.location.href = 'https://chessboard.jankiwebinfotech.com/';
            } else {
                console.error("Failed to add funds:", data.message);
                setError(data.message || 'Failed to add funds.');
                // window.location.href = '/account/login'
            }
        } catch (error) {
            console.error('Error adding funds:', error);
            setError('An error occurred while processing your request.');
        }
    };

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    return (
        <div className={styles.container}>
            {error && <p className={styles.error}>{error}</p>}
            <Slider {...sliderSettings} className={styles.slider}>

                {[30, 50, 100, 200, 500, 1000, 1500, 2000].map((amount) => (
                    <div
                        key={amount}
                        className={styles.card}
                        onClick={() => handleDepositSubmit(amount)}
                    >
                        <img
                            src="logo2.png"
                            className={styles.logo}
                            alt={`Logo for amount ₹${amount}`}
                        />
                        <h3>Amount ₹ {amount}</h3>
                        <p>Deposit</p>
                        <p>Play Online</p>
                    </div>
                ))}

            </Slider>
        </div>
    );
};

export default Play5Amount;