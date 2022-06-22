import React, { useState, useEffect } from 'react';
const Tile = ({ x, handleClick, i, j, hide, mineHit, setMineHit, flags, gridSize }) => {
    const [xState, setState] = useState(x)
    const [flagged, setFlagged] = useState(false)

    useEffect(() => {
        setState(x)
    }, [x])

    const clickHandler = (e) => {
        if (!mineHit) {
            handleClick(x, e)
            if (x['mine'] && !flags) {
                setMineHit(true)
            }
            if (flags) {
                setFlagged(!flagged)
            }
        }
    }
    return (
        <div tabIndex={0} className='tile' 
            key={Math.random() + j + i}
            data-content={x} 
            onClick={clickHandler} 
            data-value={[i, j]} 
            style={{ 
                cursor: 'pointer', 
                margin: '0.05rem', 
                width: 34/gridSize + 'vw', 
                height:  34/gridSize + 'vw', 
                backgroundColor:
                    mineHit && x.mine ? 'red' :
                    x.flagged && !mineHit ? 'black' :
                    !hide && !mineHit ? 'rgb(57, 108, 16)' : 
                    (x.whitespace ? 'white' : 
                    !hide ? 'rgb(57, 108, 16)' : 'orange'), 
                    fontWeight: '800', 
                    lineHeight: 34/gridSize + 'vw', 
                    fontSize: (34/gridSize)*0.75 + 'vw', 
                    borderRadius: '0.3rem' 
                }}>
            {xState['mine'] && !flagged && mineHit && '🤬'}
            {x.flagged && !mineHit && '🤫'}
            {x.exposed && !x.mine &&  x.value !== 0 && x.value}
        </div>
    )
}
export default Tile