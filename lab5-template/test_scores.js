"use strict";
const $ = selector => document.querySelector(selector);

const _title = courseInfo.title;
const _term = courseInfo.term;
const _sectionNumber = courseInfo.sectionNumber;   
const _description = courseInfo.description;
const _credits = courseInfo.credits;  
const _students = courseInfo.students;

/** Chapter 6 concept - DOM */
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
      firstElm.nextElementSibling.textContent = "This field is required."; // span
      isValid = false; 
  } else {
      firstElm.nextElementSibling.textContent = ""; 
  }
  if (lastElm.value == "") {
      lastElm.nextElementSibling.textContent = "This field is required."; // span
      isValid = false; 
  } else {
      lastElm.nextElementSibling.textContent = ""; 
  }
  if (scoreElm.value == "") {
      scoreElm.nextElementSibling.textContent = "This field is required."; // span
      isValid = false; 
  } else {
      scoreElm.nextElementSibling.textContent = ""; 
  }

  const array_scores = courseInfo.students;
  // add new to array_scores
  let newStudent = {firstName: "", lastName: "", score: 0};
  // capture the data from the webApp
  newStudent.firstName = firstElm.value;
  newStudent.lastName = lastElm.value;
  newStudent.score = parseFloat(scoreElm.value);
  array_scores.push(newStudent); // add line 15
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
      highscoreStudentName = currentFirstName + ' ' + currentLastName;
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
  // Using DOM to write the scores to your WebApp
  let elmScores = $("#scores");
  // TODO using DOM ...

};

document.addEventListener("DOMContentLoaded", () => {    

  // event function handler - "add", "display-results", "display-scores"
  // example how to add element the existing element in your html
  $("#add").addEventListener("click", add);
  $("#display-results").addEventListener("click", displayResults);
  $("#display-scores").addEventListener("click", displayScores);        
});