// import { React, useState, useRef, useEffect } from 'react';
// import Game from './../components/game.js';

// import Loader from './../assets/ui/loader.js';

// import Peer from 'peerjs';
// const LOBBY_NAME = "RC_lobby123";

// function P2P(props) {

// 	const [mainPeer, setMainPeer] = useState({peer: null, peer_id: null});
// 	const [currentConn, setCurrentConn] = useState(null);
// 	const [availablePeers, setAvailablePeers] = useState([]);
// 	const [connState, setConnState] = useState("NOT_CONNECTED");

// 	const [gameData, setGameData] = useState({ type: "online", player: "w", playerInfo: [{name: "You"}, {name: "Stranger"}] });

// 	const buildIndividualPeer = () => {
// 		let ipeer = new Peer();
// 		ipeer.on('open', (id) => {
// 	      setMainPeer({peer: ipeer, peer_id: id});
// 	      var lconn = ipeer.connect(LOBBY_NAME);
// 	      lconn.on('open', () => {
// 	        console.log("connected to lobby");
// 	        const lobby_query = () => {
// 	          lconn.send("QUERY");
// 	          if (connState === "NOT_CONNECTED") {
// 	            lconn.send("READY");
// 	          }
// 	          window.setTimeout(lobby_query, 1000);
// 	        }
// 	        lobby_query();
// 	      });
// 	      lconn.on('data', (data) => {
// 	      	const filteredLobby = data.filter(i=> i!==id);
// 	        // console.log("setting lobby", filteredLobby);
// 	        setAvailablePeers([...filteredLobby]);
// 	      });
// 	    });

// 	    ipeer.on('connection', (conn) => {
// 	      console.log("got connection from", conn.peer);
// 	      if (currentConn == null) {
// 	     	setGameData({type: "online", player: "b", playerInfo: gameData.playerInfo.reverse()});
// 	        setCurrentConn(conn);
// 	        restartGame();
// 	        outsideBoardFlipper();
// 	        conn.on('data', (data) => {
// 	          console.log('Received', data);
// 	          // making the move here
// 	          opponentMove(data.from, data.to);
// 	        });
// 	      } else {
// 	        console.log("already connected");
// 	        conn.close();
// 	      }
// 	    });
// 	}

// 	const buildLobby = () => {
// 		let peers = {};

// 	    // this will fail unless you are first player
// 	    let lobby = new Peer(LOBBY_NAME);
// 	    lobby.on('open', function(id) {
// 	      console.log('Lobby peer ID is: ' + id);
// 	    });

// 	    lobby.on('connection', (conn) => {
// 	      console.log('lobby connection', conn.peer);
// 	      conn.on('data', (data) => {
// 	        if (data === "READY") { 
// 	          peers[conn.peer] = (new Date()).getTime();
// 	        }
// 	        if (data === "QUERY") { 
// 	          conn.send(Object.keys(peers));
// 	        }
// 	      });
// 	    });

// 	    const expire = () => {
// 	      for (var k in peers) {
// 	        var now = (new Date()).getTime();
// 	        if (now - peers[k] > 3000) {
// 	          delete peers[k];
// 	        }
// 	      }
// 	      window.setTimeout(expire, 1000);
// 	    }
// 	    expire();
// 	}

// 	const tryConnect = (rp) => {
// 		// var rp = document.getElementById("remotepeer").value;
// 		console.log("connect to", rp, currentConn, availablePeers.length, mainPeer.peer);
// 		if(!currentConn && availablePeers.length > 0 && mainPeer.peer) {
		    
// 		    var conn = mainPeer.peer.connect(rp);
// 		    conn.on('open', () => {
// 		      console.log("connection open");
// 		   	  // setGameData({...gameData, player: "w"});
// 		      setCurrentConn(conn);
// 		    });
// 		    conn.on('data', (data) => {
// 		      console.log('Received back', data);
// 		      // making the move here
// 	          opponentMove(data.from, data.to);
// 		    });
// 		}
// 	 }

// 	useEffect(() => {
// 		buildLobby();
// 		buildIndividualPeer();
// 	}, []);

// 	useEffect(() => {
// 		if(!currentConn && availablePeers.length > 0 && mainPeer.peer) { 
// 			tryConnect(availablePeers[Math.floor(Math.random() * availablePeers.length)]);
// 		}
// 	});

// 	const gameRef = useRef(null);

// 	const outsideBoardFlipper = () => {
// 		console.log("flipping once");
// 		gameRef.current.outsideBoardFlipper();
// 	}

// 	const restartGame = () => {
// 		console.log("restarting game");
// 		gameRef.current.restartGame();
// 	}

// 	// use following functions to make and receive moves
// 	const opponentMove = (from, to) => {
// 		// Expects chess notation: Example: from = e2, to = e4
// 		gameRef.current.handleOpponentMoveForOnlineGame(from, to);
// 	}

// 	const listenPlayerMove = (move) => {
// 		console.log("playerMoved this", move);
// 		if(currentConn) {
// 			currentConn.send(move);
// 		}
// 	}

// 	return(
// 		<>
// 			{/*<input type="text" id="remotepeer" />
// 			<button onClick={() => tryConnect()}>connect</button>*/}
// 			{!currentConn ? <Loader>Finding a player...<br/><br/><a href="local" style={{color: "red"}}>Play Offline</a></Loader> :
// 			(<Game gameData={gameData} playerMoveCallback={listenPlayerMove} ref={gameRef} style={{margin: "auto"}}>
// 				<Game.RenderBoard />
// 				<Game.Status />
// 				<Game.ActionBtns />
// 			</Game>)}
// 		</>
// 		);
// }

// export default P2P;


import { React, useState, useRef, useEffect } from 'react';
import Game from './../components/game.js';
import Loader from './../assets/ui/loader.js';
import Peer from 'peerjs';

const LOBBY_NAME = "RC_lobby123";

function P2P(props) {

  const [mainPeer, setMainPeer] = useState({ peer: null, peer_id: null });
  const [currentConn, setCurrentConn] = useState(null);
  const [availablePeers, setAvailablePeers] = useState([]);
  const [connState, setConnState] = useState("NOT_CONNECTED");
  const [gameData, setGameData] = useState({ type: "online", player: "w", playerInfo: [{ name: "You" }, { name: "Stranger" }] });

  const gameRef = useRef(null);

  useEffect(() => {
    buildLobby();
    buildIndividualPeer();
  }, []);

  useEffect(() => {
    if (!currentConn && availablePeers.length > 0 && mainPeer.peer) {
      tryConnect(availablePeers[Math.floor(Math.random() * availablePeers.length)]);
    }
  }, [availablePeers, mainPeer.peer]);

  const buildIndividualPeer = () => {
    let ipeer = new Peer();
    ipeer.on('open', (id) => {
      setMainPeer({ peer: ipeer, peer_id: id });
      const lconn = ipeer.connect(LOBBY_NAME);
      lconn.on('open', () => {
        console.log("connected to lobby");
        const lobby_query = () => {
          lconn.send("QUERY");
          if (connState === "NOT_CONNECTED") {
            lconn.send("READY");
          }
          setTimeout(lobby_query, 1000);
        }
        lobby_query();
      });
      lconn.on('data', (data) => {
        const filteredLobby = data.filter(i => i !== id);
        setAvailablePeers([...filteredLobby]);
      });
    });

    ipeer.on('connection', (conn) => {
      console.log("got connection from", conn.peer);
      if (currentConn == null) {
        setGameData({ type: "online", player: "b", playerInfo: gameData.playerInfo.reverse() });
        setCurrentConn(conn);
        restartGame();
        outsideBoardFlipper();
        conn.on('data', (data) => {
          console.log('Received move from opponent:', data);
          opponentMove(data.from, data.to);
        });
        conn.on('close', () => {
          console.log("Opponent disconnected");
          setConnState("NOT_CONNECTED");
          setCurrentConn(null);
        });
      } else {
        console.log("already connected");
        conn.close();
      }
    });
  };

  const buildLobby = () => {
    let peers = {};
    let lobby = new Peer(LOBBY_NAME);
    lobby.on('open', function(id) {
      console.log('Lobby peer ID is: ' + id);
    });

    lobby.on('connection', (conn) => {
      console.log('lobby connection', conn.peer);
      conn.on('data', (data) => {
        if (data === "READY") {
          peers[conn.peer] = (new Date()).getTime();
        }
        if (data === "QUERY") {
          conn.send(Object.keys(peers));
        }
      });
    });

    const expire = () => {
      for (var k in peers) {
        var now = (new Date()).getTime();
        if (now - peers[k] > 3000) {
          delete peers[k];
        }
      }
      setTimeout(expire, 1000);
    };
    expire();
  };

  const tryConnect = (rp) => {
    console.log("Attempting to connect to", rp);
    if (!currentConn && availablePeers.length > 0 && mainPeer.peer) {
      const conn = mainPeer.peer.connect(rp);
      conn.on('open', () => {
        console.log("connection open");
        setCurrentConn(conn);
        setConnState("CONNECTED");
      });
      conn.on('data', (data) => {
        console.log('Received move from opponent:', data);
        opponentMove(data.from, data.to);
      });
      conn.on('close', () => {
        console.log("Connection closed");
        setConnState("NOT_CONNECTED");
        setCurrentConn(null);
      });
    }
  };

  const outsideBoardFlipper = () => {
    console.log("flipping board");
    if (gameRef.current) {
      gameRef.current.outsideBoardFlipper();
    }
  };

  const restartGame = () => {
    console.log("restarting game");
    if (gameRef.current) {
      gameRef.current.restartGame();
    }
  };

  const opponentMove = (from, to) => {
    if (gameRef.current) {
      gameRef.current.handleOpponentMoveForOnlineGame(from, to);
    }
  };

  const listenPlayerMove = (move) => {
    console.log("Player made a move:", move);
    if (currentConn) {
      currentConn.send(move);
    }
  };

  return (
    <>
      {!currentConn ? (
        <Loader>Finding a player...<br/><br/><a href="local" style={{color: "red"}}>Play Offline</a></Loader>
      ) : (
        <Game gameData={gameData} playerMoveCallback={listenPlayerMove} ref={gameRef} style={{ margin: "auto" }}>
          <Game.RenderBoard />
          <Game.Status />
          <Game.ActionBtns />
        </Game>
      )}
    </>
  );
}

export default P2P;
