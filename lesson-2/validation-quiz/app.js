/*
Your code goes here!
 */

/*
You might find you want to use RegEx. As this quiz is about setCustomValidity
and not RegEx, here are some RegEx patterns you might find useful:

match one of the required symbols: /[\!\@\#\$\%\^\&\*]/g
match a number: /[0-9]/g or /\d/g
match a lowercase letter: /[a-z]/g
match an uppercase letter: /[A-Z]/g
match a character that isn't allowed in this password: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
 */

/*
Grabbing a few inputs to help you get started...
 */
// neat way to set query elements in a form with variables, learn something new every day
// the below statement selects the form element with the id first
var firstPasswordInput = document.querySelector('#first');
var secondPasswordInput = document.querySelector('#second');
var submit = document.querySelector('#submit');

// due to time constrains, i decided to instead inspect the instructors code thater than my own to better understand how to use validations in JS
// will instead 
/*
I'm using this IssueTracker to help me format my validation messages.
 */
// creates the issue tracker function
function IssueTracker() {

// this function creates the array issues 
  this.issues = [];
}

// establishes the IssueTracker prototype object methods
IssueTracker.prototype = {

// adds the function to push the issue argument into the issues array
  add: function (issue) {
    this.issues.push(issue);
  },

 // retrieves the length of the issues array as a string.
  retrieve: function () {
    var message = "";
    switch (this.issues.length) {
      //if the length of the issues array is 0, the switch returns as true, so it allows submit
      case 0:
        // do nothing because message is already ""
        break;
      // if the length of the array is 1 it returns a single error message, and triggers the second case
      case 1:
        message = "Please correct the following issue:\n" + this.issues[0];
        break;
      // if the array issues contains a value other than 0 or 1, meaning it has more than 1 mistake or none, it triggers the default case which joins all issues array values and returns them as a message followed by a space
      default:
        message = "Please correct the following issues:\n" + this.issues.join("\n");
        break;
    }
    return message;
  }
};
// watches for when the submit variable or DOM element with the #submit id is clicked
submit.onclick = function () {
  /*
  Don't forget to grab the input's .value!
   */

// sets the variables for the values of each password input field
  var firstPassword = firstPasswordInput.value;
  var secondPassword = secondPasswordInput.value;

  /*
  Make an issue tracker for each input because some validation messages should
  end up on the first one, some on the second.
   */

// creates the instances of the IssueTracker object for each input
  var firstInputIssuesTracker = new IssueTracker();
  var secondInputIssuesTracker = new IssueTracker();

  /*
  This steps through all of the requirements and adds messages when a requirement fails.
  Just checks the first password because the second should be the same when it runs.
   */
  
 // checks requirements for the first password field
  function checkRequirements() {
  	// if password length is less than 16
    if (firstPassword.length < 16) {

    // add the following message to his objects issues array
      firstInputIssuesTracker.add("fewer than 16 characters");
    } 
    // if password length is over 100
    else if (firstPassword.length > 100) {
      firstInputIssuesTracker.add("greater than 100 characters");
    }
    // if password value does not (or !) match one symbol
    if (!firstPassword.match(/[\!\@\#\$\%\^\&\*]/g)) {
      firstInputIssuesTracker.add("missing a symbol (!, @, #, $, %, ^, &, *)");
    }
    // if password does not have a number
    if (!firstPassword.match(/\d/g)) {
      firstInputIssuesTracker.add("missing a number");
    }
    // if password does not have a lowercase later
    if (!firstPassword.match(/[a-z]/g)) {
      firstInputIssuesTracker.add("missing a lowercase letter");
    }
    // if password does not have an uppercase letter
    if (!firstPassword.match(/[A-Z]/g)) {
      firstInputIssuesTracker.add("missing an uppercase letter");
    }
    // if password does not have alphanumerical characters, numbers, or the allowed symbols
    var illegalCharacterGroup = firstPassword.match(/[^A-z0-9\!\@\#\$\%\^\&\*]/g)
    if (illegalCharacterGroup) {
      illegalCharacterGroup.forEach(function (illegalChar) {
        firstInputIssuesTracker.add("includes illegal character: " + illegalChar);
      });
    }
  };
  // checks to make sure passwords match first
  /*
  Here's the first validation check. Gotta make sure they match.
   */
  if (firstPassword === secondPassword && firstPassword.length > 0) {
    /*
    They match, so make sure the rest of the requirements have been met.
     */
    checkRequirements();
  } else {
  // adds the issue to the issues arry of the secondInputIssuesTracker object
    secondInputIssuesTracker.add("Passwords must match!");
  }

  /*
  Get the validation message strings after all the requirements have been checked.
   */
  // retrieves all found issues for the first input's object
  var firstInputIssues = firstInputIssuesTracker.retrieve()
  // retrieves all found issues for the second input's object
  var secondInputIssues = secondInputIssuesTracker.retrieve()

  /*
  Let input.setCustomValidity() do its magic :)
   */
  // sets the argument of setCustomValidity for each input's issues
  firstPasswordInput.setCustomValidity(firstInputIssues);
  secondPasswordInput.setCustomValidity(secondInputIssues);

  /*
  You would probably replace this with a POST message in a real app.
   */
  // checks to see if the value of the first input and the second input's object's issues array is exactly 0
  if (firstInputIssues.length + secondInputIssues.length === 0) {

  // if no issues are found, it sets the alert for the password being valid
  // in an actual app, this would POST the value into a database, and output an alert for the user or take them to their user information page.  
    alert("Password change successful!");
  }
};