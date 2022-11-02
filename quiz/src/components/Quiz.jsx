import React from "react";

export default function Quiz(props) {
    const opt = [...props.wr_answer, props.cr_answer]
    
    function shuffle(arr) {
        let currentIndex = arr.length, randomIndex

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
        }
        return arr
    }
    shuffle(opt)
    function correct(index) {
        if (props.cr_answer == index) {
            return "correct"
        }
    }
    
    const btn = opt.map(index => <button class={`${props.id} ${props.cr_answer == index? "correct" : ""}`} onClick={(e) => handleClicks(e)}>{index}</button>)
    function handleClicks(e) {
       let tr = document.querySelectorAll(`.${props.id}`)
       for (let i=0; i < tr.length; i++) {
        tr[i].style.backgroundColor = 'transparent'

       }
       e.target.style.backgroundColor = '#D6DBF5'
       e.target.classList.add('chosen')
    }
    return (
        <div className="quiz">
            <p className="quiz--question">{props.question}</p>
            <div className="quiz--options">
                {btn}
            </div>
        </div>
    )
}