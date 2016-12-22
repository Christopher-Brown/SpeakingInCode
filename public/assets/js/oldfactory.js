angular.module('SpeakingInCode')
    .factory('SICFactory', sicFact);


function sicFact () {

    var exercises = [
        {
            difficulty: "easy",
            name : "1",
            instruction: "Declare a variable named C and assign its value to the difference between F and 32. Then, multiply the difference by the qoutient of 5 divided by 9. End the statement. End of Exercise.",
            answers: ["varc=(f-32)*5/9;", "varsea=(f-32)*5/9;","varsee=(f-32)*5/9;","varc=(f-32)*(5/9);","varc=((f-32)*5/9);","varsea=((f-32)*5/9);","varsee=(f-32)*(5/9);"],
            hint: "Remember the order of operations! You must use '()'"
        },
        {
            difficulty: "easy",
            name : "2",
            instruction: "Declare a variable named turtle and assign its value to the string ninja. End the statement. Declare a variable named otter and assign its value to the length propery of the variable turtle. End of statement. End of Exercise.",
            answers: ["varturtle='ninja';varotter=turtle.length;","varturtle=\"ninja\";varotter=turtle.length;",],
            hint: "Remeber - We're applying the lenth property, not method."
        },
        {
            difficulty: "easy",
            name : "3",
            instruction: "Declare a variable named grades and assign its value to an empty array. End the statement. Invoke the push method on the variable grades, passing in the number one-hundred. End the statement. End of exercise.",
            answers: ["vargrades=[];grades.push(100);",],
            hint: "We're calling a method, not a propery."
        },
        {
            difficulty: "easy",
            name : "4",
            instruction: "Declare a variable named animals and assign its value to an array containing the strings lion, gazelle, and giraffe. End the statement. Declare a variable named predator and assign its value to the zero ith index of the variable animals. End the statement. End of Exercise",
            answers: ["varanimals=['lion','gazelle','giraffe'];varpredator=animals[0];","varanimals=[\"lion\",\"gazelle\",\"giraffe\"];varpredator=animals[0];"],
            hint: "Use either '' or \"\", not both!"
        },
        {
            difficulty: "medium",
            name : "5",
            instruction: "We're going to create a for loop. Initialize the counter with a starting value of one hundred. Then declare a test statement of i is greater than zero. Set the iteration statement to I decrement. In the body, console log the variable I. End the statement. Close the body. End of Exercise",
            answers: ["for(vari=100;i>0;i--){console.log(i);}","for(vari=100;i>0;--i){console.log(i);}"],
            hint: "This is a simple JS For Loop."
        },
        {
             difficulty: "medium",
            name : "6",
            instruction: "Declare a variable named middleinitial and assign its value to an anonymous function that takes the argument person. In the body, return the zero ith index of the middlename property applied to the variable person. concactanate this with a string containing a period. End the statement. Close the body. End the statement. End of exercise.",
            answers: ["varmiddleinitial=function(person){returnperson.middlename[0]+'.';};"],
            hint: "Listen to this more than once!"
        },
        {
             difficulty: "medium",
            name : "7",
            instruction: "Declare a variable named angle and assign its value to the number three hundred and sixty five. End the statement. Create an if statement that takes the argument angle is greater than the number 360. In the body, angle is assigned the value angle minus the number 360. End the statement. Close the body. End of exercise.",
            answers: ["varangle=365;if(angle>360){angle=angle-360;}","varangel=365;if(angel>360){angel=angel-360;}"],
            hint: "The variable name is angel."
        },
        {
             difficulty: "hard",
            name : "8",
            instruction: "Create an angular module called slapnutz, with no dependencies. End of exercise.",
            answers: ["angular.module('slapnutz',[]);","angular.module(\"slapnuts\",[]);"],
            hint: "I'll take slapnuts or Slapnutz"
        },
        {
             difficulty: "hard",
            name : "9",
            instruction: "Assign a property called max weight to the variable fish. Then assign its value to an anonymous function that takes no arguments. In the body use the get method on dollar h t t p. Pass in the string argument h t t p s colon forward slash forward slash google dot com. concactanate this url with the property name applied to the variable fish. End of exercise.",
            answers: ["fish.maxweight=function(){$http.get('https://google.com'+fish.name)","fish.maxweight=function(){$https.get('https://google.com'+fish.name)","fish.maxweight=function(){$http.get('https://google.com'+fish.name);"],
            hint: "Something is fishy"
        },
       

    ]; // This will be our mock database for our list of games

    return {
        exerciseList : exercises,
        // name : "Bill",
        // occupation : "dentist",
        // age : 104
    }
    // All factories MUST return something, typically an object
    // When you inject a factory into a controller, you get the EXACT return statement
}