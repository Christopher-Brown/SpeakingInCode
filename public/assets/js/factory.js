angular.module("SpeakingInCode")
    .factory("SICFactory", sicFact)

sicFact.$inject = ['$http'];

function sicFact($http) {

    // this is the object that the controller will get access to when the factory is injected
    return {
        // this object contains two methods, 
        //they each just return a $http call, so we can chain the .then in the controller
        // createUser: function () {
        //     // post to the /createUser route of our server
        //     return $http.post('/register', auth.payloads.register)
        //         .then(auth.register.success, auth.register.error);
        // },
        // userLogin: function(){
        //     return  $http.post('/login', auth.payloads.login)
        //         .then(auth.login.success, auth.login.error);
        // },
        createExercise: function () {

            return $http.post('/createExercise', eCtrl.exercise);
        },
        getExercise: function (type,difficulty) {
            // get the user information from the parameterized route
          return $http.get('/api/exercise/'+ type + "/"+difficulty)
        }
    }
};