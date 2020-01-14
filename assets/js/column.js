class Column {
	constructor (id = null) {
		const instance = this;
		this.notes = [];

		
		const element = this.element = document.createElement('div');
		
		element.classList.add('column');
		element.setAttribute('draggable', true);
		console.log(id);
		if (id) {
			element.setAttribute('data-column-id', id);
		} else {
			console.log(Column.idCounter);
			element.setAttribute('data-column-id', Column.idCounter++);
		}

		element.innerHTML = 
		`<p class="column-header">В плане</p>
		<div data-notes></div>
		<p class="column-footer">
			<span data-action-addNote class="action">+ Добавить карточку</span>
		</p>`

		const spanAction_addNote = element.querySelector('[data-action-addNote]');

		spanAction_addNote.addEventListener('click', function (event) {
			const note = new Note;
			instance.add(note);

			note.element.setAttribute('contenteditable', 'true');
			note.element.focus();

			Application.save();

		});

		const headerElement = element.querySelector('.column-header');

		headerElement.addEventListener('dblclick', function (event) {
			element.removeAttribute('draggable');
			headerElement.setAttribute('contenteditable', 'true');
			headerElement.focus();
		});

		element.addEventListener('keypress', function(event){
			console.log(headerElement.textContent.trim().length)
			if (event.keyCode == 13 && headerElement.textContent.trim().length > 0) {
				element.setAttribute('draggable', 'true');
				headerElement.removeAttribute('contenteditable');
			} else {
				return;
			}
		});

		headerElement.addEventListener('blur', function (event) {
			element.setAttribute('draggable', 'true');
			headerElement.removeAttribute('contenteditable');

			Application.save();
		});

		element.addEventListener('dragstart', this.dragstart.bind(this))
		element.addEventListener('dragend', this.dragend.bind(this))

		element.addEventListener('dragover', this.dragover.bind(this))
		element.addEventListener('drop', this.drop.bind(this))

	}

	

	add (...notes) {
		for(const note of notes) {
			if(!this.notes.includes(note)) {
				this.notes.push(note);
				this.element.querySelector('[data-notes]').append(note.element);
			}
		}
	}

	dragstart (evet) {
		Column.dragged = this.element;
		Column.dragged.classList.add('dragged');

		event.stopPropagation();

		document.querySelectorAll('.note').forEach(noteElement => noteElement.removeAttribute('draggable'));
	}

	dragend (event) {
		Column.dragged.classList.remove('dragged');
		Column.dragged = null;
		Column.dropped = null;
		// Column.delete = null;

		document.querySelectorAll('.note').forEach(noteElement => noteElement.setAttribute('draggable', true));

		document.querySelectorAll('.column').forEach(columnElement => columnElement.classList.remove('under'));

		Application.save();
	}

	dragover (event) {
		event.preventDefault();
		event.stopPropagation();

		if(Column.dragged === this.element){
			if(Column.dropped){
				Column.dropped.classList.remove('under');
			}
			Column.dropped = null;
		}

		if(!Column.dragged || Column.dragged === this.element) return;


		Column.dropped = this.element;
		document.querySelectorAll('.column').forEach(columnElement => columnElement.classList.remove('under'));

		this.element.classList.add('under');
	}

	drop () {
		if(Note.dragged) {
			return this.element.querySelector('[data-notes]').append(Note.dragged);
		}

		else if(Column.dragged) {
			const children = Array.from(document.querySelector('.columns').children);
			const indexA = children.indexOf(this.element);
			const indexB = children.indexOf(Column.dragged);

			if(indexA < indexB) {
				document.querySelector('.columns').insertBefore(Column.dragged, this.element);
			} else {
				document.querySelector('.columns').insertBefore(Column.dragged, this.element.nextElementSibling);
			}

			document.querySelectorAll('.column').forEach(columnElement => columnElement.classList.remove('under'));

		}
	}
}

Column.idCounter = 0;
Column.dragged = null;
Column.dropped = null;
Column.delete = null;
