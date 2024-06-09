let updateGuildForm = document.getElementById("update-guild-form-content");

updateGuildForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const guildID = document.getElementById("update-guild-id").value;
    const name = document.getElementById("update-guild-name").value;

    let data = {
        guildID: guildID,
        name: name
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/guilds/update", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateGuildRow(xhttp.responseText, guildID);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
});

function updateGuildRow(data, guildID) {
    let parsedData = JSON.parse(data)[0];

    let table = document.getElementById("guild-table");

    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].getAttribute("guild-id") == guildID) {
            const updateRowTR = table.getElementsByTagName("tr")[i];
            const updateRowName = updateRowTR.getElementsByTagName("td")[1];

            updateRowName.innerHTML = parsedData.name;
        }
    }
}

function editGuild(guildID) {
    let table = document.querySelector("table");
    for (let i = 1, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("guild-id") == guildID) {
            const name = table.rows[i].cells[1].innerText;

            document.getElementById("update-guild-id").value = guildID;
            document.getElementById("update-guild-name").value = name;

            document.getElementById("update-guild-form").style.display = "block";
        }
    }
}
