var startQuiz = document.querySelector(".startQuiz");
var timerDiv = document.querySelector(".countdown");
var timeCount = document.querySelector(".counter");
var questionArea = document.querySelector(".questionTxtArea");
var submitBtn = document.querySelector(".submitBtn");
var nextBtn = document.querySelector(".nextQ");
var input = document.createElement("input");
var br = document.createElement("br");
var newBtn = document.createElement("a");
var btnArea = document.querySelector(".btnArea");
var scoreboardLink = document.getElementById("checkScoreboard");

var timeUp = false;
var wrongAns = false;
var isDoneBefore = false;
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
    var timeInMinutes = 3;
    var currentTime = Date.parse(new Date());
    var deadline = new Date(currentTime + timeInMinutes*60*1000);

    var x = setInterval(function() { 
        var now = new Date().getTime(); 
        var t = deadline - now; 
        var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
        var seconds = Math.floor((t % (1000 * 60)) / 1000); 
        
        timeCount.textContent = leadingZero(minutes) +":" +leadingZero(seconds);

        if (t <= 0) { 
            clearInterval(x);
            timeUp = true;
            timerDiv.classList.add("invisible");
            showResults();            
        } 

        if(questionCount >= sortedQuestionsArr.length){
            clearInterval(x);
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

function showResults(){
    var beginOfResult = "";

    if (isDoneBefore===true){
        beginOfResult= "You've finished before the timer! You score is: " +score;
    } else{
        beginOfResult= "Times's up! Your score is: "+ score;
    }

    questionArea.textContent = beginOfResult;

    input.setAttribute("type", "type");
    input.setAttribute("value", "Initials");
    input.setAttribute("id", "initials")
    questionArea.appendChild(br)
    questionArea.appendChild(input);

    newBtn.textContent= "Submit";
    newBtn.classList.add("btn");
    newBtn.classList.add("btn-primary");
    newBtn.setAttribute("role", "button");
    newBtn.setAttribute("id", "initialsSubmit");
    newBtn.href = "#";

    submitBtn.remove();
    btnArea.appendChild(newBtn);

}

function scoreboardBtns(){
    var newBtn2 = document.createElement("a");
    var newBtn3 = document.createElement("a");

    newBtn2.textContent= "Clear Scoreboard";
    newBtn2.classList.add("btn");
    newBtn2.classList.add("btn-primary");
    newBtn2.setAttribute("role", "button");
    newBtn2.setAttribute("id", "clearScores");
    newBtn2.setAttribute("style", "text-align: center;");
    newBtn2.href = "#";

    newBtn3.textContent= "Take Quiz Again!";
    newBtn3.classList.add("btn");
    newBtn3.classList.add("btn-primary");
    newBtn3.setAttribute("role", "button");
    newBtn3.setAttribute("id", "retake");
    newBtn3.setAttribute("style", "text-align: center;");
    newBtn3.href = "#";

    btnArea.classList.add("text-center");
    btnArea.appendChild(br);
    btnArea.appendChild(newBtn2);
    btnArea.appendChild(newBtn3);

}

function showScoreboard(arr){
    if(arr != undefined && arr.length >0){
        var tbEl = document.createElement("table");
        var trEl = document.createElement("tr");
        var thEl = document.createElement("th");
        var thEl2 = document.createElement("th");
        var pEl2 = document.createElement("p")
        var userObj;

        btnArea.textContent = "";
        questionArea.textContent="";

        pEl2.textContent ="ScoreBoard";
        pEl2.classList.add("lead");
        pEl2.setAttribute("style", "text-align: center;");
        questionArea.appendChild(pEl2);
        questionArea.appendChild(br);
        
        thEl.textContent= "User";
        thEl2.textContent = "Score";
        thEl.setAttribute("style", "padding: 10px; text-align: center;");
        thEl2.setAttribute("style", "padding: 10px; text-align: center;");
        tbEl.setAttribute("style", "margin: 0 auto; width: 50%; border: 1px solid black;border-collapse: collapse;");

        trEl.appendChild(thEl);
        trEl.appendChild(thEl2);
        tbEl.appendChild(trEl);
        
        for(var i = 0; i<arr.length;  i++){
            userObj = arr[i];
            var trEl2 = document.createElement("tr");

            for(const user in userObj){
                var tdEl1 = document.createElement("td");
                
                tdEl1.textContent = userObj[user];
                tdEl1.setAttribute("style", "text-align: center;")
                trEl2.appendChild(tdEl1);
            }
            
            tbEl.appendChild(trEl2);
        }

        questionArea.appendChild(tbEl);
    } else {
        btnArea.textContent ="",
        questionArea.setAttribute("style", "text-align: center;");
        questionArea.classList.add("lead");
        questionArea.textContent = "Scoreboard Empty!";
    }

    timerDiv.classList.add("invisible");
    scoreboardBtns();
}

function getScoreboard(initial){
    var currentUser = {user: initial, result: score};
    var jsonStr;
    var retrievedUsers = [];

    if("user" in localStorage && initial!=null){  
        //console.log("Found Users")
        jsonStr =localStorage.getItem("user");
        retrievedUsers = JSON.parse(jsonStr);
        retrievedUsers.push(currentUser);
        localStorage.setItem("user", JSON.stringify(retrievedUsers));
        //console.log(retrievedUsers)
    };

    if (localStorage.getItem("user") === null && initial !=null){
        //console.log("First time");
        retrievedUsers.push(currentUser);
        localStorage.setItem("user", JSON.stringify(retrievedUsers));
        jsonStr = localStorage.getItem("user");
        //console.log(retrievedUsers)
    };

    if (initial === null || initial === undefined){
        jsonStr =localStorage.getItem("user");
        retrievedUsers = JSON.parse(jsonStr);
    }

    showScoreboard(retrievedUsers);
    //console.log("made it to getScoreBoard");

}

function submitInitials(){
    var initials = document.getElementById("initials");
    var userInitials = "";

    userInitials = initials.value 
    //console.log(userInitials)
    getScoreboard(userInitials);
}

function submitAnswers(){
    checkAnswers(questionCount);
    questionCount++;

    nextBtn.classList.remove("invisible");
    submitBtn.classList.add("invisible");
}

function nextQuestion(){
    questionArea.textContent ="";

    if (timeUp===false && (questionCount<sortedQuestionsArr.length)){
        loadQuizQuestion();    
        nextBtn.classList.add("invisible");
        submitBtn.classList.remove("invisible");
    }  else{
        isDoneBefore = true;
        nextBtn.classList.add("invisible");
        btnArea.textContent = "";
        showResults();
    }
}

function deleteLocalStorage(){
    var clearScoreBoard = [];
    localStorage.removeItem("user");
    showScoreboard(clearScoreBoard);
}

function refreshPage(){
    location.reload();
}

function initializeQuiz(){
    questionArea.innerHTML = "";
    timerDiv.classList.remove("invisible");
    startQuiz.remove();
    scoreboardLink.remove();
    timerStart();
    loadQuizQuestion();
}

//Event Listener
btnArea.addEventListener("click",(event)=>{
    event.preventDefault();
    var eventID = event.target.id;

    switch (eventID){
        case "startBtn":
            initializeQuiz();
            break;
        case "initialsSubmit":
            submitInitials();
            break;
        case "submitBtn":
            submitAnswers();
            break;
        case "nextQ":
            nextQuestion();
            break;
        case "clearScores":
            deleteLocalStorage();
            break;
        case "retake":
            refreshPage();
            break;
        case"checkScoreboard":
            getScoreboard();
            break;

    }
})