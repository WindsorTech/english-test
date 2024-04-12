$(document).ready(function () {

// Game Variables
var currentQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var quizOver = false;

// Array of objects with questions data
var questions = [{
    question: "1. Michelle ____ from France.",
    choices: ["are", "is", "am", "be"],
    text: "Michelle <u><b>is</b></u> from France",
    correctAnswer: 1
}, {
    question: "2. What is ____ name?",
    choices: ["he", "him", "his", "you"],
    text: "What is <u><b>his</b></u> name?",
    correctAnswer: 2
}, {
    question: "3. I ____ eighteen years old.",
    choices: ["have", "am", "got", "do"],
    text: "I <u><b>am</b></u> eighteen years old.",
    correctAnswer: 1
}, {
    question: "4. My friend ____ in London.",
    choices: ["living", "live", "livings", "lives"],
    text: "My friend <u><b>lives</b></u> in London.",
    correctAnswer: 3
}, {
    question: "5. Where ____?",
    choices: ["works Tom", "does Tom work", "Tom does work", "Tom works"],
    text: "Where <u><b>does Tom work</b></u>?",
    correctAnswer: 1
}, {
    question: "6. I ____ coffee.",
    choices: ["not like", "like don't", "no like", "don't like"],
    text: "I <u><b>don't like</b></u> coffee.",
    correctAnswer: 3
}, {
    question: "7. Tokyo is ____ city I’ve ever lived in.",
    choices: ["the biggest", "the bigger", "the most big", "the more big"],
    text: "Tokyo is <u><b>the biggest</b></u> city I’ve ever lived in.",
    correctAnswer: 0
}, {
    question: "8. ____ did the Beatles record their first song?",
    choices: ["What", "Who", "When", "Which"],
    text: "<u><b>When</b></u> did the Beatles record their first song?",
    correctAnswer: 2
}, {
    question: "9. It's my birthday ____ Friday.",
    choices: ["in", "at", "by", "on"],
    text: "It's my birthday <u><b>on</b></u> Friday.",
    correctAnswer: 3
}, {
    question: "10. I ____ study English tomorrow.",
    choices: ["did", "does", "will", "are"],
    text: "I <u><b>will</b></u> study English tomorrow.",
    correctAnswer: 2
}];

    // Hide other buttons on Start screen
    $(".checkButton").hide();
    $(".nextButton").hide();
    $(".resultButton").hide();
    $(".playAgainButton").hide();
    $(".q-title").hide();

    // On the click of the Start Button - start the game
    $(".start-button").click(function(){

        // Set up game environment
        $(".start-button").hide();
        $(".quizMessage").hide();
        $(".checkButton").show();
        $(".q-title").show();
        $(".answer-container").hide();

        // Call the function to display first question
        displayCurrentQuestion();
    });

    // On the click of the Check button
    $(".checkButton").click(function(){

        // Get input answer from user
        value = $("input[type='radio']:checked").val();

            // if the user did not select any options, tell him to do so
           if (value == undefined) {

                $(".quizMessage").html("<font color='#2f6ce0'>Please select an answer above</font>");
                $(".quizMessage").show();

            } else { //If an answer was selected, call the function to check the answer

                checkAnswer();
            }
    });

//====================== Game Functions ================//  


// Function to display current question and choices
function displayCurrentQuestion() {

    // Variables to access the object data to create questions and choices
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("ul").remove();

    // Loop through the numChoices array to create answer options
    var choice;

    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<ul><input type="radio" value=' + i + ' name="dynradio" /> ' + choice + '</ul>').appendTo(choiceList);
    }
}


//========================================================//

    // Function to check if user answer is right or wrong
    function checkAnswer() {

        // Get input choice from user
        value = $("input[type='radio']:checked").val();

        $(".answer-container").show();
                
                // if the user answer is correct     
                if (value == questions[currentQuestion].correctAnswer) {

                    // Add to the score
                    correctAnswers++;

                    // Hide and show appropriate elements to display answer screen
                    $(".question").hide();
                    $(".choiceList").hide();
                    $(".quizMessage").hide();
                    $(".q-title").hide();

                    $(".answer-msg").html("<font color='#00b300'>CORRECT ANSWER!</font>");
                    $(".answer-msg2").html(questions[currentQuestion].text);

                    $(".checkButton").hide();
                    $(".nextButton").show();

                } else { // if the user answer is wrong

                    // Add to the score
                    wrongAnswers++;

                    // Hide and show appropriate elements to display answer screen
                    $(".question").hide();
                    $(".choiceList").hide();
                    $(".quizMessage").hide();
                    $(".q-title").hide();

                    $(".answer-msg").html("<font color='#ff0000'>WRONG ANSWER!</font>");
                    $(".answer-msg2").html(questions[currentQuestion].text);

                    $(".checkButton").hide();
                    $(".nextButton").show();
                } 

                // Increase currentQuestion so the game moves on to the next question
                currentQuestion++;  

                // If the game is at the last question, show the Result button
                if (currentQuestion == 10) {
                    $(".nextButton").hide();
                    $(".resultButton").show();
                }

                // When the Next button is clicked, go on to next question
                $(".nextButton").click(function(){
                    nextQuestion();                                     
                });

                // When the Result button is clicked, show the results
                $(".resultButton").click(function(){
                    finalResult();                                     
                });   

    }

//========================================================//

    // Function to move the game on to the next question
    function nextQuestion() {

            // Set up game environment - hide and show appropriate elements
            $(".q-title").show();
            $(".question").show();
            $(".choiceList").show();
            $(".checkButton").show();

            $(".start-button").hide();
            $(".quizMessage").hide();
            $(".answer-container").hide();
            $(".nextButton").hide();

            // Call the function to display first question
            displayCurrentQuestion();

    }

//========================================================//

    // Function to display results at the end of game
    function finalResult() {

        // Hide and show appropriate elements on page
        $(".start-button").hide();
        $(".quizMessage").hide();
        $(".question").hide();
        $(".q-title").hide();
        $(".choiceList").hide();
        $(".checkButton").hide();
        $(".nextButton").hide();
        $(".resultButton").hide();

        $(".playAgainButton").show();
        $(".answer-container").show();

        // Display results texts on page
        $(".answer-msg").text("RESULTS");
        $(".answer-msg2").html("<p>Correct Answers: " + correctAnswers + "</p><p>Wrong Answers: " + wrongAnswers + "</p>");

        // Display results final advice, depending on user score
        if (correctAnswers <= 2 ) {

            $(".answer-gif").text("You need to study more!");

        } else if (correctAnswers > 2 && correctAnswers <= 5) {

            $(".answer-gif").text("Not a bad job, but you can do better!");

        } else if (correctAnswers > 5 && correctAnswers <= 7) {

            $(".answer-gif").text("You know English, just pay attention to the details!");

        } else if (correctAnswers > 7 && correctAnswers <= 9) {

            $(".answer-gif").text("Great job, you are almost at the top. Keep practicing!");
            
        } else if (correctAnswers > 9) {

            $(".answer-gif").text("You are awesome, all your answers were correct. Congratulations!");
            
        }

        // On the click of the Play Again button, restart game
        $(".playAgainButton").click(function(){
                restartGame();                                     
        });  

}


//========================================================//

    // Function to restart game
    function restartGame() {

         location.reload();
}

});