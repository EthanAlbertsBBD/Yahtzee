// fetch data from server probably more securley and with protocol
// async function fetchLeaderData(){
//     try{
//         const response = await fetch("")
//         const data = await response.json()
//         return data;
//     }catch(error){
//         //handle error maybe display
//     }
// }

const leaderboardTable = document.getElementById('leaderboard');
const dummyData = [
    {position:1, username:"ethan@ethan.com", highScore:1800},
    {position:2, username:"devlon@devlon.com", highScore:1700},
    {position:3, username:"ryan@ryan.com", highScore:1600},
    {position:4, username:"kyle@kyle.com", highScore:1500},
];

//populating leaderboadrd with data
function populateLeaderBoard(){
//    const data = await fetchLeaderData();
    const data = dummyData;

    if(data){
        data.forEach((item, index) => {
            const row = leaderboardTable.insertRow(index +1);
            const positionCell = row.insertCell(0);
            const usernameCell = row.insertCell(1);
            const highScoreCell = row.insertCell(2);

            positionCell.textContent = item.position;
            usernameCell.textContent = item.username;
            highScoreCell.textContent = item.highScore;
        });
    }
}

populateLeaderBoard();