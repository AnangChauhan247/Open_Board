let canvas = document.querySelector(`canvas`);
canvas.width=window.innerWidth;
canvas.height = window.innerHeight;
let penColorCont = document.querySelectorAll(`.pen-color`);
let penWidthElem = document.querySelector(`.pen-width`);
let eraserWidthElem = document.querySelector(`.eraser-width`);
let download = document.querySelector(`.Download`);
let redo = document.querySelector(`.redo`);
let undo = document.querySelector(`.undo`);

let penColor="red";
let eraserColor = "#f5f6fa";
let penWidth=penWidthElem.value;
let eraserWidth=eraserWidthElem.value;

//undo redo tracker array
let undoRedoArr = []; //data
let track = 0; //represents actions


//API
let tool = canvas.getContext("2d");
tool.strokeStyle=penColor;
tool.lineWidth=penWidth;
let mouseDown=false;
// tool.beginPath();//new Path...line
// tool.moveTo(10,10);//start point of the line
// tool.lineTo(100,150); //end point of the line
// tool.stroke(); //to fill color in the line

//mousedown -> start new path
//mousemove -> path fill(graphics)

canvas.addEventListener("mousedown", (e)=>{
    mouseDown=true;
    beginPath({
        x:e.clientX,
        y:e.clientY
    })
    
})

canvas.addEventListener("mousemove", (e)=>{
    if(mouseDown) drawStroke({
        x:e.clientX,
        y:e.clientY,
        color:toolEraserFlag ? eraserColor : penColor,
        width:toolEraserFlag ? eraserWidth : penWidth
    })
    
})

canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;

  //undo redo fnx
  let url = canvas.toDataURL();
  undoRedoArr.push(url);
  track = undoRedoArr.length-1;
});

undo.addEventListener("click",(e)=>{
    if(track>0) track--; 
    //track-action
    let trackObj={
        trackValue: track,
        undoRedoArr
    }
    undoRedoCanvas(trackObj);
})

redo.addEventListener("click", (e) => {
    if (track < undoRedoArr.length-1) track++; 

    //track-action
    let trackObj = {
       trackValue: track,
       undoRedoArr,
     };
    undoRedoCanvas(trackObj);
});

function undoRedoCanvas(trackObj) 
{
  track = trackObj.trackValue;
  undoRedoArr = trackObj.undoRedoArr;

  let url = undoRedoArr[track];
  let img = new Image(); //new image referance element
  img.src = url;
  img.onload = (e)=>{
      tool.drawImage(img,0,0,canvas.width, canvas.height);
  }
}

function beginPath(strokeObj)
{
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj) {
//   tool.strokeStyle = strokeObj.color;
//   tool.lineWidth = strokeObj.width;
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.stroke();
}


penColorCont.forEach((colorElem)=>{
    colorElem.addEventListener("click",(e)=>{
        let color = colorElem.classList[0];
        penColor=color;
        tool.strokeStyle=penColor;
    })
})
 
penWidthElem.addEventListener("change",(e)=>{
    penWidth = penWidthElem.value;
    tool.lineWidth = penWidth;
})

eraserWidthElem.addEventListener("change", (e) => {
  eraserWidth = eraserWidthElem.value;
  tool.lineWidth = eraserWidth;
});

eraser.addEventListener("click",(e)=>{
    if(toolEraserFlag)
    {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }
    else
    {
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
})

//download board ss
download.addEventListener("click",(e)=>{
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})

