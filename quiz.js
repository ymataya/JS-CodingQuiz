var timer = document.querySelector(".timer");
var mainQuiz = document.getElementById("quiz");
var form = document.querySelector("form");
var secondsLeft = 30;
var askQuestion=document.querySelector(".ask");
var start=document.getElementById("start");
var next=document.getElementById("next");
var score=0;
var index=0;
var arrAnswers = [];
var lastScore = document.getElementById("lastUserScore");
var timerInterval;

function lastUserScore () {
    var userScore = localStorage.getItem("user")
    // console.log("user")
    lastScore.textContent="The last user scored: " + userScore;
}
lastUserScore ();

var questions=[
    {
        q:"What is a string data type?", 
        a:"text", 
        options: ["number","text","true","false"]

    },
    {
        q:"What do you use to check if your Javascript code works?", 
        a:"console.log()", 
        options: ["console.log()","loop () {}","alert()","var='check'"]

    },
    {
        q:"How many basic data types are there?", 
        a:"6", 
        options: ["3","8","12","6"]

    },
    {
        q:"Arrays are enclosed in what bracket?", 
        a:"[]", 
        options: ["{}","()","[]","||"]

    },
    {
        q:"What does '!==' mean?", 
        a:"not equal to", 
        options: ["add assignment","super equal to","average","not equal to"]

    }
    
]
//looking through first arrays with the questions and options
for (i=0; i<questions.length; i++) {
    //this is each object in our questions array
    // console.log(questions[i])
    //this is the question for each object in our array
    // console.log(questions[i].q)
    //this is the array of answers for each object
    // console.log(questions[i].options)

    //how we print out options
    for (j=0; j<questions[i].options.length; j++) {
        //console.log(questions[i].options[j])
    }

    //printing out answers
    //console.log(questions[i].a)
}

mainQuiz.style.display="none";

start.addEventListener("click",function () {
    mainQuiz.style.display = "block";
    start.style.display="none";

    // startTime ()
    //print questions and options to screen
    askQuestion.textContent=questions[index].q
    for (i=0; i<questions[index].options.length; i++) {
        var option = document.getElementById("option-" + i)
        //console.log(option);
        //console.log(questions[index].options[i]);
        option.textContent=questions[index].options[i];
    }
    index+=1 //take what number you give to the right and add it to the left  

    timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds left until the quiz is over.";
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000);
})

next.addEventListener("click",function () {
    //show that it's taking the user's answers everytime 'next question' is clicked
    var ele = document.getElementsByName('radio-options');
    for(i = 0; i < ele.length; i++) { 
        if (ele[i].checked) {
            console.log(ele[i])
            // console.log(arrAnswers) -> selected answers by user
            console.log(ele[i].value, questions[index-1].a)
            if (ele[i].value === questions[index-1].a) {
                score+=1;
                console.log(score)
            }
            else {
                secondsLeft--;
            }
        }
    }
    //stopping the quiz when questions are over
    if (index===questions.length-1) {
        alert("No more questions. Quiz ended. You scored: " + score + "/4");
        localStorage.setItem("user", score)
        lastUserScore ();
        sendMessage();
    } 

    else {
    askQuestion.textContent=questions[index].q
    for (i=0; i<questions[index].options.length; i++) {
        var option = document.getElementById("option-" + i)

        if(i === 0) {
            var radioOption=document.getElementById("option-a")
        }
        if(i === 1) {
            var radioOption=document.getElementById("option-b")
        }
        if(i === 2) {
            var radioOption=document.getElementById("option-c")
        }
        if(i === 3) {
            var radioOption=document.getElementById("option-d")
        }

        // console.log(questions[index].options[i]);
        option.textContent=questions[index].options[i];
        radioOption.removeAttribute("value")
        radioOption.setAttribute("value", questions[index].options[i]);
    }
}
    index+=1 
})

function sendMessage() {
    clearInterval(timerInterval);
    timer.textContent = "Time's Up! Your test is over.";
    mainQuiz.textContent = " ";
}
