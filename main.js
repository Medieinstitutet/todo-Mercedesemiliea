// Väntar tills dokumentet har laddats innan koden körs
window.addEventListener('load', () => {
	// Hämta formuläret,input-fältet och listan från DOM
	const form = document.getElementById("new-task-form");
	const input = document.getElementById("new-task-input");
	const list_el = document.getElementById("tasks");
	

	console.log(form, input, list_el);

	//Lägger till en lyssnare för formulärets submit-event
	form.addEventListener('submit', (e) => {
		//Förhindrar standardbeteendet
		e.preventDefault();
		

		//Hämta värdet från input-fältet
		const task = input.value;

		//Skapar nya DOM-element för uppgiften och innehållet
		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

   

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';

		// 	lägger till lyssnare för edit och delete knapparna
		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});
	});
});

// Funktion för att visa dagens datum

function displayDate() {
	let date = new Date();
	date = date.toString().split(" ");
	date = date[1] + " " + date[2] + " " + date[3];
	document.querySelector("#date").innerHTML = date;
  }

  displayDate();