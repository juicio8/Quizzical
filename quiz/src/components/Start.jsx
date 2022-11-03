import React from 'react'
import Quiz from './Quiz'

export default function Start() {
    const [datas, updateData] = React.useState([])
    const [score, updateScore] = React.useState(0)
    const [submitted, updateSubmitted] = React.useState(false)
    const [start, updateStart] = React.useState(false)
    
    //fetching data
    React.useEffect(() => {
        async function getDatas() {
            const res = await fetch('https://opentdb.com/api.php?amount=5')
            const data = await res.json()
            updateData(data.results)
        }
        getDatas()
    }, [])

    //function for play again
    function replay() {
       window.location.reload()
    }
    
    //couldn't find a suitable variable , creates array of quiz
    const exam = datas.map(data => <Quiz question={data.question} id={`s${datas.indexOf(data)}`} wr_answer={data.incorrect_answers} cr_answer={data.correct_answer} />
    )
    //getting array of correct answers
    const correct_answers = datas.map(data => data.correct_answer)

    //function for submitting
    function submit() {
        //getting all selected options
        const chosen = document.querySelectorAll('.chosen')
        
        //Looping checking if chosen options are correct, and the score them
        for (let i = 0; i < chosen.length; i++) {
            if (chosen[i].textContent != correct_answers[i]) {
                chosen[i].style.backgroundColor = '#F8BCBC'
            }
            else {
                chosen[i].style.backgroundColor = '#94D7A2'
                updateScore(prev => prev + 1)
            }

        }
        const correctEl = document.querySelectorAll('.correct')
        for (let i = 0; i < correctEl.length; i++) {
            correctEl[i].style.backgroundColor = '#94D7A2'
        }
        updateSubmitted(true)
    }
    //function for starting quiz
    function started() {
        updateStart(true)
    }

    return (
        <div className="app">
            {!start && <div className="start">
                <h1 className="start--head">Quizzical</h1>
                <p className="start--leading">Answer Top Quizzes</p>
                <button className="start-btn" onClick={started}>Start Quiz</button>
            </div>}
            {start && <div className="questions-container">
                {exam}
                {!submitted && <button className="submit" onClick={submit}>Check answers</button>}
                {submitted && <p className="scoring">You scored {score}/5 correct answers <button className="replay" onClick={replay}>play again</button></p>}
            </div>}

        </div>
    )
}