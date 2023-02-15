"use strict";

const mockData = require("./mockData").data;
console.log(mockData.data);

// Rest of your code

// Welcome the user with a message in the console.
console.log("Welcome to the dating app! Let's create your profile.");

// Create an empty profile object.
let profile = {};

// Function to check if the input is valid for each question
function isValid(input, validation) {
  switch (validation) {
    case "notEmpty":
      return input !== "";
    case "age":
      return !isNaN(input) && input >= 18;
    case "gender":
      return ["M", "F", "X"].includes(input);
    case "genderInterest":
      return ["M", "F", "X", "B"].includes(input);
    case "location":
      return ["rural", "city"].includes(input);
    default:
      return false;
  }
}

// Function to prompt questions and validate the input
function askQuestion(question, validation) {
  let input = prompt(question);
  while (!isValid(input, validation)) {
    input = prompt(question);
  }
  return input;
}

// Prompt questions and store the data in the profile object
profile.first_name = askQuestion("What is your first name?", "notEmpty");
profile.last_name = askQuestion("What is your last name?", "notEmpty");
profile.age = Number(askQuestion("What is your age?", "age"));
profile.gender = askQuestion("What is your gender? (M/F/X)", "gender");
profile.gender_interest = askQuestion(
  "What gender are you interested in? (M/F/X/B)",
  "genderInterest"
);
profile.location = askQuestion(
  "What is your location? (rural/city)",
  "location"
);
profile.min_age_interest = Number(
  askQuestion("What is the minimum age you're interested in?", "age")
);
profile.max_age_interest = Number(
  askQuestion("What is the maximum age you're interested in?", "age")
);

// Make sure the minimum interested age and maximum interested age is 18 or higher.
if (profile.min_age_interest < 18) {
  profile.min_age_interest = 18;
}
if (profile.max_age_interest < 18) {
  profile.max_age_interest = 18;
}

// Make sure the maximum interested age is higher than the minimum interested age.
if (profile.min_age_interest > profile.max_age_interest) {
  let temp = profile.min_age_interest;
  profile.min_age_interest = profile.max_age_interest;
  profile.max_age_interest = temp;
}

// Loop that iterates on the mockData array and counts the number of matches
let matches = [];
let matchCount = 0;

for (let i = 0; i < mockData.length; i++) {
  let person = mockData[i];
  if (
    person.age >= profile.min_age_interest &&
    person.age <= profile.max_age_interest &&
    person.gender === profile.gender_interest &&
    person.gender_interest === profile.gender &&
    person.location === profile.location
  ) {
    matches.push(person);
    matchCount++;
  }
}

// Output the number of matches
console.log(`There are ${matchCount} potential matches:`);
for (let i = 0; i < matches.length; i++) {
  console.log(
    `${matches[i].first_name} ${matches[i].last_name} (${matches[i].age}, ${matches[i].gender})`
  );
}
