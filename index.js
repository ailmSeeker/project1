
function setUpFlashCard(letter){
  let word = document.querySelector('.front');
  let audio = document.querySelector('audio') 

  let h3 = document.createElement('p')
  h3.id = 'verse'
  let check = document.createElement('button')

  let show = document.querySelector('.container');
  let error = document.createElement('p')
  error.innerText = 'API ERROR'
 
  let errorCheck = false;
 
  console.log(letter)
  
  //unhiding the flashcard to show it

  show.style.display = 'block'
  check.innerText = 'Check'
  check.id = 'skyBlue'

  //flips the flashcard when the button is clicked
  check.addEventListener('click', () => {
     document.querySelector('.card').classList.add('flip') 
  })  

  if(letter === 'error'){
    errorCheck = true;
    letter = '11';
    feed(h3, audio, letter)
  }else{
    feed(h3, audio, letter)
  }
 
  //this should be a function that updates the flashcards inner Text
  word.appendChild(h3)
  word.appendChild(check)
  if(errorCheck){
    word.appendChild(error)
  }
}

function choose() {
  let button = document.getElementById("chosen");
  let div1 = document.getElementById("theButton");

  button.addEventListener("click", () => {
    div1.style.display = "none";
   
    let valueOfChoose = document.querySelector("#letter").value;
    let search = mapForSearch(valueOfChoose);

    fetch(`//api.quran.com/api/v4/search?q=${search}&size=1&page=0`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if(json.search.results.length > 0){
          setUpFlashCard(json.search.results[0].verse_id);
          return;
        }else{
          console.log('verse is not working')
          setUpFlashCard('error')
        }
      });

  });
}


function feed(h3, audio, verse){
  updateFlashCard(h3, verse) 
  updateAudio(audio, verse)
}

function updateFlashCard(div, verse){
  fetch(`//api.alquran.cloud/v1/ayah/${verse}/ar.husarymujawwad`).then((resp) => {
      return resp.json()
  }).then((res) => {
      div.innerText = res.data.text
      console.log('flash verse ' + res.data.text)
  })
}

function updateAudio(div, verse){
  console.log('audio verse ' + verse)
  fetch(`//api.alquran.cloud/v1/ayah/${verse}/ar.husarymujawwad`).then(res => {
      return res.json()
  }).then(resp => {
      div.src = resp.data.audio;
      console.log('audio verse ' + resp.data.text)
      document.querySelector('.back').appendChild(div);
    });
}

function mapForSearch(letter){
  let lookup = {
  "ا": 'ءَاتَيْنَـٰهُمُ', // 
  "ب": 'بِـَٔايَـٰتِ', // 
  "ت": "تَجِدُ", //
  "ث": "ثُمَّ", //
  "ج": "جا", //
  "ح": "حَبل", //
  "خ": "خَيْرُ",//
  "د": "دَم", //
  "ذ": "أَذَقْنَـٰهُ", //
  "ر": "رَطْبٍۢ", //
  "ز": "ءَازَرَ", //
  "س": "سَلام", //
  "ش": "شُكرا", //
  "ص": "صَيْحَةًۭ", //
  "ض": "وَٱصْبِرُوا۟", //
  "ط": "بَـٰطِلًۭا ", //
  "ظ": "ظَنُّ", //
  "ع": "عَلَىٰ", // 
  "غ": "فَتح", //
  "ف": "فِى", //
  "ق": "خلق",// 
  "ك": "ذِكْرِ", //
  "ل": "لَبَن",//
  "م": "مَلَكٌ ۚ", //
  "ن": "إِنَّكَ", //
  "ه": "هَرَم",
  "و": "وَمِثْلَهُم", //
  "ي": "يَوْمَ" //
}
  

  for (let key in lookup) { 
    let value;

    value = lookup[key];

    if(key === letter){
      return lookup[letter]
    }

}

}

document.addEventListener("DOMContentLoaded", choose())
