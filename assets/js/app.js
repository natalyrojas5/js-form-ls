// VARIABLES
const listaTweets = document.querySelector("#lista-tweets");

// EVENT LISTENERS
eventListener();
function eventListener() {
  document.querySelector("#formulario").addEventListener("submit", createTweet);
  listaTweets.addEventListener("click", deleteTweet);

  document.addEventListener("DOMContentLoaded", localStorageListo);
}

// FUNCIONES
function createTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#tweet").value;
  if (tweet.trim().length <= 0) return;

  const li = document.createElement("li");
  li.innerHTML = tweet;

  const btnDelete = document.createElement("a");
  btnDelete.classList = "borrar-tweet";
  btnDelete.innerHTML = "X";

  li.appendChild(btnDelete);
  listaTweets.appendChild(li);

  // Añadir a localStorage
  agregarTweetLocalStorage(tweet);
}

// ELIMINAR TWEET DEL DOM
function deleteTweet(e) {
  e.preventDefault();

  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    // alert('Tweet eliminado');
    console.log(e.target.parentElement.innerText);

    deleteTweetLocalStorage(e.target.parentElement.innerText);
  }
}

function localStorageListo() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet) {
    const li = document.createElement("li");
    li.innerHTML = tweet;

    const btnDelete = document.createElement("a");
    btnDelete.classList = "borrar-tweet";
    btnDelete.innerHTML = "X";

    li.appendChild(btnDelete);
    listaTweets.appendChild(li);
  });
}

// AGREGAR TWEET A LOCALSTORAGE
function agregarTweetLocalStorage(tweet) {
  let tweets;

  tweets = obtenerTweetsLocalStorage();
  // console.log(tweet);

  tweets.push(tweet);

  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// COMPRUEBA QUE HAYA ELEMENTOS EN LOCALSTORAGE
function obtenerTweetsLocalStorage() {
  let tweets;

  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

function deleteTweetLocalStorage(tweet) {
  let tweets, tweetDelet;

  tweetDelet = tweet.substring(0, tweet.length - 1);
  console.log(tweetDelet);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet, index) {
    if (tweetDelet === tweet) {
      tweets.splice(index, 1);
    }
  });
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
