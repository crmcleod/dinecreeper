/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Tile from './Tile';
const Grid = ({ grid, handleClick, setRestart, restart, count, gridSize
 }) => {
    const [gridState, setGrid] = useState(grid)
    const [rerender, setRerender] = useState(false)
    const [mineHit, setMineHit] = useState(false)
    const [flags, setEnableFlags] = useState(false)
    const [flaggedMines, setFlaggedMines] = useState(0)
    const [remainingCount, setRemainingCount] = useState(0)
    const [modal, setModal] = useState(false)

    useEffect(() => {
        window.addEventListener('keypress', (e) => {
            if (e.key === 'f' || e.key === 'F') {
                setEnableFlags(true)
            } else if(
                e.key === 'e' || e.key === 'E'
            ) {
                setEnableFlags(false)
            }
        })
    }, [])

    useEffect(() => {
        !flags && setGrid(grid)
    }, [grid])
    
    useEffect(() => {
        if(remainingCount === (gridSize**2 - count) && count === flaggedMines){
            setModal(true)
        }
    },[flaggedMines, remainingCount])
    
    
    const checkCounts = () => {
        let countExposed = 0
        gridState && gridState.forEach(x => {
            x.forEach(y => {
                y?.['exposed'] && countExposed++
            })
        })
        setRemainingCount(
            countExposed
        )
    }


    const clickHandler = (x, e) => {
        handleClick(e, null, null, flags, remainingCount)
        checkCounts()
        setRerender(!rerender)
        x['mine'] && x['flagged'] && setFlaggedMines(flaggedMines + 1)
        x['mine'] && !x['flagged'] && setFlaggedMines(flaggedMines - 1)
    }

    const restartGame = () => {
        setMineHit(false)
        setEnableFlags(false)
        setFlaggedMines(0)
        setRestart(!restart)
        setModal(false)
    };

    const handleFlags = () => {
        setEnableFlags(!flags)
    }
    return (
        <>
            {modal && <Modal restartGame={restartGame}/>}
            <div id='grid-main'>
                <div id='buttons'>

                    <p style={{fontSize: '2rem'}}>
                        (F)lag
                        <input key={flags} type='range' min={0} max={1} onClick={handleFlags} value={flags ? 0 : 1}/>
                        (E)xplore
                    </p>
                <button style={{fontSize: '1.4rem'}} onClick={restartGame}>
                   Try Again!
                </button>
                </div>
                <div id='game-wrapper' key={grid}>
                    {gridState.map((x, i) => {
                        return (
                            <div style={{ display: 'flex' }}>{x.map((y, j) =>
                                <Tile
                                    flags={flags}
                                    key={Math.random()}
                                    x={y} 
                                    handleClick={clickHandler} 
                                    hide={grid[i][j]['exposed']} 
                                    i={i} 
                                    j={j}
                                    mineHit={mineHit}
                                    setMineHit={setMineHit}
                                    gridSize={gridSize}
                                />
                            )}</div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default Grid