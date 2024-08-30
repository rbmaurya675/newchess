import React from "react";
import { Link } from 'react-router-dom';
import { FaRobot, FaChessPawn } from 'react-icons/fa';
import styles from './Practice.module.css';

const PlayWithOnline = () => {
    return (
        <div className={styles.container} style={{
            backgroundImage: 'url(../p3.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center', height: '100vh', width: '100vw', overflowX: 'hidden',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }} >
            <div className="d-flex flex-wrap justify-content-center align-items-center h-75 gap-3">
                <Link to="/Play5Amount" className={styles.card} style={{ background: '		#DC143C' }}>
                    <h3>5 Minutes</h3>
                    <FaChessPawn className={styles.icon} style={{ color: 'blue' }} />
                    <p>Play with a Online </p>
                </Link>

                <Link to="/Play10Amount50" className={styles.card} style={{ background: '	#000080' }}>
                    <h3>10 Minutes</h3>
                    <FaChessPawn className={styles.icon} style={{ color: 'blue' }} />
                    <p>Play With a Online</p>
                </Link>

            </div>
        </div>
    )
};

export default PlayWithOnline;