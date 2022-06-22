import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react'
import Grid from './Grid';
import { Helmet } from 'react-helmet';

function App() {

  const [rerender, setRerender] = useState(false)
  const [count] = useState(50)
  const [gridSize] = useState(15)

  let grid = [...Array(gridSize)].map(_ => [...Array(gridSize)].map(_ => { return { mine: false, flagged: false, exposed: false, value: 0, whitespace: false } }));

  const generateMineLocations = () => {
    const x = () => Math.floor(Math.random() * gridSize);
    const y = () => Math.floor(Math.random() * gridSize);
    return [x(), y()];
  }

  for (let i = 0; i < count; i++) {
    let xy = generateMineLocations();

    if(
      grid[xy[0]][xy[1]]['mine'] === true
    ) {
      i--
    } else {
      grid[xy[0]][xy[1]]['mine'] = true
    }
  };

  grid.forEach((item, index) => {
    item.forEach((nestedItem, index1) => {
      if (grid[index][index1]['mine']) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (!(i === 0 && j === 0)) {
              !!(grid?.[index + i]?.[index1 + j] && !(grid?.[index + i]?.[index1 + j]['mine'])) && (grid[index + i][index1 + j]['value'] += 1);
            }
          }
        }
      }
    })
  })

  const handleClick = (e, x, y, flags) => {
    let coordsArray = e?.target?.dataset?.value?.split(',')
    const posX = (x > 0 && x) || (coordsArray?.[0] || 0)
    const posY = (y > 0 && y) || (coordsArray?.[1] || 0)

    if (!grid[posX][posY]['mine'] && grid[posX][posY]['value'] !== 0 && coordsArray && !flags) {
      grid[posX][posY]['exposed'] = true
    }
    else if (
      grid?.[posX]?.[posY] &&
      !grid?.[posX]?.[posY]['exposed'] &&
      flags
    ) {
      grid[posX][posY]['flagged'] = !grid[posX][posY]['flagged']
    }
    else
      if (
        grid[posX][posY]['mine'] && coordsArray
      ) {
        grid[posX][posY]['exposed'] = true
        // setFlaggedCount(minesFlagged+1)

      } else if (!flags) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (
              grid?.[(+posX) + i]?.[(+posY) + j] &&
              (grid?.[(+posX) + i]?.[(+posY) + j]['mine'] === false) &&
              (grid?.[(+posX) + i]?.[(+posY) + j]?.['value'] === 0) &&
              (!grid?.[(+posX) + i]?.[(+posY) + j]?.['whitespace']) &&
              (!grid?.[(+posX) + i]?.[(+posY) + j]?.['exposed']) &&
              !flags
            ) {
              grid[(+posX) + i][(+posY) + j]['whitespace'] = true
              grid[(+posX) + i][(+posY) + j]['exposed'] = true
              handleClick(null, (+posX + i), (+posY + j), false)
            } else if (
              grid?.[(+posX) + i]?.[(+posY) + j] &&
              (grid?.[(+posX) + i]?.[(+posY) + j]['mine'] === false) &&
              !(grid?.[(+posX) + i]?.[(+posY) + j]?.['value'] === 0) &&
              (!grid?.[(+posX) + i]?.[(+posY) + j]?.['whitespace']) &&
              (!grid?.[(+posX) + i]?.[(+posY) + j]?.['exposed']) &&
              !(grid?.[(+posX) + i]?.[(+posY) + j]?.['flagged'])
            ) {
              grid[(+posX) + i][(+posY) + j]['exposed'] = true
            }
          }
        }
      }
  }


  return (
    <div className="App">
      <Helmet>
        <title>Dine Creeper</title>
        <meta name='description' content='Minesweeper reimagined, unimaginatively!' />
        <meta property="og:image" content="https://media.istockphoto.com/photos/american-diner-picture-id91630376?k=20&m=91630376&s=612x612&w=0&h=NSqTUG3eQdHwyH3RyzgmuYcNCpxrvPeJLHPm53DT6w8="></meta>
      </Helmet>
      <h1>Dine Creeper</h1>
      <h2 id='sub-head'>Avoid the grumpy diners!</h2>
      {/* <h2>{minesFlagged}</h2> */}
      < Grid restart={rerender} setRestart={setRerender} key={grid && grid} grid={grid && grid} handleClick={handleClick} count={count} gridSize={gridSize} />
    </div>
  );
}

export default App;
