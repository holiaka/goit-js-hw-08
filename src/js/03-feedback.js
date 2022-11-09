// Load library
import throttle from 'lodash.throttle';

// Links on HTML elements
const callbackForm = document.querySelector('.feedback-form');
const userEmail = document.querySelector('input');
const userMessage = document.querySelector('textarea');

// Utility variables
const STORAGE_KEY = 'feedback-form-state';

let userTypedText = {};

let storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));

// Code for recover text data
try {
  if (storageData !== null) {
    if (storageData.email !== undefined && storageData.message !== undefined) {
      userEmail.value = userTypedText['email'] = storageData.email;
      userMessage.value = userTypedText['message'] = storageData.message;
    } else if (storageData.email === undefined) {
      userEmail.value = userTypedText['email'] = '';
      userMessage.value = userTypedText['message'] = storageData.message;
    } else if (storageData.message === undefined) {
      userEmail.value = userTypedText['email'] = storageData.email;
      userMessage.value = userTypedText['message'] = '';
    }
  } else {
    userTypedText['email'] = userTypedText['message'] = '';
  }
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}

// Event listeners and callback func.
callbackForm.addEventListener('input', throttle(onTextTyping, 501));

function onTextTyping(evt) {
  userTypedText[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userTypedText));
}

callbackForm.addEventListener('submit', onSubmitMessage);

function onSubmitMessage(evt) {
  evt.preventDefault();
  if (userEmail.value.length >= 3 && userMessage.value.length >= 3) {
    userEmail.value = userMessage.value = '';
    localStorage.removeItem(STORAGE_KEY);
    console.log('Output object from local storage ', userTypedText);
    userTypedText = {};
  } else {
    return alert(
      'The email address and description should contain 3 or more symbols!!!'
    );
  }
}
