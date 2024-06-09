function deleteAccount(accountID) {
    const data = {
        accountID: accountID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/accounts/delete", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 204) {
                deleteAccountRow(accountID);
            } else {
                console.log("There was an error with the input.");
            }
        }
    };

    xhttp.send(JSON.stringify(data));
}

function deleteAccountRow(accountID) {
    let table = document.querySelector("table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("account-id") == accountID) {
            table.deleteRow(i);
            break;
        }
    }
}
