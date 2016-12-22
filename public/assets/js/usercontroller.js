angular.module("SpeakingInCode")
    .controller("UserController", userCtrl);

userCtrl.$inject = ['SICFactory'];

function userCtrl(SICFactory) {
    var uCtrl = this; 
    window.uCtrl = uCtrl; // leaking the controller to the window for debugging purposes

    uCtrl.greeting = "Sign Up!";
    uCtrl.userPage = "Welcome to the user page!";
    uCtrl.user = {}; // initialize user object, so we can directly model properties on it from the form

    uCtrl.createUser = function() {
        console.log("Trying to create a user!");

        // call the factory method to perform the $http request
        SICFactory.createUser()
            .then(function(success){
                console.log("Success submitting user: ", success.data);
            }, function(error) {
                console.log("Error submitting user: ", error); 
            });


        // if I was not modeling the form fields directly on an object, I would need to do something like this first
        // var user = {
        //     email: fCtrl.email,
        //     name: fCtrl.name,
        //     ...
        // }
    }

    // method to search for a specific user by email
    uCtrl.searchName = function() {
        console.log("Trying to find user with Name: ", uCtrl.search);

        // call the factory method to perform the $http request
        SICFactory.getUser(uCtrl.search)
            .then(function(success){
                console.log("Success submitting user: ", success.data);

                // set the returned data to a property on our controller so we can display it in the html
                uCtrl.userData = success.data;
            }, function(error) {
                console.log("Error submitting user: ", error); 
            });
    }
}



