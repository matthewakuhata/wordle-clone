import { useState, createContext, useEffect } from 'react';
import axois from 'axios';

const isValidWord = (word) => {
   axois.get(`https://api.api-ninjas.com/v1/dictionary?word=${word}`, {
      headers:
         { 'X-Api-Key': '1IzsQ9vc7YFZwCT1o+Q8lA==CJAvzKDE4XQqBWgY' },
   }).then(result => result.valid);
};

export default isValidWord;