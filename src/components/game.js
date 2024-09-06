
import React, { useState, useEffect, useMemo, useImperativeHandle, useCallback } from 'react';
import Board from './board.js';
import Piece from './piece.js';
import { Chess } from 'chess.js';
import { squareIndexToNotation, squareNotationToIndex, makePiecesArray } from './../helpers/common/common';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const GameStatus = (props) => { 
    return (
        <><h2><b>{props.state.gameStatus === 'end' 
            ? "Game Over: " + (props.toMove === 'w' ? "Black wins" : "White wins") 
            : (props.toMove === 'w' ? "White to move" : "Black to move")}</b></h2></>
    );
};

const GameActionButtons = (props) => (
    <>
        <button onClick={() => props.flipTheBoard()} className="action-btn">Flip the board</button>
        &nbsp;
        {props.state.gameData.type === "local" 
            ? (<button onClick={() => props.undoMove()} className="action-btn">Undo</button>) 
            : (<></>)}
    </>
);

const PlayerInfo = ({ player, position, chess, index }) => { 
    const getCapturedPieces = (game, color) => {
        const captured = { 'p': 0, 'n': 0, 'b': 0, 'r': 0, 'q': 0 };
        for (const move of game.history({ verbose: true })) {
            if (move.hasOwnProperty("captured") && move.color !== color[0]) {
                captured[move.captured]++;
            }
        }
        const output = [];
        for (const i in captured) {
            if (captured[i] > 0) {
                output.push({ key: i, value: captured[i] });
            }
        }
        return output;
    }

    const color = index === 1 ? "w" : "b";
    const capturedPieces = getCapturedPieces(chess, color === "w" ? "white" : "black");

    return (
        <div className={`playerInfo playerInfo_${position}`} style={{ alignSelf: position === "bottom" ? "end" : "start" }}>
            <span>{player["name"]}</span> 
            <br /> 
            {capturedPieces.map((piece, index) => 
                Array(piece.value).fill(null).map(() => (
                    <Piece 
                        value={`${color}${piece.key.toUpperCase()}`} 
                        style={{ backgroundColor: '#fff', marginTop: '10px' }} 
                        className="piece_captured" 
                    />
                ))
            )}
        </div>
    );
};

const GameRenderBoard = (props) => {
    const playerInfoData = props.state.gameData.playerInfo;
    return (
        <div className="game-grid" style={{ display: "flex" }}>
            <PlayerInfo 
                position="top" 
                index={props.state.isFlipped ? 0 : 1} 
                chess={props.state.chess} 
                player={playerInfoData[props.state.isFlipped ? 0 : 1]} 
            />
            <Board 
                isFlipped={props.state.isFlipped} 
                clickedSquare={props.state.clicked}
                availableMoves={props.calculatedAvailableMoves} 
                pieces={props.pieces} 
                on_click={(i) => props.handleClick(i)}
            />
            <PlayerInfo 
                position="bottom" 
                index={props.state.isFlipped ? 1 : 0} 
                chess={props.state.chess} 
                player={playerInfoData[props.state.isFlipped ? 1 : 0]} 
            />
        </div>
    );
};

function Game(props) {

    const initChess = new Chess();

    const [state, setState] = useState({
        chess: initChess,
        clicked: null,
        isFlipped: false,
        toMove: 'w',
        gameStatus: "started",
        gameData: props.gameData,
    });

    useEffect(() => {
        const chess = state.chess;
        setNeededVariables(chess);
    });

    const updateState = (update) => {
        setState({ ...state, ...update });
    }

    const getAvailableMoves = useCallback(() => {
        const chess = state.chess;
        if (state.gameData.type === "online" && state.gameData.player !== chess.turn()) {
            return [];
        }

        if (state.clicked === null) {
            return [];
        }

        let clickedSquareNotation = squareIndexToNotation(state.clicked);
        let available = chess.moves({ square: clickedSquareNotation, verbose: true });
        let availableMoves = available.map(item => squareNotationToIndex(item.to));
        return availableMoves;
    }, [state.chess, state.gameData, state.clicked]);

    

    const flipTheBoard = () => {
        updateState({ isFlipped: !(state.isFlipped) });
    }

    const undoMove = () => {
        const chess = state.chess;
        chess.undo();
        updateState({ chess: chess });
    }

    const makePlayerMove = (from, to) => {
        const chess = state.chess;
        console.log("move enter is .....", chess);
        console.log("state.gameData.type....", state.gameData.type);
        
        // Convert both `from` and `to` to notation strings if they are numbers
        const fromNotation = typeof from === 'number' ? squareIndexToNotation(from) : from;
        const toNotation = typeof to === 'number' ? squareIndexToNotation(to) : to;
        
        let moveRes = chess.move({ from: fromNotation, to: toNotation });
        console.log("moveRes.....", moveRes);
        
        if (moveRes) {
            console.log("movesR....");
            updateState({ chess: chess, clicked: null, availableMoves: [] });
            return { status: true, data: moveRes };
        } else {
            console.log("esls.......");
            return { status: false, data: moveRes };
        }
    }
    
    useImperativeHandle(props.forwardedRef, () => ({
        handleOpponentMoveForOnlineGame: (fromNotation, toNotation) => {
            const chess = state.chess;
            let moveRes = chess.move({ from: fromNotation, to: toNotation });
            if (moveRes) {
                updateState({ chess: chess, clicked: null, availableMoves: [] });
                return { status: true, data: moveRes };
            } else {
                return { status: false, data: moveRes };
            }
        },
        outsideBoardFlipper: () => {
            flipTheBoard()
        },
        restartGame: () => {
            setState({
                chess: new Chess(),
                clicked: null,
                isFlipped: false,
                toMove: 'w',
                gameStatus: "started",
                gameData: props.gameData
            });
        }
    }));

    const handleClick = (i) => {
        if (state.clicked == null) {
            updateState({ clicked: i });
            return;
        }

        if (state.clicked === i) {
            updateState({ clicked: null, availableMoves: [] });
            return;
        }

        let from = state.clicked;
        // console.log("from is.....",from)
        let to = i;
        // console.log("to is...",i)

        let move = makePlayerMove(from, to);
        // console.log("move is ..",move)
console.log("move status is ...",move.status)
console.log("stats .decem..gameData...",state.gameData.type)
        if (!move.status) {
            console.log("not move status....")
            updateState({ clicked: i });
            return;
        }

        if (state.gameData.type === "online") {
            console.log("gamestate....")
            props.playerMoveCallback(move.data);
        }

        return;
    }
	const setNeededVariables = (chess) => {
        if (chess.game_over() && state.gameStatus !== "end") {
            updateState({ gameStatus: "end" });
            return;
        }
    }
    const calculatedAvailableMoves = useMemo(() => getAvailableMoves(), [getAvailableMoves]);
    const toMove = state.chess.turn();
    const boardData = state.chess.board();
    const pieces = useMemo(() => makePiecesArray(boardData), [boardData]);

    return (
        <div className="container-game" style={{ ...props.style }}>
            {React.Children.map(props.children, child => React.cloneElement(child, {
                state: state, toMove: toMove, flipTheBoard: flipTheBoard, 
                undoMove: undoMove, calculatedAvailableMoves: calculatedAvailableMoves, 
                pieces: pieces, handleClick: handleClick 
            }))}
        </div>
    );
}

const ForwardedGame = React.forwardRef((props, ref) => <Game {...props} forwardedRef={ref} />);
ForwardedGame.Status = GameStatus;
ForwardedGame.ActionBtns = GameActionButtons;
ForwardedGame.RenderBoard = GameRenderBoard;

export default ForwardedGame;
