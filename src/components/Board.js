import React, { useState } from 'react';
import Letter from './Letter';

const Board = () => {
   return (
      <div className="board">
         {Array.from(Array(6).keys()).map(attempt => (
            <div className="row">
               {Array.from(Array(5).keys()).map(position => (
                  <Letter letterPosition={position} attemptValue={attempt} />
               ))
               }
            </div>
         ))}
      </div>
   )
}

export default Board