document.querySelectorAll('.column').forEach(Column.process);

document.querySelectorAll('.note').forEach(Note.process);

document.querySelector('[data-action-addColumn]').addEventListener('click', function(event) {
	const columnElement = Column.create();
	document.querySelector('.columns').append(columnElement);
})

