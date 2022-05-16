# Open_Board
The project comprises of basic openboard functionalities such as, writing, erasing, downloading the canvas, adding notes (with minimising it, closing it, dragging it around on the page), uploading the image (features same as of notes), undo and redo actions.
Added realtime drawing functionality using Socket.io by connecting to server using Express.js
![1](https://user-images.githubusercontent.com/97803824/168537619-84e29664-2c0d-4258-af49-38cbea9c8fb7.png)
## Adding notes and uploading image:    
Using green button, we can minimise the notes and by clicking red button, notes can be closed. Similarly for uploading images.
![2](https://user-images.githubusercontent.com/97803824/168537655-27b7f103-1e58-4e3d-8336-e913719380ec.png)
## Tech Stack used:
* HTML
* CSS
* JavaScript
* Express.js
* Socket.io

## Key Features:  
This real-time whiteboard provides the user with following features:
* Draw using pencil (3 different colors, scale the pencil size)
* Erase the drawn area using eraser(scale the eraser size)
* Include a sticky note to make notes (feature to add multiple sticky notes, move sticky note around the drawing area, minimize and close the sticky note)
* Upload an image or gif (feature to add multiple files,feature to move the file, close the file)
* Download the drawing part on the user screen
* Redo or undo the drawing content changes.
* Real-time virtual environment for drawing and erasing.

## Run on your local machine:   

Rep lace openboard-anang.herokuapp.com/ with http://localhost:3000/ in index.htmlfile.
Open the folder in VS code. Open terminal and write these commands:

> npm init
## Press Enter. Then,

> npm install socket.io     
> npm install --save-dev nodemon   
> node app.js   
## Now open the browser and type localhost:3000.
