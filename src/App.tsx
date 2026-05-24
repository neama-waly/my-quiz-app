/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import './App.css'

//-----------------------------
interface Question{
  id : number ;
  questiontext : string ;
  options : string[];
  correctAnswer : string ;
}
//-----------------------------
const QuizQuestions : Question[] = [
  {
    id : 1 ,
    questiontext : "How long does it take for light from the sun to reach Earth",
    options : ["8 Seconds","8 Minutes","8 Hours","Instantly"],
    correctAnswer : "8 Minutes"
  },
  {
    id : 2 ,
    questiontext : "What is the primary gas that makes up the atmosphere of Mars",
    options : ["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"],
    correctAnswer : "Carbon Dioxide"
  },
  {
    id : 3 ,
    questiontext : "Which famous mathematician is known as the 'Father of Geometry'",
    options : ["Pythgors","Einstein","Newton","Euclid"],
    correctAnswer : "Euclid"
  },
  {
    id : 4 ,
    questiontext : "What is the only number that cannot be represented by Roman numerals",
    options : ["One","One Million","Zero","Infinity"],
    correctAnswer : "Zero"
  },
  {
    id : 5 ,
    questiontext : "Which organ in the human body is capable of completely regenerating it self from just 25% of it's original tissue",
    options : ["The Brain","The Heart","The Lungs","The Liver"],
    correctAnswer : "The Liver"
  }
]

//-----------------------------
function App() {
  const [currentquestionindex , setcurrentquestionindex] = useState<number>(0);
  const [score , setscore] = useState<number>(0);
  const [showResult , setshowResult] = useState<boolean>(false);
  const currentQuestion = QuizQuestions[currentquestionindex];
  const [selectedanswer , setselectedanswer] = useState<string>("");

  const handleAnswerclick = (selectedOption : string) =>{
    if(selectedanswer)return;
    setselectedanswer(selectedOption);
    if(selectedOption === currentQuestion.correctAnswer){
      setscore(score +1);
    }

  setTimeout(()=>{
    setselectedanswer(""); 
   const nextQuestion = currentquestionindex + 1 ;
    if(nextQuestion < QuizQuestions.length){
      setcurrentquestionindex(nextQuestion);
    }else{
      setshowResult(true);
    }
  },1000);
};

  return (
    <>
    <div className='container'>
      <h1 className='title'>Question Quiz :) </h1>
      <p className='line'></p>
      <p className='headline'>LET US SEE HOW SMART U ARE </p>
      {!showResult ? (
        <div className='questions'>
          <div className='questiontext'>
            {currentQuestion.questiontext}?
           </div>
           <div className='choices'>
              {currentQuestion.options.map((option,index)=>{

                let buttonclass = '';
                if(selectedanswer === option){
                  buttonclass = (option ===currentQuestion.correctAnswer)? "correct" : "wrong" ;
                }
                return(
                  <button key={index}
                  className={buttonclass}
                  disabled = {!!selectedanswer}
                onClick={()=> handleAnswerclick(currentQuestion.options[index])}
                >{option}</button>
                )

})}

          </div> 
       </div>
      ):(
        <div className='results'>
          <p className='finished'>QUIZ FINISHED 🥳</p>
          <p className='score'>YOUR SCORE IS {score} OUT OF {QuizQuestions.length}</p>
          <button className='tryagain' 
          onClick={()=>{
            setcurrentquestionindex(0);
            setscore(0);
            setshowResult(false);
          }}
         
          >Try again</button>
        </div>
      )}
      
    </div>
    
    </>
  )
}

export default App
