var startQuiz = document.querySelector(".startQuiz");
var timerDiv = document.querySelector(".countdown");
var timeCount = document.querySelector(".counter");
var questionArea = document.querySelector(".questionTxtArea")

var timeUp = false;

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

        if (t < 0) { 
            clearInterval(x); 
            questionArea.textContent = "Test over"
            timeUp = true;
            timerDiv.classList.add("invisible");
        } 

    }, 1000);
}

startQuiz.addEventListener("click", (event)=>{
    questionArea.innerHTML = "";
    timerDiv.classList.remove("invisible");
    timerStart();
});