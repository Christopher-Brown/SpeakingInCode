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
    sCtrl.options = false;
    sCtrl.appShow = true;
    sCtrl.typeShow = true;
    sCtrl.exercise = {};
    sCtrl.exerciseData = {};
    sCtrl.challenge = {};
    sCtrl.submission = "";

    // if(sCtrl.volume) {
    //       console.log("Setting Volume @" + sCtrl.volume)
    //     }else{
    //         sCtrl.volume = 1.5
    //         console.log("Default volume")
    //     }
    // if(sCtrl.pitch) {
    //       console.log("Setting Pitch to" + sCtrl.pitch)
    //     }else{
    //         sCtrl.pitch = 1
    //         console.log("Default pitch")
    //     }
    // if(sCtrl.language) {
    //       console.log("Setting language to" + sCtrl.language)
    //     }else{
    //         sCtrl.language = "US English"
    //         console.log("Default language")
    //     }
    // if(sCtrl.speed) {
          
    //       console.log("Setting Speed @" + sCtrl.speed)
    //     }else{
    //         sCtrl.speed = 1
    //         console.log("Default speed")
    //     }
    // if(sCtrl.gender) {
         
    //       console.log("Setting Gender @" + sCtrl.gender)
    //     }else{
    //         sCtrl.gender = "Male"
    //         console.log("Default Gender")
    //     }

    // sCtrl.getChallenge = function(){
    //     sCtrl.getExercise();
    //     sCtrl.challenge = sCtrl.exerciseData[Math.floor(Math.random() * sCtrl.exerciseData.length)]
    //     console.log("current challenge:",sCtrl.challenge);
    // }
    
    sCtrl.doSomething = function() {
        if(sCtrl.volume) {
          console.log("Setting Volume @" + sCtrl.volume)
        }else{
            sCtrl.volume = 1.5
            console.log("Default volume")
        }
    if(sCtrl.pitch) {
          console.log("Setting Pitch to" + sCtrl.pitch)
        }else{
            sCtrl.pitch = 1
            console.log("Default pitch")
        }
    if(sCtrl.language) {
          console.log("Setting language to" + sCtrl.language)
        }else{
            sCtrl.language = "US English"
            console.log("Default language")
        }
    if(sCtrl.speed) {
          
          console.log("Setting Speed @" + sCtrl.speed)
        }else{
            sCtrl.speed = 1
            console.log("Default speed")
        }
    if(sCtrl.gender) {
         
          console.log("Setting Gender @" + sCtrl.gender)
        }else{
            sCtrl.gender = "Male"
            console.log("Default Gender")
        }
        console.log('testing voice');
        window.responsiveVoice.speak(sCtrl.challenge.instructions, sCtrl.language+" "+ sCtrl.gender,{pitch:sCtrl.pitch},{rate:sCtrl.speed},{volume:sCtrl.volume});
    }
    sCtrl.giveHint = function() {
        console.log('testing hint');
         window.responsiveVoice.speak(sCtrl.challenge.hint, sCtrl.language+" "+ sCtrl.gender,{pitch:sCtrl.pitch},{rate:sCtrl.speed},{volume:sCtrl.volume});
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
            sCtrl.toggle6();

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
    sCtrl.toggle4 = function() {
        console.log("Running")
       sCtrl.options = !sCtrl.options
    }
    sCtrl.toggle5 = function() {
        console.log("Running")
       sCtrl.options = true;
    }
     sCtrl.toggle6 = function() {
        console.log("Running")
       sCtrl.appfail = !sCtrl.appfail;
    }
}
