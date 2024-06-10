/* 
  Michael Hunter and Ryan Giard
  CS 340 group 91
  delete_guild.js
  client side code for deleting a guild
*/
/*
  Code citation:
    Code for these functions (deleteGuild and deleteGuildRow) is adapted from the nodejs starter app.
    https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// sends request to backend to delete guild matching guildID
function deleteGuild(guildID) {
    const data = {
        guildID: guildID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/guilds/delete", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteGuildRow(guildID);
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
}

// removes the guild from the HTML table
function deleteGuildRow(guildID) {
    let table = document.querySelector("table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("guild-id") == guildID) {
            table.deleteRow(i);
            break;
        }
    }
}
