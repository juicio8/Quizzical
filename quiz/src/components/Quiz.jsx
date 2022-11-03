import React from "react";

export default function Quiz(props) {
    //creating an array of options
    const opt = [...props.wr_answer, props.cr_answer]

    //function for shuffling array
    function shuffle(arr) {
        let currentIndex = arr.length, randomIndex

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
        }
        return arr
    }
    //shuffling opt array
    shuffle(opt)
    //function for checking if selected answer is correct
    function correct(index) {
        if (props.cr_answer == index) {
            return "correct"
        }
    }
    //creating buttons for all available options
    const btn = opt.map(index => <button class={`${props.id} ${props.cr_answer == index? "correct" : ""}`} 
    onClick={(e) => handleClicks(e)}>{index}</button>)

    //function for handling selected buttons
    function handleClicks(e) {
       const tr = document.querySelectorAll(`.${props.id}`)
       for (let i=0; i < tr.length; i++) {
        tr[i].style.backgroundColor = 'transparent'

       }
       e.target.style.backgroundColor = '#D6DBF5'
       e.target.classList.add('chosen')
    }
    //function decoding all html syntaxes
    function htmlDecode(question) {
        let newQuestion = new DOMParser().parseFromString(question, "text/html");
        return newQuestion.documentElement.textContent;
      }
    //fixing &#39; &quot; errors
    let question = htmlDecode(props.question)

    
    return (
        <div className="quiz">
            <p className="quiz--question">{question}</p>
            <div className="quiz--options">
                {btn}
            </div>
        </div>
    )
}