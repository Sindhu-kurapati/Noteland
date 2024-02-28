const RootElement = document.querySelector('.one');
function App(){
  RootElement.parentNode.removeChild(RootElement);
  // removing the screen to show main components
  // RootElement.remove();
}
  

//hiding the right screens when click on create new note button
document.querySelector('#newNote').addEventListener("click",()=>{
  // right default page
  document.getElementById('removeDiv').style.display = 'none';
  //hide create new task
  document.getElementById('Addingtask').style.display = 'none';
  
  //hide note and tasks
  document.getElementById('AddingNote').style.display = 'none';
  //create note 
  document.getElementById('AddingCreate').style.display = 'block';
});

//lists of notes
let notesListRootElement = document.querySelector('.noteslist');
//saved notes 
let notes = [];

//Defining a variable to store active notes
let currentNote = '';

//rendering notes and tasks based on local storage
function renderElementsToScreen(){
  //Reset elements
  document.getElementById('tasklist').innerHTML = '';
  notesListRootElement.innerHTML = '';

  //Rendering notes list
  if(localStorage.getItem('notes')){
    notes = JSON.parse(localStorage.getItem('notes'));
    notes.forEach((note)=>{
      console.log(currentNote);
      renderNoteToList(note, note.uniqueID);
      // if it is current note then show in task
      if(note.uniqueID === currentNote){
        note.tasks.forEach((task)=>{
          renderTaskToList(task,task.uniqueID);
        });
      }
    });
  }
}

//saving the note on create note click
document.querySelector('#createNoteButton').addEventListener('click',()=>{
  //check note titile is empty
  if(document.querySelector('#createNoteTitle').value === '' &&  document.querySelector('#createNoteContent').value === ''){
    alert('Enter the Required Fields');
  }else{
    //unique id for new note
    let uniqueID = 'note' + Math.floor(Math.random()* 100);
    //set new notes data
    let note = {
      title: document.querySelector('#createNoteTitle').value,
      content: document.querySelector('#createNoteContent').value,
      tasks: [],
    };
    //set note to local storgae
    addNoteToLocalStorage(note,uniqueID);
    //render new note to notes list
    renderNoteToList(note,uniqueID);
    //hide create new note
    document.getElementById('AddingNote').style.display = 'none';
    //hide note and tasks
    document.getElementById('Addingtask').style.display = 'none';
     //create note 
    document.getElementById('AddingCreate').style.display = 'none';
    // default page
    document.getElementById('removeDiv').style.display = 'block';
  }
});

//Render Note Item to show in notes list
function renderNoteToList(note, uniqueID){
  //creating required DOM Elements
  let noteDiv = document.createElement('div');
  noteDiv.classList.add('note',uniqueID);
  let noteTitle = document.createElement('h1');
  let noteContent = document.createElement('p');
  let noteDeleteButton = document.createElement('Button');
  let div = document.createElement('div');
  div.setAttribute('id','taskNoteList');
  //set note values
  noteTitle.innerText = note.title;
  noteContent.innerText = note.content;
  noteDeleteButton.innerHTML = 'Delete Note';


  //deleting note of particular notes
  noteDeleteButton.addEventListener('click',()=>{
    removeElementFromNoteList(uniqueID);
  });

  //when note is clicked
  noteDiv.addEventListener('click',(RootElement)=>{
    //deleting the note on delete button click current node
    if(RootElement.target === noteDeleteButton){
      removeElementFromNoteList(uniqueID);
    }else{
      //create note 
      document.getElementById('AddingCreate').style.display = 'none';
      //hide create new task
      document.getElementById('Addingtask').style.display = 'none';
      //show note to edit for selected note
      document.getElementById('AddingNote').style.display = 'block';

      //assigning uniqueid to currentNote
      currentNote = uniqueID;
      renderElementsToScreen();
    }

    //update header text of the screen
    let headerright = document.querySelector('.headerright');
      headerright.innerText = note.title;

    //update Notes's Content 
    let notecontent = document.querySelector('.notecontent');
    notecontent.innerHTML = note.content;
  });
  //Append elements to DOM 
  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(div);
  noteDiv.appendChild(noteDeleteButton);
  notesListRootElement.appendChild(noteDiv);

  //reset add note from input elements
  document.querySelector('#createNoteTitle').value = "";
  document.querySelector('#createNoteContent').value = "";
}

const transparentBackground = document.getElementById('transparentBackground');

//when create task button is clicked 
document.querySelector('#createtask').addEventListener('click',()=>{
  if(document.querySelector('#taskname').value === ''){
    alert('Please enter the Task name');
  }else{
    //create uniqueid for new task
    let uniqueID = 'task' + Math.floor(Math.random()*100);
    //create task
    let task = {
      name:document.querySelector('#taskname').value,
      uniqueID : uniqueID,
    };

    //adding new task to the current selected note
    notes.forEach((note)=>{
      if(note.uniqueID === currentNote){
        note.tasks.push(task);
      }
    });

    const addingTaskSection = document.getElementById('Addingtask');
    addingTaskSection.classList.add('active');

      // Remove blur from transparent background
      document.getElementById('transparentBackground').style.display = 'none';


    //save data with new task to localstorage
    localStorage.setItem('notes',JSON.stringify(notes));
    //rendering new task 
    renderTaskToList(task, uniqueID);
    //hide create new task
    document.getElementById('Addingtask').style.display = 'none';
    //show note to edit for selected note
    document.getElementById('AddingNote').style.display = 'block';
    
  }
});



//element with list of tasks
tasklist = document.getElementById('#tasklist');
//tasks array
tasks = [];

//render task to list
function renderTaskToList(task,uniqueID){
  tasklist = document.querySelector('#tasklist');
  //create DOM Elements
  let taskDiv = document.createElement('div');
  taskDiv.classList.add('task',uniqueID);
  let checkbox = document.createElement('input');
  checkbox.setAttribute('type','checkbox');
  checkbox.id = 'checkbox';
  let taskname = document.createElement('p');
  //set values
  taskname.innerText = task.name;
  //append Elements
  tasklist.appendChild(taskDiv);
  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(taskname);

  document.querySelector('#taskname').value = '';
  //setting checkbox
  checkbox.addEventListener('click',()=>{
    alert('Task Completed ! You want to remove it')
    removeElementFromTaskList(uniqueID);
  });
}


//new task button is clicked
document.querySelector('#newtask').addEventListener('click',()=>{
  // document.getElementById('AddingNote').style.display = 'none';
  // document.getElementById('removeDiv').style.display = 'none';
  // document.getElementById('Addingtask').style.display = 'block';

  const addingTaskSection = document.getElementById('Addingtask');
  addingTaskSection.style.display = (addingTaskSection.style.display === 'none') ? 'block' : 'none';
  
  document.getElementById('transparentBackground').style.display = 'block';

  // Highlight the NEW TASK button
 document.querySelector('.Addtask').classList.add('highlighted');

  
});

//save note and task 
function addNoteToLocalStorage(note,uniqueID){
  note = {...note, uniqueID, tasks};
  notes.push(note);
  localStorage.setItem('notes',JSON.stringify(notes));
}

function addTaskToLocalStorage(task,uniqueID,noteID){
  task = {...task, uniqueID};
  tasks.push(task);
  notes = JSON.parse(localStorage.getItem('notes'));
  notes.forEach((note)=>{
    if(note.uniqueID === noteID){
      note.tasks = tasks;
    }
  });
  localStorage.setItem('notes',JSON.stringify(notes));
}



//delete all notes button
document.querySelector('#deleteAllnotes').addEventListener('click',()=>{
  document.querySelectorAll('.note').forEach((note)=>{
    note.remove();
  });
  localStorage.clear();
  window.location.reload();
});

function removeElementFromNoteList(id){
  document.querySelector('.' + id).remove();
  notes = JSON.parse(localStorage.getItem('notes'));
  let index = notes.findIndex((note)=>note.uniqueID == id);
  notes.splice(index, 1);
  localStorage.setItem('notes',JSON.stringify(notes));
}


function removeElementFromTaskList(id){
  //removing task from current note
  notes.forEach((note)=>{
    if(note.uniqueID === currentNote){
      note.tasks = note.tasks.filter((task)=>task.uniqueID !== id);
    }
  });
  //update notes
  localStorage.setItem('notes',JSON.stringify(notes));
  renderElementsToScreen();
}

//notes on the display
renderElementsToScreen();
let numberOfNotes = notes.length;
let notesFounded = document.querySelector('.notesFounded');
notesFounded.innerHTML = numberOfNotes + ' Notes Found';



var wrong = document.querySelector('.button');
wrong.addEventListener('click',function(){
  var AddingCreate = document.querySelector('#AddingCreate');
  AddingCreate.style.display = 'none';
  document.getElementById('removeDiv').style.display = 'block';
});


var closeButton =document.getElementById('button');
closeButton.addEventListener('click',function(){
  var AddingNote = document.querySelector('#AddingNote');
  AddingNote.style.display = 'none';
  document.getElementById('removeDiv').style.display = 'block';
})

var crossButton = document.getElementById('crossbutton');
crossButton.addEventListener('click', function () {
  var Addingtask = document.getElementById('Addingtask');
  Addingtask.style.display = 'none';
  
  // Display transparent background
  document.getElementById('transparentBackground').style.display = 'none';
});