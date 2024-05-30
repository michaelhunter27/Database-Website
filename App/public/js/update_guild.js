
let updateGuildForm = document.getElementById("update-guild-form");

updateGuildForm.addEventListener("submit", function (e) {
    
    e.preventDefault();

    const guildID = document.getElementById("update-guild-id").value;
    const name = document.getElementById("update-guild-name").value;
    const creation_date = document.getElementById("update-guild-creation-date").value;

    let data = {
        guildID: guildID,
        currentName: currentName,
        creation_date: creation_date,
        newName: newName
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

    let table = document.querySelector("table");

    for (let i = 1, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("guild-id") == guildID) {
           
            const updateRowTR = table.rows[i];

            const updateRowName = updateRowTR.cells[1];
            const updateRowCreationDate = updateRowTR.cells[2];

            updateRowName.innerHTML = parsedData[0].name;
            updateRowCreationDate.innerHTML = parsedData[0].creation_date;
        }
    }
}

function editGuild(guildID) {

    let table = document.querySelector("table");
    for (let i = 1, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("guild-id") == guildID) {
            
            const currentName = table.rows[i].cells[1].innerText;
            const currentCreationDate = table.rows[i].cells[2].innerText;

           
            document.getElementById("update-guild-id").value = guildID;
            document.getElementById("update-guild-name").value = currentName;
            document.getElementById("update-guild-creation-date").value = currentCreationDate;
            document.getElementById("new-guild-name").value = "";

         
            document.getElementById("update-guild-form").style.display = "block";
        }
    }
}
