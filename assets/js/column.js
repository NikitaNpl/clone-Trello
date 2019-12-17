const Column = {
	idCounter: 4,
	dragged: null,
	process (columnElement) {
		const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

		spanAction_addNote.addEventListener('click', function (event) {
			const noteElement = Note.create()

			columnElement.querySelector('[data-notes]').append(noteElement);

			noteElement.setAttribute('contenteditable', 'true');
			noteElement.focus();
		})

		const headerElement = columnElement.querySelector('.column-header');

		headerElement.addEventListener('dblclick', function (event) {
			columnElement.removeAttribute('draggable');
			headerElement.setAttribute('contenteditable', 'true');
			headerElement.focus();
		})

		headerElement.addEventListener('blur', function (event) {
			columnElement.setAttribute('draggable', 'true');
			headerElement.removeAttribute('contenteditable');	
		})

		columnElement.addEventListener('dragstart', Column.dragstart)
		columnElement.addEventListener('dragend', Column.dragend)
		columnElement.addEventListener('dragenter', Column.dragenter)
		columnElement.addEventListener('dragover', Column.dragover)
		columnElement.addEventListener('dragleave', Column.dragleave)

		columnElement.addEventListener('dragover', Column.dragover)
		columnElement.addEventListener('drop', Column.drop)
	},

	dragstart (evet) {
		Column.dragged = this;
		Column.dragged.classList.add('dragged');
		event.stopPropagation();
	},

	dragend (event) {
		Column.dragged.classList.remove('dragged');
		Column.dragged = null;
	},

	dragenter (event) {
		if(!Column.dragged || Column.dragged === this) return;
	},

	dragover (event) {
		event.preventDefault();
		if(!Column.dragged || Column.dragged === this) return;
	},

	dragleave (event) {
		if(!Column.dragged || Column.dragged === this) return;
	},

	dragover (event) {
		event.preventDefault();
	},

	drop () {
		if(Note.dragged) {
			return this.querySelector('[data-notes]').append(Note.dragged);
		}

		else if(Column.dragged) {
			
		}
	}

}
