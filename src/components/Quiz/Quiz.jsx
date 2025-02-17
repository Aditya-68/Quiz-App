import React, { useRef, useState } from 'react'
import './Quiz.css'
import data from '../../assets/question'

export default function Quiz() {
    
    // console.log();
    let [idx,setIdx]=useState(0);
    let [question,setQuestion]=useState(data[idx])
    let [lock,setLock]=useState(false);
    let [score,setScore]=useState(0);
    let[res,setRes]=useState(false);

    let option1=useRef(null);
    let option2=useRef(null);
    let option3=useRef(null);
    let option4=useRef(null);
    let option_array=[option1,option2,option3,option4]

    const checkAns=(e,ans)=>{
        if(lock===false){

            if(question.ans===ans){
                e.target.classList.add("correct")
                setLock(true);
                setScore(pre=>pre+1);
            }else{
                e.target.classList.add("wrong")
                setLock(true);
                let correctIndex = parseInt(question.ans.replace("option", "")) - 1; // ✅ Convert "optionX" to index
                option_array[correctIndex].current.classList.add("correct");
            }
        }
    }
    const next=()=>{
        if(lock===true){
            if(idx===data.length-1){
                setRes(true);
                return 0;
            }
            setIdx(++idx);
            setQuestion(data[idx]);
            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("wrong")
                option.current.classList.remove("correct")
            })
        }
    }

    const reset=()=>{
        setIdx(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setRes(false);
    }

  return (
    <div className='container'>
        <h1>Quiz App</h1><hr />
        {res ? <></>:<>
        <h2>{idx+1}. {question.question}</h2>
        <ul>
            <li  ref={option1} onClick={(e)=>{checkAns(e,"option1")}}>{question.option1}</li>
            <li  ref={option2} onClick={(e)=>{checkAns(e,"option2")}}>{question.option2}</li>
            <li ref={option3}  onClick={(e)=>{checkAns(e,"option3")}}>{question.option3}</li>
            <li ref={option4}  onClick={(e)=>{checkAns(e,"option4")}}>{question.option4}</li>
            
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">
            {idx+1} of {data.length} question
        </div>
        </>}
        {res?<>
        <h2>You Scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button>
        </>:<></>}
    </div>
  )
}
