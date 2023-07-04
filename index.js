function first(){
  let word = document.querySelector('.word');
  let text = document.createElement('h1')
  fetch("http://api.alquran.cloud/v1/surah/1/ar.muyassar").then((resp) => {
    return resp.json()
  }).then((res) => {
      text.innerText = res.data.ayahs[0].text
    })
  word.appendChild(text)
}

document.addEventListener("DOMContentLoaded", first())
