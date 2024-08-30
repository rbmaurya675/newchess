import React from "react";
import { Link } from 'react-router-dom';
import { FaRobot, FaChessPawn } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styles from './Practice.module.css';

const Play10Amount50 = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <div className={styles.container}>
            <Slider {...settings} style={{ marginTop: '50px' }}>
                <div className={styles.card} style={{ background: 'green' }}>
                    <Link to="/practice/solo" style={{ textDecoration: 'none' }}>
                        {/* <FaChessPawn className={styles.icon} style={{ color: 'blue' }} /> */}
                        <img src="logo2.png" />
                        <h3>Amount ₹ 30</h3>
                        <p>Lucknow</p>
                        <p>time 10 Minutes</p>
                        <p>Play with a Online </p>
                    </Link>
                </div>
                <div className={styles.card} style={{ background: 'green' }}>
                    <Link to="/practice/solo" style={{ textDecoration: 'none' }}>
                        <img src="logo2.png" />
                        <h3>Amount ₹ 50</h3>
                        <p>Delhi</p>
                        <p>time 10 Minutes</p>
                        <p>Play with a Online </p>
                    </Link>
                </div>

                <div className={styles.card}>
                    <Link to="/practice/solo" style={{ textDecoration: 'none' }}>
                        <img src="logo2.png" />
                        <h3>Amount ₹ 100</h3>
                        <p>Chanaini</p>
                        <p>time 10 Minutes</p>
                        <p>Play With a Online</p>
                    </Link>
                </div>

                <div className={styles.card}>
                    <Link to="/practice/solo" style={{ textDecoration: 'none' }}>
                        <img src="logo2.png" />
                        <h3>Amount ₹ 200</h3>
                        <p>Kanpur</p>
                        <p>time 10 Minutes</p>
                        <p>Play With a Online</p>
                    </Link>
                </div>

                <div className={styles.card}>
                    <Link to="/practice/solo" style={{ textDecoration: 'none' }}>
                        <img src="logo2.png" />
                        <h3>Amount ₹ 500</h3>
                        <p>Mumbai</p>
                        <p>time 10 Minutes</p>
                        <p>Play With a Online</p>
                    </Link>
                </div>

                <div className={styles.card}>
                    <Link to="/practice/solo" style={{ textDecoration: 'none' }}>
                        <img src="logo2.png" />
                        <h3>Amount ₹ 1000</h3>
                        <p>Agra</p>
                        <p>time 10 Minutes</p>
                        <p>Play With a Online</p>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link to="/practice/solo" style={{ textDecoration: 'none' }}>
                        <img src="logo2.png" />
                        <h3>Amount ₹ 1500</h3>
                        <p>Azamgarh</p>
                        <p>time 10 Minutes</p>
                        <p>Play With a Online</p>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link to="/practice/solo" style={{ textDecoration: 'none' }}>
                        <img src="logo2.png" />
                        <h3>Amount ₹ 5000</h3>
                        <p>time 10 Minutes</p>
                        <p>Allahabad</p>
                        <p>Play With a Online</p>
                    </Link>
                </div>
            </Slider>
        </div>
    )
};

export default Play10Amount50;
