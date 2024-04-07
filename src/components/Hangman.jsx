import { useEffect, useState } from "react"

export default function Hangman() {
    const wordList = [
        'APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'PINEAPPLE', 'KIWI', 'STRAWBERRY', 'BLUEBERRY', 'MELON', 'PEACH',
        'CARROT', 'POTATO', 'BROCCOLI', 'CUCUMBER', 'LETTUCE', 'TOMATO', 'ONION', 'GARLIC', 'PEPPER', 'MUSHROOM'
    ];

    const [triesLeft, setTriesLeft] = useState(8)
    const [word, setWord] = useState(wordList[Math.ceil(wordList.length*Math.random())])
    const [wordShow, setWordShow] = useState(word.split('').reduce((acc, cha) => acc + '_ ', ''))
    const [chaTry, setChaTry] = useState('')
    const [correctGuess, setCorrectGuess] = useState([])

    const firstLine = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N']
    const secondLine = ['O','P','Q','R','S','T','U','V','W','X','Y','Z']

    const [firstButtonLine, setFirstButtonLine] = useState(firstLine.map((char) => <button style={{backgroundColor: 'white'}}id={char} onClick={(e) => {console.log(e.target.id); setChaTry(char)}}>{char}</button>))
    const [secondButtonLine, setSecondButtonLine] = useState(secondLine.map((char) => <button style={{backgroundColor: 'white'}}id={char} onClick={(e) => {console.log(e.target.id); setChaTry(char)}}>{char}</button>))
    
    const onSubmit = () => {
        if (word.split('').includes(chaTry)) {
            //show char in the word
            console.log('correct')
            //show the corrected one
            setCorrectGuess((prev) => [...prev, chaTry])
            // set tried button to red
            setFirstButtonLine((prev) => prev.map((button)=> button.props.id === chaTry ? <button style={{backgroundColor: 'green'}}id={chaTry} onClick={(e) => {console.log(e.target.id); setChaTry(chaTry)}}>{chaTry}</button>: button))
            setSecondButtonLine((prev) => prev.map((button)=> button.props.id === chaTry ? <button style={{backgroundColor: 'green'}}id={chaTry} onClick={(e) => {console.log(e.target.id); setChaTry(chaTry)}}>{chaTry}</button>: button))
        } else {
            //reduce the triesLeft
            if (triesLeft === 0) return;
            setTriesLeft(triesLeft - 1)

            // set Tried button to red
            setFirstButtonLine((prev) => prev.map((button)=> button.props.id === chaTry ? <button style={{backgroundColor: 'red'}}id={chaTry} onClick={(e) => {console.log(e.target.id); setChaTry(chaTry)}}>{chaTry}</button>: button))
            setSecondButtonLine((prev) => prev.map((button)=> button.props.id === chaTry ? <button style={{backgroundColor: 'red'}}id={chaTry} onClick={(e) => {console.log(e.target.id); setChaTry(chaTry)}}>{chaTry}</button>: button))
        }
    }

    const resetGame = () => {
        setTriesLeft(8)
        setChaTry("")
        setCorrectGuess([])
        setFirstButtonLine(firstLine.map((char) => <button style={{backgroundColor: 'white'}}id={char} onClick={(e) => {console.log(e.target.id); setChaTry(char)}}>{char}</button>))
        setSecondButtonLine(secondLine.map((char) => <button style={{backgroundColor: 'white'}}id={char} onClick={(e) => {console.log(e.target.id); setChaTry(char)}}>{char}</button>))
        setWord(wordList[Math.ceil(wordList.length*Math.random())])
        setWordShow(word.split('').reduce((acc, cha) => acc + '_ ', ''))
    }

    useEffect(() => {
        console.log(typeof(chaTry))
    }, [chaTry])

    useEffect(() => {
        setWordShow(
            word.split('').reduce((acc, cha) => correctGuess.includes(cha) ? acc + cha : acc + '_ ', '')
        )
    }, [correctGuess])

    return (
        <div>
            <h1>Hangman</h1>
            <p>Tries Left: {triesLeft} / 8</p>
            <p>{wordShow} {(triesLeft === 0 || !wordShow.includes("_")) && (wordShow.includes("_")? "You lose" : "You win")}</p>
            <div>
                {firstButtonLine}
                <br />
                {secondButtonLine}
                <br />
                <br />
                <button onClick={onSubmit}>try</button>
                {(triesLeft === 0 || !wordShow.includes("_")) && <button onClick={resetGame}>Play again</button>}
            </div>
        </div> 
    )
}