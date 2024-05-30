// get update class form
let updateClassForm = document.getElementById("update-class-form");

updateClassForm.addEventListener("submit", function (e){
    //prevent form being submitted
    e.preventDefault()

    let updateClassID = document.getElementById("update-class-id");
    let updateClassName = document.getElementById("update-class-name");
    let updateClassDescription = document.getElementById("update-class-description");

    let classID = updateClassID.value;
    let name = updateClassName.value;
    let description = updateClassDescription.value;

    let data = {
        classID: classID,
        name: name,
        description: description
    }

    // set up AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "classes/update", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, classID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


// autofill update form with current data when selected class changes
function updateClassSelect (classID){
    // classs table
    const table = document.getElementById("class-table");

    // parts of the form to update
    const nameInput = document.getElementById("update-class-name");
    const descriptionInput = document.getElementById("update-class-description");


    if (classID !== "0"){
        for(let i = 0, row; row = table.rows[i]; i++){
            if (table.rows[i].getAttribute("class-id") == classID){
                const classRowTR = table.getElementsByTagName("tr")[i];

                const classRowName = classRowTR.getElementsByTagName("td")[1];
                const classRowDescription = classRowTR.getElementsByTagName("td")[2];

                nameInput.value = classRowName.innerHTML;
                descriptionInput.value = classRowDescription.innerHTML;
            }
        }
    }
};


// get update form class select element
let classSelect = document.getElementById("update-class-id");

// add event listener so that function is called when select value changes
classSelect.addEventListener("change", (e) => {
    const classID = e.target.value;
    updateClassSelect(classID)
});


function updateRow(data, classID){
    
    let parsedData = JSON.parse(data);

    let table = document.getElementById("class-table");

    for(let i = 0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("class-id") == classID){
            // find elements that need to be modified
            let updateRowTR = table.getElementsByTagName("tr")[i];
            let updateRowName = updateRowTR.getElementsByTagName("td")[1];
            let updateRowDescription = updateRowTR.getElementsByTagName("td")[2];

            // set table data to match update
            updateRowName.innerHTML = parsedData[0].name;
            updateRowDescription.innerHTML = parsedData[0].description;
        }
    }
}

// change selected class in update class form
function editClass(classID){
    const classSelect = document.getElementById("update-class-id");
    classSelect.value = classID;
    updateClassSelect(classID);
}