angular.module("SpeakingInCode")
    .controller("ExerciseController", exerciseCtrl);

exerciseCtrl.$inject = ['SICFactory'];

function exerciseCtrl(SICFactory) {
    var eCtrl = this; 
    window.eCtrl = eCtrl; // leaking the controller to the window for debugging purposes
    eCtrl.exercise = {}; 
    eCtrl.speakInstructions = function() {
        console.log('speaking instructions');
        window.responsiveVoice.speak(eCtrl.exercise.instructions, "US English Female",{rate:0.8},{volume: 2});
    }
    // eCtrl.exercise.solutions = [""];
    eCtrl.exercise.answers = [""];
    // eCtrl.addSolution = function() {
    //     console.log("Adding solutions");
    //     eCtrl.exercise.solutions.push("");
    // }
    eCtrl.addAnswer = function() {
        console.log("Adding solutions");
        eCtrl.exercise.answers.push("");
    }
        console.log(eCtrl.exercise.answers);
    eCtrl.createExercise = function() {
        console.log("Trying to create an exercise!");
         for (i = 0; i <eCtrl.exercise.answers.length;i++){
        eCtrl.exercise.answers[i] = eCtrl.exercise.answers[i].toLowerCase().split(" ").join("");
        document.getElementById('exampleSelect1').value = "";
        document.getElementById('exampleTextarea').value = "";
        document.getElementById('answers').value = "";
        document.getElementById('nameHolder').value = " ";
        
        // call the factory method to perform the $http request
        SICFactory.createExercise()
            .then(function(success){
                console.log("Success submitting Exercise: ", success.data);
            }, function(error) {
                console.log("Error submitting Exercise: ", error); 
            });
    }
}};
