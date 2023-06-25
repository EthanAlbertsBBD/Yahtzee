// fetch data from server probably more securely and with protocol
async function fetchLeaderData() {
    const response = await fetch("/highscores");
    const data = await response.json();
    return data;
}

const leaderboardTable = document.getElementById("leaderboard");

// populating leaderboard with data
async function populateLeaderBoard() {
    const data = await fetchLeaderData();
    let position = 1;

    if (data) {
        data.forEach((item, index) => {
            const row = leaderboardTable.insertRow(index + 1);
            const positionCell = row.insertCell(0);
            const usernameCell = row.insertCell(1);
            const highScoreCell = row.insertCell(2);

            positionCell.textContent = `${position}`;
            usernameCell.textContent = item.user_id;
            highScoreCell.textContent = `${item.high_score}`;
            position += 1
        });
    }
}

populateLeaderBoard();
