//Start Section
let set=1;  //choose difficulty
let store=[]; //store answer
let d=30; //Quiz Timer
let bong = ["fail","Poor","Bad","Good","Strong","Very Strong"]; //reportscard on the basic of correct-qus
let start = document.querySelector("#start");
let level1 = document.querySelector("#level1");
let level2 = document.querySelector("#level2");
let level3 = document.querySelector("#level3");
let level = document.getElementsByClassName("level");
//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices Of Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");
//Answersheet
let qusans = document.querySelector("#qusans")

//Get All 'H4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".choice_que");


let index = 0;
let timer = 0;
let interval = 0;

//total points
let correct = 0;

//store Answer Value
let UserAns = undefined;


//comunicating with server all code will be iside to make it global
$(function() {
    var MCQS;
    $.get( "/sample-api", function( data ) {
        MCQS=data;


//what happen when 'Start' Button Will Click
start.addEventListener("click", () => {
    start.style.display = "none";
    level1.style.display = "block";
    level2.style.display = "block";
    level3.style.display = "block";

});

level1.addEventListener("click", () => {
    set=1
    level1.style.display = "none";
    level2.style.display = "none";
    level3.style.display = "none";
    guide.style.display = "block";
});

level2.addEventListener("click", () => {
    set=2
    level1.style.display = "none";
    level2.style.display = "none";
    level3.style.display = "none";
    guide.style.display = "block";
});
level3.addEventListener("click", () => {
    set=3
    level1.style.display = "none";
    level2.style.display = "none";
    level3.style.display = "none";
    guide.style.display = "block";
});

//what happen when 'Exit' Button Will Click
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});


//Creating Timer For Quiz Timer Section

let countDown = () => {
    if (timer === d-1){
      $("#option"+(MCQS[set-1][index].answer+1)).fadeOut(500).fadeIn(500);
    };
    if (timer === d) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer++;
        time.innerText = d-timer;
    }
}

//setInterval(countDown,1000);

let loadData = () => {
    console.log(set-1,index);
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[set-1][index].question;

    option1.innerText = MCQS[set-1][index].choice1;
    option2.innerText = MCQS[set-1][index].choice2;
    option3.innerText = MCQS[set-1][index].choice3;
    option4.innerText = MCQS[set-1][index].choice4;
    store.push({
      question:MCQS[set-1][index].question,
      answer: document.querySelector("#option"+(MCQS[set-1][index].answer+1)).innerText
    });

    //    timer start
    timer = 0;
}

loadData();

//what happen when 'Continue' Button Will Click
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

    //    remove All Active Classes When Continue Button Will Click

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    total_correct.innerHTML = `${correct = 0} Out Of ${MCQS.length} Questions`;
});

choice_que.forEach((choices, choiceNo) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //check answer
        if (choiceNo === MCQS[set-1][index].answer) {
            correct++;
        } else {
            correct += 0;
        }
        //stop Counter
        clearInterval(interval);

        //disable All Options When User Select An Option
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

////what happen when 'Next' Button Will Click
next_question.addEventListener("click", () => {
    //    if index is less then MCQS.length
    if (index !== 4) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        //question
        loadData();

        //result
        total_correct.style.display = "block";
        total_correct.innerHTML = `${correct} correct Out Of ${5} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown,1000);
    } else {
        index = 0;


        //when Quiz Question Complete Display Result Section
        total_correct.style.display = "none";
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = `${bong[correct]}-[${correct}/5]`;
        //points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})

//what happen when 'Quit' Button Will Click
quit.addEventListener("click", () => {
    result.style.display = "none";
    qusans.style.display = "block";
    for(var i=1; i<=5; i++){
      document.querySelector("#qus"+i).innerHTML=i+") "+store[i].question;
      document.querySelector("#ans"+i).innerText="ans :"+store[i].answer;
    }
    document.querySelector("#finalReport").innerText = `Your Score: ${bong[correct]}-[${correct}/5]`;
    store=[];

});

//Start Again When 'Start Again' Button Will Clicked
startAgain.addEventListener("click", () => {
   level1.style.display = "block";
   level2.style.display = "block";
   level3.style.display = "block";
   result.style.display = "none";
});


}); //ending to comunicating server
});
