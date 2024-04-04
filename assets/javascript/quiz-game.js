$(document).ready(function () {

// Game Variables
var currentQuestion = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var quizOver = false;

// Array of objects with questions data
var questions = [{
    question: "1. Michelle ____ from France",
    choices: ["are", "is", "am", "be"],
    text: "Michelle <u><b>is</b></u> from France",
    correctAnswer: 1
}, {
    question: "2. What is ____ name?",
    choices: ["you", "his", "him", "he"],
    text: "What is <u><b>his</b></u> name?",
    correctAnswer: 1
}, {
    question: "3. What is the capital city of Australia?",
    choices: ["Melbourne", "Sydney", "Canberra", "Adelaide"],
    text: "Canberra is the capital of Australia",
    correctAnswer: 2
}, {
    question: "4. In what continent is Chile located?",
    choices: ["Central America", "Asia", "South America", "Europe"],
    text: "Chile is located on the western coast of South America",
    correctAnswer: 2
}, {
    question: "5. What is the currency of Brazil?",
    choices: ["Brazilian Real", "Brazilian Dollar", "Brazilian Peso", "Brazilian Crown"],
    text: "Brazil's official currency is called Real",
    correctAnswer: 0
}, {
    question: "6. Between what years did World War I take place?",
    choices: ["1904 - 1908", "1914 - 1918", "1929 - 1935", "1939 - 1945"],
    text: "World War I happened from 1914 to 1918",
    correctAnswer: 1
}, {
    question: "7. What is the world's most popular sport?",
    choices: ["Basketball", "Football", "Baseball", "Soccer"],
    text: "Soccer is the most popular sport in the world",
    correctAnswer: 3
}, {
    question: "8. What is Earth's approximate age?",
    choices: ["2.3 billion years", "3.6 billion years", "4.5 billion years", "5.2 billion years"],
    text: "Our planet Earth is approximately 4.5 billion years old",
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
                if (currentQuestion == 8) {
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

            $(".answer-gif").text("You need to improve your world knowledge, think outside the box!");

        } else if (correctAnswers > 2 && correctAnswers <= 4) {

            $(".answer-gif").text("Good job, but the world believes you can do better next time!");

        } else if (correctAnswers > 4 && correctAnswers <= 6) {

            $(".answer-gif").text("Awesome job, stay curious and you will conquer the world!");

        } else if (correctAnswers > 6) {

            $(".answer-gif").text("You are a world master! Have you thought about running for president?!");
            
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