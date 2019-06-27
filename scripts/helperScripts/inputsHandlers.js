import { selectedCell, myWorldMap, logKeyDowns, addableActorsList, selectedActor } from "../index.js"
import { displayCellContents, updateWorldTable } from "../worldMap.js"

//for clicking on table cells
//Used in worldMap
export function clickHandler(e) {
    //the displaying of a cell and messing with selectedCell value requires that there IS a cell clicked on
    if ((e.target.cellIndex || e.target.cellIndex === 0) && (e.target.parentElement.rowIndex || e.target.parentElement.rowIndex === 0)) {
        //clear tint from last selected cell (if one exists)
        if (selectedCell.length) {
            let td = document.getElementById("tableWrapper").children[0].children[selectedCell[1]].children[selectedCell[0]];
            td.classList.remove("selectedCell");
        }
        selectedCell.length = 0;
        selectedCell.push(e.target.cellIndex, e.target.parentElement.rowIndex);
        //Tint the selected cell border
        // e.target.classList.add("selectedCell");
        displayCellContents(myWorldMap, ...selectedCell);
    }
}

export function keydownHandler(e) {
    if (logKeyDowns) { console.log(e.code); }

}
//adds selected actor to the worldMap AND updates the world table
export function addActorHandler(e) {
    if (!selectedCell.length) {
        alert("You need to select a cell to add an actor!")
        return;
    }
    let chosenActor = addableActorsList[document.getElementById("addActorSelector").value];
    new chosenActor(myWorldMap, ...selectedCell)
    updateWorldTable(myWorldMap);
}
//tints selected li from cellContents
export function selectActorHandler(e) {
    //set selected Actor
    if (e.target.nodeName === "P") {
        //remove tint from any other nodes around
        for (let i = 0; i < document.getElementById("cellContents").children.length; i++) {
            let temp = document.getElementById("cellContents").children[i]
            if (temp.classList.contains("selected")) {
                temp.classList.remove("selected")
            }
        }
        e.target.classList.add("selected");
        //remove selected actor if it exists
        if (selectedActor.length) {
            selectedActor.pop()
        }
        selectedActor.push(
            //gets actor
            myWorldMap[selectedCell[0]][selectedCell[1]].presentActors[
            //this gets the index of the selected node
            [...e.target.parentNode.children].indexOf(e.target)
            ]
        )
    } else { return; }
    displaySelectedActor(selectedActor[0]);
}

function displaySelectedActor(actor) {
    document.getElementById("selectedActorName").innerHTML = (
        `${selectedActor[0].name} (${selectedActor[0].location.x},${selectedActor[0].location.y})`
    )
    //creates lis
    let ul = document.getElementById("selectedActorProperties");
    let keys = Object.keys(actor)
    let liList=[];
    for (let i = 0; i < keys.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `${keys[i]}: ${actor[keys[i]]}`;
        liList.push(li);
    }

    //empties ul
    while(ul.firstChild){
        ul.remove(ul.firstChild);
    }





    //appends lis
    ul.append(...liList)



    
}