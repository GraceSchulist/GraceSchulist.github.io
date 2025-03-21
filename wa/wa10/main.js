const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = 'At 94 fahrenheit, it was a warm, sunny day outside, so :insertX: went for a run. When they got to :insertY:, they stared in awe for a few moments, then :insertZ:. Bob witnessed the event, but was not the least bit concerned — :insertX: weighs 300 pounds, and it was Taco Tuesday.';
const insertX = ['Timmy Turner','Lois Griffin', 'Garfield'];
const insertY = ['Willy Wonkas Factory','The Loud House','Heaven'];
const insertZ = ['ran to the toilet','burst into song'];

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;

    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory.replaceAll(':insertX:', xItem)
    newStory = newStory.replaceAll(':insertY:',yItem)
    newStory = newStory.replaceAll(':insertZ:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Bob',name);
  }

  if(document.getElementById("uk").checked) {
    const weight = `${Math.round(300/14)} stone`;
    const temperature = `${Math.round(94*(5/2))} centigrade`;

    newStory = newStory.replaceAll('300 pounds', weight);
    newStory = newStory.replaceAll('94 fahrenheit', temperature);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}