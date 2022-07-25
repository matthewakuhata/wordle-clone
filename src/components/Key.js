import { React, useContext } from 'react'
import { AppContext } from '../App';

const Key = ({ keyVal, big = false, disabled }) => {
   const { onSelectKey, submitGuess, deleteLetter } = useContext(AppContext);

   const selectKey = () => {
      if (keyVal === 'ENTER') {
         submitGuess()
      } else if (keyVal === 'DELETE') {
         deleteLetter()
      } else {
         onSelectKey(keyVal);
      }
   }

   return (
      <div id={big ? 'big' : disabled && 'disabled'} className="key" onClick={selectKey}>
         {keyVal}
      </div>
   )
}

export default Key