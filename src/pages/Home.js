import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import FeatureCard from '../features/dashboard/components/FeatureCard';
import ProfileBar from '../features/dashboard/components/ProfileBar';
import { FaChessKnight, FaTrophy, FaSpinner } from 'react-icons/fa';
import { FcPuzzle, FcElectronics } from 'react-icons/fc';
import { Col, Row } from 'react-bootstrap';
import 'animate.css';
import styles from './Home.module.css';
import MatchesTable from '../features/dashboard/components/MatchesTable';

const features = [
  {
    title: 'Play Online',
    icon: <FaChessKnight style={{ color: '#641e16' }} />,
    path: '/play/online',
  },
  {
    title: 'Solve Puzzle',
    icon: <FcPuzzle style={{ color: '#A52A2A' }} />,
    path: '/puzzle',
  },
  {
    title: 'Vs Computer',
    icon: <FcElectronics style={{ color: 'blue' }} />,
    path: '/practice/vsai',
  },
  {
    title: 'Top Players',
    icon: <FaTrophy style={{ color: '#140152' }} />,
    path: '/leaderboard',
  },
];

const matches = [
  {
    type: 'blitz',
    players: ['Jim', 'You'],
    result: 1,
    moves: 34,
    date: '9 Mar 2023',
  },
  {
    type: 'bullet',
    players: ['You', 'Alex'],
    result: -1,
    moves: 36,
    date: '1 Feb 2023',
  },
  {
    type: 'classic',
    players: ['Bob', 'You'],
    result: 0,
    moves: 16,
    date: '19 Jan 2023',
  },
  {
    type: 'blitz',
    players: ['Jim', 'You'],
    result: 1,
    moves: 22,
    date: '9 Jan 2023',
  },
];

const Home = () => {
  const [showHeading, setShowHeading] = useState(true); // State for heading visibility
  const [loading, setLoading] = useState(false); // State for loader visibility
  const [showContent, setShowContent] = useState(false); // State for content visibility

  useEffect(() => {
    const headingTimer = setTimeout(() => {
      setShowHeading(false); // Hide heading
      setLoading(true); // Show loader
    }, 1000); // Duration to show "Hii Game"

    const loaderTimer = setTimeout(() => {
      setLoading(false); // Hide loader
      setShowContent(true); // Show home page content
    }, 4000); // Duration of the loader

    return () => {
      clearTimeout(headingTimer);
      clearTimeout(loaderTimer);
    };
  }, []);

  const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOutBottomRight {
    from {
      opacity: 1;
      transform: translateY(0) translateX(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px) translateX(20px);
    }
  }

  .fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }

  .fade-out-bottom-right {
    animation: fadeOutBottomRight 0.6s ease-out;
  }
`;

  // Inline Loader Component with Round Image
  const Loader = () => (
    <div className="loader" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.7)', /* Semi-transparent background */
      zIndex: 9999, /* Ensure it appears above all other content */
    }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src="path/to/your/image.png"
          alt="Loading"
          style={{
            height: '200px',
            width: '200px', /* Set width same as height for a circle */
            borderRadius: '50%', /* Makes the image round */
            marginBottom: '20px',
            objectFit: 'cover', /* Ensures the image covers the circle */
          }}
        />
        <FaSpinner className="spinner-icon" style={{
          fontSize: '200px', /* Adjust the size of the spinner icon */
          color: 'white',
          animation: 'spin 1s linear infinite',
        }} />
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return (
    <div className={styles.container} style={{
      backgroundImage: 'url(../p4.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center', height: '100vh', width: '100vw', overflowX: 'hidden',
    }}>
      {showHeading && (
        <div className='container-fluid p-3' style={{ background: '#0f044b' }}>
          <div className='text-white fade-in-up' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <img src='h.png' style={{ height: '50px' }} />
            <img src='l.png' style={{ height: '50px' }} />
            <img src='pasa.png' style={{ height: '50px' }} />
            <img src='a.png' style={{ height: '50px', }} />
            <img src='m.png' style={{ height: '50px' }} />
          </div>
        </div>

      )}

      {loading && <Loader />} {/* Show the loader while loading */}

      {showContent && (
        <>
          <div className='container-fluid p-3' style={{ background: '#0f044b' }}>
            <div>
              <style>{animationStyles}</style>
              <div className='row flex'>
                <div className='col-sm-2 mt-2'>
                  <h5 className='text-white fade-out-bottom-right'>
                    Money Chess Club <span className='mx-5'></span>
                  </h5> {/* "Money Chess Club" header */}
                </div>
              </div>
            </div>
          </div>

          <Container>
            <ProfileBar />
            <Container className="p-3">
              <Row>
                {features.map((feature, index) => (
                  <Col md={6} sm={8} className="mb-4 p-2 text-center" key={feature.title} style={{ margin: '-30px', marginLeft: '1px', fontFamily: 'monospace' }}>
                    <FeatureCard
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      path={feature.path}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
            {/* <Container>
              <h3 className="text-light">Recent Matches</h3>
              <MatchesTable matches={matches} />
            </Container> */}
          </Container>
        </>
      )}
    </div>
  );
};

export default Home;
