var startQuiz = document.querySelector(".startQuiz");
var timerDiv = document.querySelector(".countdown");
var timeCount = document.querySelector(".counter");
var questionArea = document.querySelector(".questionTxtArea");
var submitBtn = document.querySelector(".submitBtn");
var nextBtn = document.querySelector(".nextQ");

var timeUp = false;
var wrongAns = false;
var isDone = false; 
var questionCount = 0;
var score = 0;
var sortedQuestionsArr = sortArr(questionArr);

function leadingZero(num){
    if (num < 10 && num >= 0)
        return '0' + num;
    else
        return num;
}

function timerStart(){
    var timeInMinutes = 1;
    var currentTime = Date.parse(new Date());
    var deadline = new Date(currentTime + timeInMinutes*60*1000);

    var x = setInterval(function() { 
        var now = new Date().getTime(); 
        var t = deadline - now; 
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
        var seconds = Math.floor((t % (1000 * 60)) / 1000); 
        
        timeCount.textContent = leadingZero(minutes) +":" +leadingZero(seconds);

        if (t <= 0) { 
            clearInterval(x)
            questionArea.textContent = "Quiz over"
            timeUp = true;
            timerDiv.classList.add("invisible");
            showResults();
        } 

        if(questionCount >= sortedQuestionsArr.length){
            clearInterval(x);
            showResults();
        }

        if (wrongAns === true){
            //console.log(deadline);
            deadline.setSeconds(deadline.getSeconds() -15 );
            wrongAns = false;

        }

    }, 1000);

}



function sortArr(arr){
    arr= arr.sort(function (a, b) {  
        return 0.5 -Math.random();
    });
    return arr;
}

function loadQuestionOptions(){
    var output = [];
    var answers = sortedQuestionsArr[questionCount].options;
    //console.log(answers);

    for(letter in answers){
        output.push(`<label>` + `<input type="radio" name="question:${questionCount}" value="${letter}">` +" "+answers[letter] +`</label>`);
        output.push(`<br>`)
    }

    questionArea.innerHTML += output.join(" ");

    //console.log(output)
}

function loadQuizQuestion(){
    submitBtn.classList.remove("invisible");

    var h1El = document.createElement("h1");
    var pEl = document.createElement("p");

    h1El.classList.add("lead");
    h1El.textContent = "Question: " +(questionCount+1);
    questionArea.append(h1El);

    pEl.textContent = sortedQuestionsArr[questionCount].question;
    questionArea.append(pEl)

    loadQuestionOptions();

}

function checkAnswers(count){
    var val;
    var questionName = "question:"+count;
    var radios = document.getElementsByName(questionName);
    var h1El = document.createElement("h1");

    h1El.classList.add("lead");

    for (var i=0; i<radios.length; i++){
        if (radios[i].checked){
            val = radios[i].value;
        }
    }

    if (val===sortedQuestionsArr[count].answer){
        score++;
        h1El.textContent ="Right!";
    } else{
        h1El.textContent ="Wrong";
        wrongAns=true;
        //console.log("Hey its the wrong answer and wrongAns = "+wrongAns);
    }

    questionArea.append(h1El);
}

//Event Listeners
startQuiz.addEventListener("click", (event)=>{
    event.preventDefault();
    questionArea.innerHTML = "";
    timerDiv.classList.remove("invisible");
    timerStart();
    loadQuizQuestion();
});

submitBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    checkAnswers(questionCount);
    questionCount++;

    nextBtn.classList.remove("invisible");
    submitBtn.classList.add("invisible");

})

nextBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    questionArea.textContent ="";

    if (timeUp===false && (questionCount<sortedQuestionsArr.length)){
        loadQuizQuestion();    
        nextBtn.classList.add("invisible");
        submitBtn.classList.remove("invisible");
    }  else{
        questionArea.textContent= "You've finished before the timer! You score is: " +score;
        nextBtn.classList.add("invisible");
        isDone=true;
    }
})