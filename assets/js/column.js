const Column = {
	idCounter: 4,
	dragged: null,
	dropped: null,
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

		columnElement.addEventListener('dragover', Column.dragover)
		columnElement.addEventListener('drop', Column.drop)
	},

	dragstart (evet) {
		Column.dragged = this;
		Column.dragged.classList.add('dragged');

		event.stopPropagation();

		document.querySelectorAll('.note').forEach(noteElement => noteElement.removeAttribute('draggable'));
	},

	dragend (event) {
		Column.dragged.classList.remove('dragged');
		Column.dragged = null;
		Column.dropped = null;

		document.querySelectorAll('.note').forEach(noteElement => noteElement.setAttribute('draggable', true));
	},

	dragover (event) {
		event.preventDefault();
		event.stopPropagation();

		if(Column.dragged === this){
			if(Column.dropped){
				Column.dropped.classList.remove('under');
			}
			Column.dropped = null;
		}

		if(!Column.dragged || Column.dragged === this) return;

		Column.dropped = this;
		document.querySelectorAll('.column').forEach(columnElement => columnElement.classList.remove('under'));

		this.classList.add('under');
	},

	drop () {
		if(Note.dragged) {
			return this.querySelector('[data-notes]').append(Note.dragged);
		}

		else if(Column.dragged) {
			const children = Array.from(document.querySelector('.columns').children);
			const indexA = children.indexOf(this);
			const indexB = children.indexOf(Column.dragged);

			if(indexA < indexB) {
				document.querySelector('.columns').insertBefore(Column.dragged, this);
			} else {
				document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling);
			}

			document.querySelectorAll('.column').forEach(columnElement => columnElement.classList.remove('under'));

		}
	}

}
