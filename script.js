const defaultColor = '#000000';

let CURRENT_COLOR = defaultColor;
let CURRENT_BACKGROUND = '#FFFFFF';
let OLD_BACKGROUND;
let RANDOM_COLOR = false;
let ERASER = false;
let GRID = false;

function setCurrentColor(newColor){    
    CURRENT_COLOR = newColor;
}

function setCurrentBackground(newBackground){
            
    CURRENT_BACKGROUND = newBackground;
}

let mouseDown = false;
document.addEventListener('mousedown', () => mouseDown = true);
document.addEventListener('mouseup', () => mouseDown = false);

function drawGrid(rows, columns){
    const grid = document.querySelector('#grid');

    while(grid.firstChild){
        grid.firstChild.remove();
    }

    for(let i = 1; i <= columns; i++){
        let column = document.createElement('div');    
        column.style.display = 'flex';
        column.style.flexDirection = 'column';
        column.style.flex = '1';
        column.style.border = 'none';   
        
        for (let j = 1; j <= rows; j++){
            let row = document.createElement('div');        
            row.style.height = '100%';
            row.style.background = CURRENT_BACKGROUND;
            GRID ? row.style.border ='1px solid #ededed' : row.style.border = 'none'            
            row.classList.add('gridmember');
            row.addEventListener('mouseover', changeNodeColor);
            row.addEventListener('click', changeNodeColorOnClick);            
            column.appendChild(row);
        }
        grid.appendChild(column);
    }
    // need the nodelist here to be able to draw after reset
    return document.querySelectorAll('.gridmember');    
}
function changeNodeColorOnClick(e){
    if(ERASER){        
        e.target.style.background = CURRENT_BACKGROUND;
    }
    else if(RANDOM_COLOR){
        e.target.style.background = randomColor();
    } else if (!RANDOM_COLOR){
        e.target.style.background = CURRENT_COLOR;
    }
}
function changeNodeColor(e){
    if(mouseDown && ERASER){        
        e.target.style.background = CURRENT_BACKGROUND;
    }
    else if(mouseDown && RANDOM_COLOR){
        e.target.style.background = randomColor();
    } else if (mouseDown && !RANDOM_COLOR){
        e.target.style.background = CURRENT_COLOR;
    }
}

function hexc(colorval) {    
    let parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (let i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
    return color;
  }

function changeBgColor(newBG){
    let nodes = document.querySelectorAll('.gridmember');
    nodes.forEach( (e) => {        
        if(hexc(e.style.background) === OLD_BACKGROUND){
            e.style.background = newBG;
        }
    });
}



function toggleGrid(){
    let nodes = document.querySelectorAll('.gridmember');
    if(GRID){        
        nodes.forEach( (e) => {
         e.style.border = '1px solid #ededed';        
        })
    }else{
        nodes.forEach( (e) => e.style.border = 'none');
    }
}

let nodecolorpicker = document.querySelector('#nodecolorpicker');
nodecolorpicker.addEventListener('change', (e) =>{
    setCurrentColor(e.target.value);
    let randomColourckbx = document.querySelector('#randomColour');
        randomColourckbx.checked = false;
        RANDOM_COLOR = false;
        let eraserckbx = document.querySelector('#eraser');
        eraserckbx.checked = false;
        ERASER = false;
})

let bgcolorpicker = document.querySelector('#bgcolorpicker');
bgcolorpicker.addEventListener('change', (e) => {    
    setCurrentBackground(e.target.value);
    changeBgColor(e.target.value);   
})

bgcolorpicker.addEventListener('click', (e) => OLD_BACKGROUND = e.target.value);

let clearGridbtn = document.querySelector('#resetGrid');
clearGridbtn.addEventListener('click', () => {
    drawGrid(slider.value,slider.value);
});

let slider = document.querySelector("#myRange");

slider.addEventListener('change', () => {
    console.log(slider.value)
    drawGrid(slider.value,slider.value);
})

let output = document.querySelector("#size");

let randomColourchkbx = document.querySelector('#randomColour');
randomColourchkbx.addEventListener('change', (e) => {    
    if (e.target.checked){
        let eraserckbx = document.querySelector('#eraser');
        eraserckbx.checked = false;
        ERASER = false;
    }
    e.target.checked ? RANDOM_COLOR = true : RANDOM_COLOR = false;    
});

let eraserchkbx = document.querySelector('#eraser');
eraserchkbx.addEventListener('change', (e) => {
    console.log('eraser');
    if (e.target.checked){
        let randomColourckbx = document.querySelector('#randomColour');
        randomColourckbx.checked = false;
    }
    e.target.checked ? ERASER = true : ERASER = false;
})

let gridchkbx = document.querySelector('#gridToggle');
gridchkbx.addEventListener('change', (e) => {
    console.log('grid');
    
    e.target.checked ? GRID = true : GRID = false;
    toggleGrid();
})

function randomColor(){
   return '#' + Math.floor(Math.random()*16777215).toString(16);
}

output.textContent = `Size: ${slider.value}x${slider.value}`;
slider.oninput = () => output.textContent = `Size: ${slider.value}x${slider.value}`;

drawGrid(slider.value,slider.value)



