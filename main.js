const tasks = [];

// Vänta tills dokumentet har laddats innan koden körs
window.addEventListener('load', () => {
  const form = document.getElementById("new-task-form");
  const input = document.getElementById("new-task-input");
  const list_el = document.getElementById("tasks");

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskContent = input.value;
    
    // Lägg till uppgiften i arrayen
    const taskObj = {
      content: taskContent,
      isEditable: false,
    };
    tasks.push(taskObj);

    // Skapa ett nytt task-element och lägg till i DOM
    const task_el = createTaskElement(taskObj);
    list_el.appendChild(task_el);

    input.value = '';
  });
});

function createTaskElement(taskObj) {
  const task_el = document.createElement('div');
  task_el.classList.add('task');

  const task_content_el = document.createElement('div');
  task_content_el.classList.add('content');

  const task_input_el = document.createElement('input');
  task_input_el.classList.add('text');
  task_input_el.type = 'text';
  task_input_el.value = taskObj.content;
  task_input_el.readOnly = !taskObj.isEditable;

  task_content_el.appendChild(task_input_el);
  task_el.appendChild(task_content_el);

  const task_actions_el = document.createElement('div');
  task_actions_el.classList.add('actions');

  const task_edit_el = document.createElement('button');
  task_edit_el.classList.add('edit');
  task_edit_el.innerText = taskObj.isEditable ? 'Save' : 'Edit';

  const task_delete_el = document.createElement('button');
  task_delete_el.classList.add('delete');
  task_delete_el.innerText = 'Delete';

  task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(task_delete_el);
  task_el.appendChild(task_actions_el);

  // Lägg till lyssnare för edit och delete knapparna
  task_edit_el.addEventListener('click', () => {
    toggleTaskEditableState(taskObj, task_input_el, task_edit_el);
  });

  task_delete_el.addEventListener('click', () => {
    deleteTask(taskObj, task_el);
  });

  return task_el;
}

function toggleTaskEditableState(taskObj, input_el, edit_el) {
  taskObj.isEditable = !taskObj.isEditable;
  input_el.readOnly = !taskObj.isEditable;
  edit_el.innerText = taskObj.isEditable ? 'Save' : 'Edit';
}

function deleteTask(taskObj, task_el) {
  const index = tasks.indexOf(taskObj);
  if (index !== -1) {
    tasks.splice(index, 1);
    task_el.remove();
  }
}