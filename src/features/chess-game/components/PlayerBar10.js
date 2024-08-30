import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RiUser5Fill, RiUser5Line } from 'react-icons/ri';
import styles from './PlayerBar.module.css';

const PlayerBar5 = ({ color }) => {
  const [time, setTime] = useState(5 * 60);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);

  const fen = useSelector((state) => state.board.fen);
  const players = useSelector((state) => state.board.players);
  const status = useSelector((state) => state.board.status);

  const name = players[color].name;
  const rating = players[color].rating;
  const turn = fen === 'start' ? 'w' : fen.split(' ')[1];
  const message =
    status === 'lose' ? 'Checkmate!' : status === 'inCheck' ? 'Checked!' : '';
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className={styles.container}>
      <div className="d-flex gap-1 align-items-start">
        <div
          className={styles.icon}
          style={{
            borderColor: turn === color ? 'var(--bs-yellow)' : 'var(--bs-red)',
          }}
        >
          {color === 'w' ? <RiUser5Fill /> : <RiUser5Line />}
        </div>
        <div>
          <h3 className={styles.name}>{name}</h3>
          <h5 className={styles.rating}>{rating}</h5>
        </div>
      </div>
      {turn !== color && message && <p>{message.toUpperCase()}</p>}
      <div className={styles.clock}>
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default PlayerBar5;
