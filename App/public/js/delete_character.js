// send a request to the backend to delete character matching characterID
function deleteCharacter(characterID){
    const data = {
        characterID: characterID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/characters/delete", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteCharacterRow(characterID);
            deleteCharacterOption(characterID);
            deleteHatRows(characterID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.");
        }
    }

    xhttp.send(JSON.stringify(data));
}

// deletes the character from the HTML table
function deleteCharacterRow(characterID){
    let table = document.getElementById("character-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("character-id") == characterID) {
            table.deleteRow(i);
            break;
        }
    }
}

// deletes the character from the dropdown menu in the update character form
function deleteCharacterOption(characterID){
    let characterSelect = document.getElementById("update-character-id");
    for (let i = 0; i < characterSelect.length; i++){
        if (Number(characterSelect.options[i].value) === Number(characterID)){
            characterSelect[i].remove();
            break;
        } 
    }
}

// removes rows from the intersection table
function deleteHatRows(characterID){
    let intersectionTable = document.getElementById("intersection-table");
    for (let i = intersectionTable.rows.length - 1; i > 0; i--) {
        let intersectionRow = intersectionTable.rows[i];
        let characterCell = intersectionRow.getElementsByTagName("td")[1];
        if (characterCell.getAttribute("character-id") == characterID) {
            intersectionTable.deleteRow(i);
        }
    }
}

// adds rows to the intersection table
function addHatRows(data){


}