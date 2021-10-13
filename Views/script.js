const po = document.getElementById('playersOnline');

// create tooltip element
const ttBox = document.createElement("div");

// set style
ttBox.id = "tt";
ttBox.style.visibility = "hidden"; // make it hidden till mouse over
ttBox.style.position = "fixed";
ttBox.style.top = po.style.top + "0.1rem";
ttBox.style.left = po.style.top + "0.1rem";
ttBox.style.padding = "0.1rem";
ttBox.style.width = "15rem";
ttBox.style.borderRadius = "1rem";
ttBox.style.border = "solid thin lightgray";
ttBox.style.backgroundColor = "#dadada";

// insert into DOM
document.body.appendChild(ttBox);

const ttTurnOn = ((evt) => {
    // get the position of the hover element
    const boundBox = evt.target.getBoundingClientRect();
    const coordX = boundBox.left;
    const coordY = boundBox.top;

    // adjust bubble position
    ttBox.style.left = (coordX + 40).toString() + "px";
    ttBox.style.top = (coordY + 40).toString() + "px";

    // add bubble content. Can include image or link
    ttBox.innerHTML = '';
    for (const key in nombres) {
            const element = nombres[key];
            ttBox.innerHTML += element + '</br>';
            console.log(nombres)
        }
    
    

    // make bubble VISIBLE
    ttBox.style.visibility = "visible";
});

const ttTurnOff = (() => { ttBox.style.visibility = "hidden"; });

po.addEventListener("mouseover", ttTurnOn , false);
po.addEventListener("mouseout", ttTurnOff , false);
document.getElementById("tt") . addEventListener("click", ttTurnOff , false);
