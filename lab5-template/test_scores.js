"use strict";
const $ = selector => document.querySelector(selector);

const _title = courseInfo.title;
const _term = courseInfo.term;
const _sectionNumber = courseInfo.sectionNumber;   
const _description = courseInfo.description;
const _credits = courseInfo.credits;  
const _students = courseInfo.students;

const createElementWithText = (tagName, text) => {
  const element = document.createElement(tagName);
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
  return element; 
};

const add = () => {
  let firstElm = $("#first-name");
  let lastElm = $("#last-name");
  let scoreElm = $("#score");
  let isValid = true;    
  if (firstElm.value == "") {
      firstElm.nextElementSibling.textContent = "First name is required."; 
      isValid = false; 
  } else {
      firstElm.nextElementSibling.textContent = ""; 
      isValid = true;
  }
  if (lastElm.value == "") {
      lastElm.nextElementSibling.textContent = "Last name is required."; 
      isValid = false; 
  } else {
      lastElm.nextElementSibling.textContent = ""; 
      isValid = true;
  }
  const scoreValue = parseFloat(scoreElm.value);
  if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 100) {
    scoreElm.nextElementSibling.textContent = "Score must be a number between 0 and 100.";
    isValid = false;
  } else {
    scoreElm.nextElementSibling.textContent = "";
    isValid = true;
  }

  if (isValid) {
    const array_scores = courseInfo.students;
    let newStudent = {firstName: "", lastName: "", score: 0};
    newStudent.firstName = firstElm.value;
    newStudent.lastName = lastElm.value;
    newStudent.score = parseFloat(scoreElm.value);
    array_scores.push(newStudent);
  }
};

const displayResults = () => {
  const array_scores = courseInfo.students; 
  let totalScores = 0;
  let highscoreStudentName = '';
  let highscore = array_scores[0].score;
  let average = 0;
  for (let i = 0; i < array_scores.length; i++) {
    const student = array_scores[i];
    const currentFirstName = student.firstName;
    const currentLastName = student.lastName;
    const currentScore = student.score;
    totalScores += currentScore;
    if (currentScore > highscore) {
      highscore = currentScore;
      highscoreStudentName = `${currentFirstName} ${currentLastName}`;
    }
  }
  average = totalScores / array_scores.length;
  let elmResults = $("#results");

  let heading = createElementWithText("h2", "Results");
  let averageElm = createElementWithText("p", "Average scores = " + average);
  let highscoreElm = createElementWithText("p", "High score = " + highscoreStudentName + ' with a score of ' + highscore);

  elmResults.appendChild(heading);
  elmResults.appendChild(averageElm);
  elmResults.appendChild(highscoreElm);

};

const displayScores = () => {
  const array_scores = courseInfo.students;
  let elmScores = $("#scores");
  elmScores.innerHTML = "";
  
  let heading = createElementWithText("h2","Scores");
  elmScores.appendChild(heading);
  
  for (let i = 0; i < array_scores.length; i++) {
    const student = array_scores[i];
    const currentFirstName = student.firstName;
    const currentLastName = student.lastName;
    const currentScore = student.score;
    const studentInfo = createElementWithText("p",`${currentFirstName} ${currentLastName} ${currentScore}`);
    
    elmScores.appendChild(studentInfo);
    // elmScores.appendChild(createElementWithText("br", ''));
    // the above isn't needed to go to a new line but I have it here because this was in the instructions
  }
}; 

document.addEventListener("DOMContentLoaded", () => {    
  $("#first-name").focus();

  $("#add").addEventListener("click" , () => {
    add();
  $("#first-name").focus();
});

  $("#display-results").addEventListener("click", displayResults);
  $("#display-scores").addEventListener("click", displayScores);        
});