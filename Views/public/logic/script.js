const po = document.getElementById('playersOnline');
const boxpo = document.getElementById('grppo');

// create tooltip element
const ttBox = document.createElement("div");

// set style
ttBox.id = "tt";
ttBox.style.visibility = "hidden"; // make it hidden till mouse over
ttBox.style.position = "absolute";
ttBox.style.paddingLeft = "0.5rem";
ttBox.style.paddingRight = "0.5rem";
ttBox.style.paddingBottom = "0.2rem";
ttBox.style.maxWidth = "15rem";
ttBox.style.borderRadius = ".3rem";
ttBox.style.border = "solid 0.5px #ffffff ";
ttBox.style.backgroundColor = "#fafafa";
ttBox.style.boxShadow = "0px 0px 10px #dadada";

// insert into DOM
document.body.appendChild(ttBox);

const ttTurnOn = ((evt) => {
    // get the position of the hover element
    const boundBox = evt.target.getBoundingClientRect();
    const coordX = boundBox.left;
    const coordY = boundBox.top;

    // adjust bubble position
    ttBox.style.left = (45).toString() + "px";
    ttBox.style.top = (coordY+10).toString() + "px";

    // add bubble content. Can include image or link
    ttBox.innerHTML = '';
    for (const key in nombres) {
            const element = nombres[key];
            ttBox.innerHTML += element + '</br>';
        }
    
    

    // make bubble VISIBLE
    ttBox.style.visibility = "visible";
});

const ttTurnOff = (() => { ttBox.style.visibility = "hidden"; });

grppo.addEventListener("mouseover", ttTurnOn , false);
grppo.addEventListener("mouseout", ttTurnOff , false);
document.getElementById("tt") . addEventListener("click", ttTurnOff , false);
