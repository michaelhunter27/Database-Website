// Get update guild form
let updateGuildForm = document.getElementById("update-guild-form");

updateGuildForm.addEventListener("submit", function (e) {
    // Prevent the form from being submitted
    e.preventDefault();

    // Get form values
    const guildID = document.getElementById("update-guild-id").value;
    const name = document.getElementById("update-guild-name").value;
    const creation_date = document.getElementById("update-guild-creation-date").value;

    // Create data object to send in the request
    let data = {
        guildID: guildID,
        name: name,
        creation_date: creation_date
    };

    // Set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/guilds/update", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Define AJAX request resolution
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the table row with new data
            updateGuildRow(xhttp.response, guildID);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateGuildRow(data, guildID) {
    let parsedData = JSON.parse(data);

    let table = document.querySelector("table");

    for (let i = 1, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("guild-id") == guildID) {
            // Find elements that need to be modified
            const updateRowTR = table.rows[i];

            const updateRowName = updateRowTR.cells[1];
            const updateRowCreationDate = updateRowTR.cells[2];

            // Set table data to match update
            updateRowName.innerHTML = parsedData[0].name;
            updateRowCreationDate.innerHTML = parsedData[0].creation_date;
        }
    }
}

function editGuild(guildID) {
    // Find the guild in the table
    let table = document.querySelector("table");
    for (let i = 1, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("guild-id") == guildID) {
            // Get the current values from the table row
            const currentName = table.rows[i].cells[1].innerText;
            const currentCreationDate = table.rows[i].cells[2].innerText;

            // Set the form values to the current values
            document.getElementById("update-guild-id").value = guildID;
            document.getElementById("update-guild-name").value = currentName;
            document.getElementById("update-guild-creation-date").value = currentCreationDate;

            // Show the update form
            document.getElementById("update-guild-form").style.display = "block";
        }
    }
}
