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