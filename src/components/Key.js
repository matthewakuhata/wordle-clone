import { React, useContext } from 'react'
import { AppContext } from '../App';

const Key = ({ keyVal, big = false, onSelectKey, onSubmitGuess, onDeleteLetter, state = 'neutral' }) => {

   const onClickKey = () => {
      if (keyVal === 'ENTER') {
         onSubmitGuess()
      } else if (keyVal === 'DELETE') {
         onDeleteLetter()
      } else {
         onSelectKey(keyVal);
      }
   }

   return (
      <div className={`${state} key ${big && 'big'}`} onClick={onClickKey}>
         {keyVal}
      </div>
   )
}

export default Key;