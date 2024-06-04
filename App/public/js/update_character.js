// get update class form
let updateCharacterForm = document.getElementById("update-character-form");

updateCharacterForm.addEventListener("submit", function (e){
    //prevent form being submitted
    e.preventDefault()

    const characterID = document.getElementById("update-character-id").value;
    const accountID = document.getElementById("update-character-account").value;
    const name = document.getElementById("update-character-name").value;
    const level = document.getElementById("update-character-level").value;
    const classID = document.getElementById("update-character-class").value;
    const guildID = document.getElementById("update-character-guild").value;
    
    // Get an array of hatIDs to associate with the character
    const hatElems = document.getElementsByName("update-character-hats").values();
    const hatIDs = new Array();
    for (const hat of hatElems){
        if (hat.checked){
            hatIDs.push(hat.value);
        }
    }
    

    let data = {
        characterID: characterID,
        accountID: accountID,
        name: name,
        level: level,
        classID: classID,
        guildID: guildID,
        hatIDs: hatIDs
    }

    // set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "characters/update", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateCharacterRow(xhttp.response, characterID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


// updates data in the character table after an update
function updateCharacterRow(data, characterID){
    
    let parsedData = JSON.parse(data);

    let table = document.getElementById("character-table");

    for(let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("character-id") == characterID){
            // find elements that need to be modified
            const updateRowTR = table.getElementsByTagName("tr")[i];

            const updateRowUsername = updateRowTR.getElementsByTagName("td")[1];
            const updateRowName = updateRowTR.getElementsByTagName("td")[2];
            const updateRowLevel = updateRowTR.getElementsByTagName("td")[3];
            const updateRowClass = updateRowTR.getElementsByTagName("td")[4];
            const updateRowGuild = updateRowTR.getElementsByTagName("td")[5];

            // set table data to match update
            updateRowUsername.innerHTML = parsedData[0].username;
            updateRowName.innerHTML = parsedData[0].name;
            updateRowLevel.innerHTML = parsedData[0].level;
            updateRowClass.innerHTML = parsedData[0].class;
            updateRowGuild.innerHTML = parsedData[0].guild;
        }
    }
}


function editCharacter(characterID){
    const updateCharacterSelect = document.getElementById("update-character-id");
    updateCharacterSelect.value = characterID;
    fillUpdateForm(characterID);
}


// fills update form with character data (characterID string)
function fillUpdateForm(characterID){
    // characters table
    const table = document.getElementById("character-table");

    // parts of the form to update
    const accountInput = document.getElementById("update-character-account");
    const nameInput = document.getElementById("update-character-name");
    const levelInput = document.getElementById("update-character-level");
    const classInput = document.getElementById("update-character-class");
    const guildInput = document.getElementById("update-character-guild");

    if (characterID === "0"){
        //accountInput.value = ;
        nameInput.value = "";
        levelInput.value = "";
        classInput.value = "NULL";
        guildInput.value = "NULL";
        const checkboxes = document.getElementsByName("update-character-hats");

        for (checkbox of checkboxes){
            // uncheck all checkboxes to start
            checkbox.checked = false;
        }
    }
    else{
        for(let i = 0, row; row = table.rows[i]; i++){
            if (table.rows[i].getAttribute("character-id") == characterID){
                const characterRowTR = table.getElementsByTagName("tr")[i];

                const characterRowAccount = characterRowTR.getElementsByTagName("td")[1];
                const characterRowName = characterRowTR.getElementsByTagName("td")[2];
                const characterRowLevel = characterRowTR.getElementsByTagName("td")[3];
                const characterRowClass = characterRowTR.getElementsByTagName("td")[4];
                const characterRowGuild = characterRowTR.getElementsByTagName("td")[5];

                accountInput.value = characterRowAccount.getAttribute("account-id");
                nameInput.value = characterRowName.innerHTML;
                levelInput.value = characterRowLevel.innerHTML;
                classInput.value = characterRowClass.getAttribute("class-id");
                guildInput.value = characterRowGuild.getAttribute("guild-id");
            }
        }
        const checkboxes = document.getElementsByName("update-character-hats");
        const intersectionTable = document.getElementById("intersection-table");

        for (checkbox of checkboxes){
            // uncheck all checkboxes to start
            checkbox.checked = false;
            for (let i = 1, row; row = intersectionTable.rows[i]; i++){
                if (intersectionTable.rows[i].getElementsByTagName("td")[1].getAttribute("character-id") === characterID){
                    if (intersectionTable.rows[i].getElementsByTagName("td")[2].getAttribute("hat-id") === checkbox.value){
                        checkbox.checked = true
                    }
                }
            }
        }
    }
}


// get update form character select element
let updateCharacterSelect = document.getElementById("update-character-id");

// autofill update form with current data when selected character changes
updateCharacterSelect.addEventListener("change", function (e){
    fillUpdateForm(e.target.value);
});