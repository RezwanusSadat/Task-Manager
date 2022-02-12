window.onload = function () {
	const taskField = document.getElementById("taskField");
	const addTaskBtn = document.getElementById("addTask");
	const allTaskField = document.getElementById("allTask");

	taskField.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			if (this.value) {
				createTask(allTaskField, event.target.value);
				this.value = "";
			} else {
				alert("Please Enter a Task!");
			}
		}
	});
	addTaskBtn.addEventListener("click", function (event) {
		if (taskField.value) {
			createTask(allTaskField, taskField.value);
			taskField.value = "";
		} else {
			alert("Please Enter a Task!");
		}
	});
};

function createTask(parent, task) {
	let col = createTag("div", "col-sm-3");
	let singleTask = createTag("div", "single-task d-flex");
	let singleTaskP = createTag("p", "");
	let removeBtn = createTag("span", "remove ml-auto");
	removeBtn.innerHTML = '<i class="fas fa-times-circle    "></i>';
	singleTaskP.innerHTML = task;
	singleTask.appendChild(singleTaskP);
	singleTask.appendChild(removeBtn);
	col.appendChild(singleTask);
	parent.appendChild(col);
	removeBtn.addEventListener("click", function () {
		parent.removeChild(col);
	});

	let taskControler = createControlPannel(singleTask);
	taskControler.style.visibility = "hidden";
	singleTask.appendChild(taskControler);
	singleTask.onmouseenter = function () {
		taskControler.style.visibility = "visible";
	};
	singleTask.onmouseleave = function () {
		taskControler.style.visibility = "hidden";
	};

	let editBtn = createEditBtn(singleTask);
	taskControler.appendChild(editBtn);
}

function createTag(tag, className) {
	let element = document.createElement(tag);
	element.classList = className || "";
	return element;
}

function createControlPannel(parent) {
	let controlPannel = createTag("div", "task-control-panel d-flex align-items-center");
	let colorPallete = createColorPallete(parent);
	controlPannel.appendChild(colorPallete);

	return controlPannel;
}

function createColorPallete(parent) {
	const colors = ["palegreen", "skyblue", "powderblue", "salmon", "grey", "red"];
	let colorBox = createTag("div", "d-flex");
	colors.forEach((color) => {
		let colorCircle = createTag("div", "color-circle ml-1");
		colorCircle.style.backgroundColor = color;
		colorCircle.addEventListener("click", function () {
			parent.style.backgroundColor = color;
		});
		colorBox.appendChild(colorCircle);
	});
	return colorBox;
}

function createEditBtn(parent) {
	let editIcon = createTag("span", "ml-auto mr-2");
	editIcon.innerHTML = '<i class="fas fa-edit    "></i>';
	editIcon.style.color = "#fff";
	editIcon.addEventListener("click", function () {
		let text = parent.querySelector("p");
		let textArea = createTag("textarea", "form-control inner-textarea");
		textArea.style.width = parent.offsetWidth + "px";
		textArea.style.height = parent.offsetHeight + "px";
		textArea.innerHTML = text.innerHTML;
		console.log(textArea);
		parent.appendChild(textArea);

		textArea.addEventListener("keypress", function (event) {
			if (event.key === "Enter") {
				event.stopPropagation();
				if (this.value) {
					text.innerHTML = this.value;
					parent.removeChild(this);
				} else {
					alert("Please Enter a Task");
				}
			}
		});
	});

	return editIcon;
}
