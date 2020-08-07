let leaderBoardData = {};
let playerName;
const url = "https://api.jsonbin.io/b/5f2afe646f8e4e3faf2bf5b5";
const secretKey = "$2b$10$dpbnUOil.eOqVe0uUK0X9.4dpG.z91hFNumhTUkJWSRwm3Qe/mV/y";

function getLeaderboard() {

  // Fetch leaderboard from jsonbin free api

  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {

      leaderBoardData = JSON.parse(req.responseText);

      // Load data to leaderboard table
      const leaderBoardDiv = document.getElementById("leaderboard");
      const oldTBody = leaderBoardDiv.getElementsByTagName("tbody")[0];

      var newTBody = document.createElement('tbody');

      leaderBoardData.leaderboard.data.forEach(element => {
        const row = newTBody.insertRow(-1);
        const name = row.insertCell(0);
        const score = row.insertCell(1);
        name.innerHTML = element.name;
        score.innerHTML = element.score;
      });

      leaderBoardDiv.replaceChild(newTBody, oldTBody)
    }
  };

  req.open("GET", url + "/latest", true);
  req.setRequestHeader("secret-key", secretKey);
  req.send();
}

function tryAddToLeaderboard(score) {

  const isHighscore = leaderBoardData.leaderboard.data.reduce((accu, value) => accu || value.score < score, false);

  if (isHighscore) {

    // Get name from user
    playerName = playerName ?? prompt("New high score. Enter your name:");

    // Update local leaderboard data
    const index = leaderBoardData.leaderboard.data.findIndex((item) => item.score < score);
    leaderBoardData.leaderboard.data[index] = { "name": playerName, "score": score };

    // Save local leaderboard data to remote
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        // Prompt that new highscore is added.
        alert("Your new highscore of " + score + " is added to the leaderboard!");
        // Update is successful, refresh leaderboard
        getLeaderboard();
      }
    };

    req.open("PUT", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("secret-key", secretKey);
    req.send(JSON.stringify(leaderBoardData));
  }

}

getLeaderboard();