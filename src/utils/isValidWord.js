import { useState, createContext, useEffect } from 'react';
import axois from 'axios';

const isValidWord = (word) => {
   console.log(process.env);
   axois.get(`https://api.api-ninjas.com/v1/dictionary?word=${word}`, {
      headers:
         { 'X-Api-Key': process.env.RAZZLE_API_KEY },
   }).then(result => result.valid);
};

export default isValidWord;