
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

function deleteGuildRow(guildID) {
    let table = document.querySelector("table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("guild-id") == guildID) {
            table.deleteRow(i);
            break;
        }
    }
}
