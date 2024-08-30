import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaChessPawn } from 'react-icons/fa';
import styles from './Practice.module.css';
const PlayOnline = () => {
  return (
    <div >
      <h4 className='text-white' style={{ background: ' #0f044b', margin: "0px", padding: '10px' }}>🚧Under Construction🚧</h4>
      {/* <div className={styles.container} style={{ background: '#530000' }}>
        <div className="d-flex flex-wrap justify-content-center align-items-center h-75 gap-3">
          <Link to="/PlayWithOnline" className={styles.card} style={{ background: '#660066' }}>
            <h3>Vs online</h3>
            <FaChessPawn className={styles.icon} style={{ color: 'white' }} />
            <p>Play With Online</p>
          </Link>
        </div>
      </div> */}
      <div


        className={styles.container}
        style={{
          // backgroundColor: '#530000', // Fallback color if the image fails to load
          backgroundImage: 'url(../p.gif)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center', height: '100vh', width: '100vw', overflowX: 'hidden',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="d-flex flex-wrap justify-content-center align-items-center h-75 gap-3">
          <Link
            to="/PlayWithOnline"
            className={styles.card}
            style={{ background: '#660066' }}
          >
            <h3>Vs online</h3>
            <FaChessPawn className={styles.icon} style={{ color: 'white' }} />
            <p>Play With Online</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlayOnline;
