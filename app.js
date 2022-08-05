const trash = "https://image.flaticon.com/icons/svg/1214/1214428.svg"

document.getElementById('add-task').addEventListener('click', function() {
  let taskValue = document.getElementById('task-value').value;
  if(taskValue) addTask(taskValue);
});

const addTask = (taskValue) => {
  let task = document.createElement('li');
  task.classList.add('task');
  task.classList.add('fill');
  task.setAttribute("draggable", "true");
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);

  let taskContent = document.createElement('div');
  taskContent.classList.add('task-content');
  taskContent.innerText = taskValue;

  let trash = document.createElement('div');
  trash.classList.add('trash');
  trash.innerText = "X";
  trash.addEventListener('click', removeTask);

  task.appendChild(taskContent);
  task.appendChild(trash);

  let tasks = document.getElementById('tasks-added');
  tasks.insertBefore(task, tasks.childNodes[0]);
}

const removeTask = (event) => {
  let tasks = event.target.parentNode.parentNode;
  let task = event.target.parentNode;
  tasks.removeChild(task);
}


// DRAG & DROP

let task

const dragStart = (event) => {
  // console.log(event.target);
  event.target.className += ' hold';
  task = event.target;
  setTimeout(() => (event.target.className = 'invisible'), 0);
}

const dragEnd = (event) => {
  // console.log(event.target);
  event.target.className = 'task ';
}

const dropzones = document.querySelectorAll('.dropzone');

const dragEnter = (event) => {
  // console.log("ENTER");
  event.preventDefault();
  if(event.target.className === "column dropzone") {
    event.target.className += ' hovered';
  }
}

const dragOver = (event) => {
  // console.log("OVER");
  event.preventDefault();
}

const dragLeave = (event) => {
  // console.log("LEAVE");
  if(event.target.className === "column dropzone hovered") {
    event.target.className = "column dropzone"
  }
}

const dragDrop = (event) => {
  // console.log("DROP");
  if(event.target.className === "column dropzone hovered") {
    event.target.className = "column dropzone"
  }
  event.target.append(task);
}

for(const dropzone of dropzones) {
  dropzone.addEventListener('dragenter', dragEnter);
  dropzone.addEventListener('dragover', dragOver);
  dropzone.addEventListener('dragleave', dragLeave);
  dropzone.addEventListener('drop', dragDrop);
}

function resetPag() {
  location.reload()
}

allowDrop(event) {
  event.preventDefault()
}

// Drag and Drop Methods

drag(event) {
  const peca = $(event.target)
  event.dataTransfer.setData("text", peca.attr('id'))
  peca.addClass('esconder')
}

drop(event) {
  const peca = $('#' + event.dataTransfer.getData("text"))
  const slot = event.target
  this.inserePeca(peca, slot)
}

dragEnd(event) {
  const peca = $(event.target) 
  peca.removeClass('esconder')
}

// Touch Mothods

touchMove(event) {
  const pecaId = $(event.target).attr('data-id')
  const peca = $('#' + pecaId).addClass('esconder')
  const conteudo = peca.html()
  $('#peca-clone').html(conteudo).css('display', 'block').css('left', event.touches[0].clientX - 30).css('top', event.touches[0].clientY - 20)
}

touchEnd(event) {
  const clone = $('#peca-clone')
  const corX = parseInt($(clone).css('left'))
  const corY = parseInt($(clone).css('top'))
  const slot = document.elementFromPoint(corX, corY)
  const pecaId = $(event.target).attr('data-id')
  const peca = $('#' + pecaId).removeClass('esconder')

  clone.css('display', 'none').html('')
  this.inserePeca(peca, slot)
}

inserePeca(peca, slot) {
  if(
    (!$(slot).hasClass('peca-imagem') &&
      $(slot).html() == ''
    ) ||
    $(slot).hasClass('bancada')
  ) {
    $(slot).append(peca)
    this.fimJogo()
  }
}