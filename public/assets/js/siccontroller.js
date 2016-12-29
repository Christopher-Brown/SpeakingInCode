angular.module('SpeakingInCode')

.controller('SICController', sicCtrl);
sicCtrl.$inject = ["SICFactory"];
var appShow = true;

function sicCtrl (SICFactory){
    var sCtrl = this;
        console.log("sCtrl Functioning!");
        console.log('FROM THE FACTORY : ', SICFactory);
    // sCtrl.listOfExercises = SICFactory.exerciseList;
    //     console.log("this is the list",sCtrl.listOfExercises);
    //     this.submit1 = true;
    //     this.switch = function(){
    //         this.submit1 = false;
    //         return this.submit1;
    //     };
    sCtrl.appsuccess = false;
    sCtrl.appShow = true;
    sCtrl.typeShow = true;
    sCtrl.exercise = {};
    sCtrl.exerciseData = {};
    sCtrl.challenge = {};
    sCtrl.submission = "";
    // sCtrl.getChallenge = function(){
    //     sCtrl.getExercise();
    //     sCtrl.challenge = sCtrl.exerciseData[Math.floor(Math.random() * sCtrl.exerciseData.length)]
    //     console.log("current challenge:",sCtrl.challenge);
    // }

    sCtrl.doSomething = function() {
        console.log('testing voice');
        window.responsiveVoice.speak(sCtrl.challenge.instructions, "US English Female",{rate:0.8},{volume: 2});
    }
    sCtrl.giveHint = function() {
        console.log('testing hint');
        window.responsiveVoice.speak(sCtrl.challenge.hint, "US English Female",{rate:0.8},{volume: 2});
    }
        sCtrl.pause = function() {
        window.responsiveVoice.cancel();
        console.log("canceling audio playback");
    }

    sCtrl.getExercise = function() {
        console.log("Getting an exercise : ",sCtrl.exercise.type, sCtrl.exercise.difficulty);

        // call the factory method to perform the $http request
        SICFactory.getExercise(sCtrl.exercise.type,sCtrl.exercise.difficulty)
        .then(function(success){
                console.log("Success getting exercise: ", success.data);

                // set the returned data to a property on our controller so we can display it in the html
               sCtrl.exerciseData = success.data;
                sCtrl.challenge = sCtrl.exerciseData[Math.floor(Math.random() * sCtrl.exerciseData.length)]
                console.log("current challenge:",sCtrl.challenge);
            }, function(error) {
                console.log("Error submitting user: ", error); 
            });
 }
//        switch(sCtrl.difficulty){
//            case "easy":
//                 var easyArray = sCtrl.listOfExercises.filter(function(element){
//                  return element.difficulty === "easy"
//                 });
//                 sCtrl.challenge = easyArray[Math.floor(Math.random() * easyArray.length)]
//                 console.log(sCtrl.challenge);
//                 console.log(sCtrl.challenge.instruction);
       
//             break;
//             case "medium":
//                 var mediumArray = sCtrl.listOfExercises.filter(function (element){
//                     return element.difficulty === "medium"
//                 });
//                 sCtrl.challenge = mediumArray[Math.floor(Math.random() * mediumArray.length)]
//                 console.log(sCtrl.challenge);
//                 console.log(sCtrl.challenge.instruction);
 
//             break;
//             case "hard":
//                 var hardArray = sCtrl.listOfExercises.filter(function (element){
//                     return element.difficulty === "hard"
//                 });
//                 sCtrl.challenge = hardArray[Math.floor(Math.random() * hardArray.length)]
//                 console.log(sCtrl.challenge);
//                 console.log(sCtrl.challenge.instruction);
//       }
   
    sCtrl.winCheck = function(){
        if(sCtrl.submission){
            var answerkey = sCtrl.challenge.answers;
            var checker = sCtrl.submission.toLowerCase().split(" ").join(""); 
            function arrayContains(checker, answers){
            return (answers.indexOf(checker) > -1);
        }  
        }
        if (answerkey.indexOf(checker) >= 0) {
            console.log("Pass!")
            sCtrl.toggle3();
            document.getElementById('answerText').value = "";
        }   else {
            console.log("Fail Motherfucker");
            alert("Try again Motherfucker");

        }
        console.log(answerkey)
        console.log("running checker!")
        console.log(checker);
    }
//     sCtrl.cancel = function() {
//         window.responsiveVoice.cancel();
//         console.log("canceling audio playback");
//     }


    sCtrl.toggle2 = function() {
        if(sCtrl.exercise.difficulty){
            sCtrl.appShow = !sCtrl.appShow
        } else{
            console.log("Trying to submit type")
        }
    }
    sCtrl.toggle1 = function() {
        console.log("Running")
        if(sCtrl.exercise.type) {
            sCtrl.typeShow = !sCtrl.typeShow
        }else{
            console.log("Trying to submit type")
        }
    }
    sCtrl.toggle3 = function() {
        console.log("Running")
       sCtrl.appsuccess = !sCtrl.appsuccess
    }

}
