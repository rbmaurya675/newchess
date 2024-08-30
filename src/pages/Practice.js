import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaChessPawn } from 'react-icons/fa';
import styles from './Practice.module.css';

const Training = () => {

  return (
    <div className={styles.container} style={{ background: '#530000' }}>
      <div className="d-flex flex-wrap justify-content-center align-items-center h-75 gap-3 mt-5">
        <Link to="/practice/vsai" className={styles.card}>
          <h3>Vs Computer</h3>
          <FaRobot className={styles.icon} style={{ color: 'blue' }} />
          <p>Play with a computer </p>
        </Link>

        {/* <Link to="/PlayWithOnline" className={styles.card}>
          <h3>Vs online</h3>
          <FaChessPawn className={styles.icon} />
          <p>Play With Online</p>
        </Link> */}
      </div>
    </div>
  );
};

export default Training;
