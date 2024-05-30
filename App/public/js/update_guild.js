let updateGuildForm = document.getElementById("update-guild-form");

updateGuildForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const guildID = document.getElementById("update-guild-id").value;
    const name = document.getElementById("update-guild-name").value;
    const creation_date = document.getElementById("update-guild-creation-date").value;

    let data = {
        guildID: guildID,
        name: name,
        creation_date: creation_date
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/guilds/update", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            updateGuildRow(xhttp.response, guildID);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
});

function updateGuildRow(data, guildID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("guild-table");

    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].getAttribute("guild-id") == guildID) {
            const updateRowTR = table.getElementsByTagName("tr")[i];
            const updateRowName = updateRowTR.getElementsByTagName("td")[1];
            const updateRowCreationDate = updateRowTR.getElementsByTagName("td")[2];

            updateRowName.innerHTML = parsedData[0].name;
            updateRowCreationDate.innerHTML = parsedData[0].creation_date;
        }
    }
}

function editGuild(guildID) {
    let table = document.querySelector("table");
    for (let i = 1, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("guild-id") == guildID) {
            const name = table.rows[i].cells[1].innerText;
            const creation_date = table.rows[i].cells[2].innerText;

            document.getElementById("update-guild-id").value = guildID;
            document.getElementById("update-guild-name").value = name;
            document.getElementById("update-guild-creation-date").value = creation_date;

            document.getElementById("update-guild-form").style.display = "block";
        }
    }
}
