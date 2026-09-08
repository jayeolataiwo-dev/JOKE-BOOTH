const jokeText = document.getElementById("jokeText");
const jokeBtn = document.getElementById("jokeBtn");
const copyBtn = document.getElementById("copyBtn");
const jokeSource = document.getElementById("jokeSource");

const naijaJokes = [
  "Teacher: Give an example of a contradiction. Student: A Nigerian civil servant arriving early.",
  "My uncle said 'I will call you back' in 2019. I'm still waiting.",
  "Why do Nigerian fathers never say 'I'm proud of you'? Because that slot is reserved for 'When I was your age...'",
  "NEPA (PHCN) took light again. Even the generator asked 'again?'",
  "In Nigeria, 'I'm coming' can mean anything from 2 minutes to 3 days.",
  "I wan save moni but food dey look me like say we get unfinished business.",
  "My village people dey work overtime. Even when I no do anything, problem still dey locate me.",
  "Na when you dey try to sleep, mosquito go come dey do conference call for your ear.",
  "Na when you finally siddon with cold drink NEPA go remember say dem get appointment with darkness."
];

const jokeSources = {
  "official-general":     { type: "official", category: "general" },
  "official-programming": { type: "official", category: "programming" },
  "official-knockknock":  { type: "official", category: "knock-knock" },
  "jokeapi-pun":           { type: "jokeapi", category: "Pun" },
  "jokeapi-spooky":        { type: "jokeapi", category: "Spooky" },
  "jokeapi-christmas":     { type: "jokeapi", category: "Christmas" },
  "jokeapi-misc":          { type: "jokeapi", category: "Miscellaneous" },
  "naija":                 { type: "local" }
};

jokeBtn.addEventListener("click", () => {
  const config = jokeSources[jokeSource.value];

  if (config.type === "local") {
    const randomIndex = Math.floor(Math.random() * naijaJokes.length);
    jokeText.textContent = naijaJokes[randomIndex];
    return;
  }

  jokeText.textContent = "Loading...";
  jokeBtn.disabled = true;

  const url = config.type === "official"
    ? `https://official-joke-api.appspot.com/jokes/${config.category}/random`
    : `https://v2.jokeapi.dev/joke/${config.category}?safe-mode`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (config.type === "official") {
         const joke = data[0];
        jokeText.textContent = `${joke.setup} — ${joke.punchline}`;
      } else if (data.type === "single") {
        jokeText.textContent = data.joke;
      } else {
        jokeText.textContent = `${data.setup} — ${data.delivery}`;
      }
      jokeBtn.disabled = false;
    })
    .catch(error => {
      jokeText.textContent = "Oops, couldn't fetch a joke. Try again!";
      console.error(error);
       jokeBtn.disabled = false;
    });

    copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(jokeText.textContent);
  copyBtn.textContent = "✅ Copied!";

  setTimeout(() => {
    copyBtn.textContent = "📋 Copy";
  }, 1500);
});
});