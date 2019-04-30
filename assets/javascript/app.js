
multipeChoiceQuestion = [
    {
        question: "Which function is a synonym for on()?",
        options: ["addListener()", " listeners()", "once()", "add()"],
        answer: "addListener()",
        expl: "The on() method is used for registering handlers. addListener() is a synonym for on()."
    },
    {
        question: "When do uncaught exceptions generate events?",
        options: ["When handlers are registered", "When handlers are deregistered", "When handler functions are called", "When handlers do not have a matching catch clause"],
        answer: "When handlers are registered",
        expl: ""
    },
    {
        question:"JavaScript is invented by",
        options: ["Brendan Eich", "Helsinki, Linus", "W3 Group", "James Gosling"],
        answer: "Brendan Eich",
        expl: ""
    },
    {
        question:"JavaScript was invented at _______ Lab",
        options: ["Sun Microsystem", "AT&T Bell LAb", "Netscape", "Google Lab"],
        answer: "Netscap",
        expl: ""
    },
    {
        question:"JavaScript was originally developed under the name",
        options: ["Mocha", "ActionScript", "Sencha", "Oak"],
        answer: "Mocha",
        expl: ""
    },
    {
        question:"Microsoft Developed a compatible dialect of JavaScript called _____________.",
        options: ["MS JavaScript", "MJavaScript", "Advanced JavaScript", "JScript"],
        answer: "JScript",
        expl: ""
    },
    {
        question:"Why so JavaScript and Java have similar name?",
        options: ["JavaScript is a stripped-down version of Java", "JavaScript's syntax is loosely based on Java's", " They both originated on the island of Java", "None of the above"],
        answer: "JavaScript's syntax is loosely based on Java's",
        expl: ""
    },
    {
        question:"How does JavaScript store dates in a date object?",
        options: ["The number of milliseconds since January 1st, 1970", "The number of days since January 1st, 1900", " The number of seconds since Netscape's public stock offering.", "None of the above"],
        answer: "The number of milliseconds since January 1st, 1970",
        expl: ""
    },
    {
        question:"JavaScript was originally developed under the name",
        options: ["Mocha", "ActionScript", "Sencha", "Oak"],
        answer: "Mocha",
        expl: ""
    },
    {
        question:"JavaScript was originally developed under the name",
        options: ["Mocha", "ActionScript", "Sencha", "Oak"],
        answer: "Mocha",
        expl: ""
    },
    {
        question:" Choose the client-side JavaScript object?",
        options: ["Database", "Cursor", "Client", "FileUpLoad"],
        answer: "FileUpLoad",
        expl: ""
    },
    


]

//global variable here
let timeInterQuestId, maxTimeoutId = 0;
let question = "";
let counter = 0;
let alreadyGene = [];
const ImgTimeOut = "https://media.giphy.com/media/l4FGsc1IthILA1esE/giphy.gif";
const ImgWrongAnswer = "https://media.giphy.com/media/EaxciIRvOziSY/giphy.gif";
const ImgCorrectAnswer ="https://media.giphy.com/media/k48soGtCrLqZq/giphy-downsized.gif";
const textTimeOut = "Ooupsss, Time Out!";
const textWrongOut = "Sorry, your answer is not corret!";
const textCorrectOut = "Good Job, You got right!";
let score = 0; 



function getOptions(options) {
    return options.map(function (opt) {
        console.log(opt);
        return `
        <div class="card btnOption" data-option=${opt}>
            <div class="card-body"> ${opt}</div>
        </div>`
    });
}

function QuestionGenerator() {
    let ind = Math.floor(Math.random() * multipeChoiceQuestion.length);
    while (alreadyGene.length < multipeChoiceQuestion.length && alreadyGene.includes(ind)) {
        ind = Math.floor(Math.random() * multipeChoiceQuestion.length);
    }
    console.log("ind = " + ind);
    alreadyGene.push(ind);
    if (alreadyGene.length > multipeChoiceQuestion.length) {
        return null;
    } else {
        return multipeChoiceQuestion[ind];
    }

}

function displayQuestion(counter, question) {

     return `
        <div>
        <div class="progress">
            <div class="progress-bar progress-bar-danger"  id ="questProgBar" role="progressbar" aria-valuenow="0"
            aria-valuemin="0" aria-valuemax="100" style="width:0%">
          0%
        </div>
        </div>
            <div class="card questionBlock">
                <div class="card-body">
                    <h4 class="card-title">Time Remaining is 
                        <span class="badge badge-primary timeRem">${counter}</span>
                        seconds
                    </h4>
                    <p class="card-text">${question.question}</p>
                </div>
            </div>
            <div>
                ${getOptions(question.options)}
            </div>
        </div>`;
    
}

function displaySolution(answer, textdesc, imgurl){
    const disp =  (`<div class="card">
        <div class="card-body">
            <h3 class="card-title">${textdesc}</h3>
            <p class="card-text">The solution is :${answer}</p>
        </div>
        <img class="card-img-bottom imgSolution" src=${imgurl} alt="Card image" >
        </div>` );
    return disp;
} 

function playGame() {
    counter = 10;
    question = QuestionGenerator();
    if(question){
        $("#main").html(displayQuestion(counter, question));
        timeInterQuestId = setInterval(function () {
            counter--;
            $(".timeRem").text(counter);
            let progbar = 100-(counter/10)*100
            $("#questProgBar").attr("style", "width:"+progbar+"%" );
            $("#questProgBar").text(progbar+"%");
        }, 1000);
        
        maxTimeoutId = setTimeout(function () {
            clearInterval(timeInterQuestId);
            $("#main").html(displaySolution(question.answer, textTimeOut, ImgTimeOut));
            setTimeout(function () {
                clearTimeout(maxTimeoutId);
                
                playGame();
            }, 2000);
        }, 10000); 
    }else{
        $("#main").html(gameOver(score));
        score = 0;
        alreadyGene = [];
    }
    
}

function gameOver(score){
    return `<div>
        <h1>Game over</h1>
        <p>Your score is ${Math.floor((score/multipeChoiceQuestion.length)*100)} % </p>
    </div>
    <div class="card bg-primary text-white">
        <div class="card-body start text-center">Play Again</div>
    </div> `
}
    

$(document).ready(function () {
    $("#main").on("click", ".start", function () {
        playGame();
    });

    $("#main").on("click", ".btnOption", function () {
        clearInterval(timeInterQuestId);
        clearTimeout(maxTimeoutId);
        let userAnswer = $(this).attr("data-option");
        if (userAnswer === question.answer && counter > 0) {
            score++;
            $("#main").html(displaySolution(question.answer, textCorrectOut, ImgCorrectAnswer));
            setTimeout(function () {
                playGame();
            }, 2000);
        } else {
            $("#main").html(displaySolution(question.answer, textWrongOut, ImgWrongAnswer));
            setTimeout(function () {
                playGame();
            }, 2000);
        }
    });


    

});