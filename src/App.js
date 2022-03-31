import './Style.css';
import React, { useState } from 'react';
import submitButton from "./resources/img/sb.png"
import yellowSquare from "./resources/img/yellowSquare.png"
import greenSquare from "./resources/img/greenSquare.png"
import greySquare from "./resources/img/greySquare.png"
import wordListArr from "./wordListArr.js"

function Header(){
  return (
    <h1 style={{textAlign: "center"}}>spie51's Wordle Solver</h1>
  )
}

function getRandomWord(){
  return wordListArr[Math.floor(Math.random() * wordListArr.length)];
}

function filterWords(word, arr){
  const correctLetters = ["", "", "", "", ""];
  const misplacedLetters = [new Set(), new Set(), new Set(), new Set(), new Set()];
  const guessedLetters = new Set();
  const wrongLetters = new Set();
  let correctLetterCount = 0;

  for(let i = 0; i < 5; i++){
    console.log(arr[i]);
    if(arr[i] === 2){
      correctLetters[i] = word.charAt(i);
      guessedLetters.add(word.charAt(i));
      correctLetterCount++;
    }
    else if(arr[i] === 1){
      guessedLetters.add(word.charAt(i));
      misplacedLetters[i].add(word.charAt(i));
    }
    else{
      wrongLetters.add(word.charAt(i));
    }
  }

  if(correctLetterCount != 5){
    console.log("Last guess was incorrect")
    let ind = wordListArr.indexOf(word);
    wordListArr.splice(ind, 1);
  }

  outerLoop:
  
  for(let x = wordListArr.length - 1; x >= 0; x--){
    const word = wordListArr[x];
    console.log(word);
    let wordLetters = new Set();
    for(let i = 0; i < 5; i++){
      wordLetters.add(word.charAt(i));
    }

    for(let k = 0; k < 5; k++){
      if(misplacedLetters[k].has(word.charAt(k))){
        console.log("Letter at wrong index " + k + " is " + word.charAt(k));
        wordListArr.splice(x, 1);
        continue outerLoop;
      }
    }

    for(const guessedLetter of guessedLetters){
      console.log(guessedLetter);
      if(!wordLetters.has(guessedLetter)){
        console.log("Missing the letter " + guessedLetter);
        wordListArr.splice(x, 1);
        continue outerLoop;
      }
    }

    console.log(correctLetters);
    for(let j = 0; j < 5; j++){
      console.log(correctLetters[j], j);
      if(word.charAt(j) !== correctLetters[j] && correctLetters[j] != ""){
        console.log("Mismatch at index " + j);
  
        wordListArr.splice(x, 1);
        continue outerLoop;
      }
    }

    for(const wordLetter of wordLetters){
      console.log(wrongLetters);
      if(wrongLetters.has(wordLetter) && !guessedLetters.has(wordLetter)){
      //if(wrongLetters.has(wordLetter)){
        console.log("Incorrect letter found: " + wordLetter)
        wordListArr.splice(x, 1);
        continue outerLoop;
      }
    }
  }
}

function Clue(props){
  return (
    <div className='Clue'>
        <p style={{textAlign: "center"}}>
          Our guess is {props.word}
          </p>
    </div>
  )
}

function whichColor(num){
  if(num == 0){
    return greySquare;
  }
  if(num == 1){
    return yellowSquare;
  }
  return greenSquare;
}

function Button(props){
  // return (
  //   <div className='Button'>
  //     <button onClick={props.click}><img src={submitButton} className="Image"></img></button>
  //   </div>
  // )
  return (
    <div className='Button'>
      <img src={submitButton} onClick={props.click} className="Image"></img>
    </div>
  )
}

let responseOneArr = [];
let responseTwoArr = [];
let responseThreeArr = [];
let responseFourArr = [];
let responseFiveArr = [];

function modifyResponse(let1, let2, let3, let4, let5){
  let arr = [];
  arr.push(let1, let2, let3, let4, let5);
  console.log(arr);
  return arr;
}

function Response(props){
  const [letOneState, setOneState] = useState(0);
  const [letTwoState, setTwoState] = useState(0);
  const [letThreeState, setThreeState] = useState(0);
  const [letFourState, setFourState] = useState(0);
  const [letFiveState, setFiveState] = useState(0);

  if(props.id === "1"){
    responseOneArr = modifyResponse(letOneState, letTwoState, letThreeState, letFourState, letFiveState);
  }
  if(props.id === "2"){
    responseTwoArr = modifyResponse(letOneState, letTwoState, letThreeState, letFourState, letFiveState);
  }
  if(props.id === "3"){
    responseThreeArr = modifyResponse(letOneState, letTwoState, letThreeState, letFourState, letFiveState);
  }
  if(props.id === "4"){
    responseFourArr = modifyResponse(letOneState, letTwoState, letThreeState, letFourState, letFiveState);
  }
  if(props.id === "5"){
    responseFiveArr = modifyResponse(letOneState, letTwoState, letThreeState, letFourState, letFiveState);
  }

  return (
    <div className='Response'>
      <button className='ResponseButton' onClick={() => setOneState((letOneState + 1) % 3)}>
        <img src={whichColor(letOneState)}></img>
      </button>
      <button className='ResponseButton' onClick={() => setTwoState((letTwoState + 1) % 3)}>
        <img src={whichColor(letTwoState)}></img>
      </button>
      <button className='ResponseButton' onClick={() => setThreeState((letThreeState + 1) % 3)}>
        <img src={whichColor(letThreeState)}></img>
      </button>
      <button className='ResponseButton' onClick={() => setFourState((letFourState + 1) % 3)}>
        <img src={whichColor(letFourState)}></img>
      </button>
      <button className='ResponseButton' onClick={() => setFiveState((letFiveState + 1) % 3)}>
        <img src={whichColor(letFiveState)}></img>
      </button>
    </div>
  )  
}

function Row(props){
  let idInt = parseInt(props.id);
  let count = parseInt(props.count);
  
  if(count + 1 >= idInt){
    return (
      <div>
      <div className='Row'>
        <p>{idInt}</p>
        <Clue word = {props.word}/>
        <Button id = {props.id} click = {props.click}/>
      
      </div>
      
    
      <Response id = {props.id}/>
      
      </div>
    );
  }
  return (
    <div></div> 
  ) 
}

let extWord1 = "";
let extWord2 = "";
let extWord3 = "";
let extWord4 = "";
let extWord5 = "";

function App(){
  const [count, setCount] = useState(0);
  const [wordsRemaining, updateWordsRemaining] = useState(wordListArr.length);
  let countString = count.toString();

  let word1 = (extWord1 === "") ? getRandomWord() : extWord1;
  let word2 = (extWord2 === "") ? getRandomWord() : extWord2;
  let word3 = (extWord3 === "") ? getRandomWord() : extWord3;
  let word4 = (extWord4 === "") ? getRandomWord() : extWord4;
  let word5 = (extWord5 === "") ? getRandomWord() : extWord5;

  function increment(id){
    console.log("incremented");
    if(id === 1){
      filterWords(word1, responseOneArr);
      extWord1 = word1;
      word2 = getRandomWord();
    }
    if(id === 2){
      filterWords(word2, responseTwoArr);
      extWord2 = word2;
      word3 = getRandomWord();
    }
    if(id === 3){
      filterWords(word3, responseThreeArr);
      extWord3 = word3;
      word4 = getRandomWord();
    }
    if(id === 4){
      filterWords(word4, responseFourArr);
      extWord4 = word4;
      word5 = getRandomWord();
    }
    if(id === 5){
      filterWords(word5, responseFiveArr);
      extWord5 = word5;
    }
    updateWordsRemaining(wordListArr.length);
    (id > count) ? setCount(id) : setCount(count);
  }

  const header = <Header />
  const p = <p style={{textAlign : "center"}}>You are {count} guess(es) in and there are {wordsRemaining} possible words remaining</p>

  const row1 = <Row id = "1" count= {countString} click = {() => increment(1)} word  = {word1}/>
  const row2 = <Row id = "2" count= {countString} click = {() => increment(2)} word  = {word2}/>
  const row3 = <Row id = "3" count= {countString} click = {() => increment(3)} word  = {word3}/>
  const row4 = <Row id = "4" count= {countString} click = {() => increment(4)} word  = {word4}/>
  const row5 = <Row id = "5" count= {countString} click = {() => increment(5)} word  = {word5}/>

  const finalGuess = <p style={{textAlign : "center"}}>{wordsRemaining} possible words: {wordListArr.toString()} </p>
  const prevGuessesArr = [extWord1, extWord2, extWord3, extWord4, extWord5];
  const prevGuesses = <p  style={{textAlign : "center"}}>Previous Guesses: {prevGuessesArr.toString()}</p>
  const reload = <div style={{textAlign : "center"}}><button onClick={() => window.location.reload(false)}>Click to Reload</button></div>
  
  const success = <p style={{textAlign : "center"}}>Hooray! We guessed the word {wordListArr[0]} after {count} guess{(count === 1) ? "" : "es"}.</p>
  const failure = <p style={{textAlign : "center"}}>Sorry! The word doesn't appear to be in my word bank. Makes sure all clues were inputted correctly.</p>
  const motivation = <p style={{textAlign : "center"}}>Sorry! We couldn't figure out the word in 5 guesses. <br></br> Now you try and guess from the words below!</p>
  
  if(wordsRemaining === 1){
    return (
      [header, success, prevGuesses, reload]
    );
  }

  if(wordsRemaining === 0){
    return (
      [header, failure, prevGuesses, reload]
    );
  }

  if(count === 5){
    return (
      [header, motivation, finalGuess, reload]
    )
  }


  return (
    [header, p, row1, row2, row3, row4, row5]
  );
}

export default App;

