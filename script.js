let menuBtn = document.querySelector(`.menuButton`);
let toolHeader = document.querySelector(`.toolHeader`);
// toolHeader.addEventListener(`click`,()=>{
// })
let toolHeaderFlag = true;

menuBtn.addEventListener(`click`, () => {
  toolHeaderFlag ? (toolHeaderFlag = false) : (toolHeaderFlag = true);
  if (toolHeaderFlag) {
    let iconElem = menuBtn.children[0];
    iconElem.innerText = "menu";
    toolHeader.style.display = "none";
    toolHeader.classList.remove("scale-tools");
    penTool.style.display = "none";
    eraserTool.style.display = "none";
    stickyNotesCont.style.display = "none";
  } else if (!toolHeaderFlag) {
    let iconElem = menuBtn.children[0];
    iconElem.innerText = "close";
    toolHeader.style.display = "";
    toolHeader.classList.add("scale-tools");
  }
});

//pen script
let toolPenFlag = true;
let pen = document.querySelector(`.pen`);
let penTool = document.querySelector(`.penTool`);
pen.addEventListener("click", () => {
  toolPenFlag ? (toolPenFlag = false) : (toolPenFlag = true);
  if (toolPenFlag) {
    penTool.style.display = "none";
  } else if (!toolPenFlag) {
    penTool.style.display = "";
  }
});
//eraser script
let toolEraserFlag = true;
let eraser = document.querySelector(`.eraser`);
let eraserTool = document.querySelector(`.eraserTool`);
eraser.addEventListener("click", () => {
  toolEraserFlag=!toolEraserFlag
  if(toolEraserFlag) eraserTool.style.display="flex";
  else eraserTool.style.display="none";
   
   //another logic--->

  // toolEraserFlag ? (toolEraserFlag = false) : (toolEraserFlag = true);
  // if (toolEraserFlag) {
  //   eraserTool.style.display = "flex";
  // } else if (!toolEraserFlag) {
  //   eraserTool.style.display = "none";
  // }
});

//stickyScript
let sticky = document.querySelector(`.stickyNote`);

sticky.addEventListener("click", (e) => {
  let stickyTemplateHTML= `<div class="header-cont">
          <div class="minimize"></div>
          <div class="remove"></div>
        </div>
        <div class="note-cont">
            <textarea spellcheck="false"></textarea>
        </div>`;
    createSticky(stickyTemplateHTML);

});
//sticky actions
function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove();
  });

  minimize.addEventListener("click", (e) => {
    let noteCont = stickyCont.querySelector(`.note-cont`);
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") noteCont.style.display = "block";
    else noteCont.style.display = "none";
  });
}
//drag and drop code
function dragNdDrop(element, event) {
  // (1) prepare to moving: make absolute and on top by z-index
  element.style.position = "absolute";
  element.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  //   document.body.append(ball);

  // centers the ball at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    element.style.left = pageX - element.offsetWidth / 2 + "px";
    element.style.top = pageY - element.offsetHeight / 2 + "px";
  }

  // move our absolutely positioned ball under the pointer
  moveAt(element.pageX, element.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // (3) drop the ball, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}

//uploadSticky script
let upSticky = document.querySelector(`.uploadSticky`);
upSticky.addEventListener("click", (e) => {
  //to open file explorer
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let stickyTemplateHTML = `<div class="header-cont">
          <div class="minimize"></div>
          <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src="${url}"></img>
        </div>`;
    createSticky(stickyTemplateHTML);
  });
});

function createSticky(stickyTemplateHTML) {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = stickyTemplateHTML;
  document.body.appendChild(stickyCont);

  let minimize = stickyCont.querySelector(`.minimize`);
  let remove = stickyCont.querySelector(`.remove`);

  noteActions(minimize, remove, stickyCont);

  stickyCont.onmousedown = function (event) {
    dragNdDrop(stickyCont, event);
  };
}
