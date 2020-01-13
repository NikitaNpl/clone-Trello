const Application = {
    save () {
        const object = {
            columns: {
                idCounter: Column.idCounter,
                items: []
            },
            notes: {
                idCounter: Note.idCounter,
                items: []
            }
        }
        

        document.querySelectorAll('.column').forEach(columnElememt => {
            const column = {
                id: parseInt(columnElememt.getAttribute('data-column-id')),
                title: columnElememt.querySelector('.column-header').textContent,
                noteIds: []
            };

            
            columnElememt.querySelectorAll('.note').forEach(noteElement => {
                column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
            });

            object.columns.items.push(column);

            
            
        })

        document.querySelectorAll('.note').forEach(noteElement => {
            const note = {
                id: parseInt(noteElement.getAttribute('data-note-id')),
                content: noteElement.textContent
            }
            
            object.notes.items.push(note);

            
            
        })
        
        
        const json = JSON.stringify(object);

        localStorage.setItem('trello', json);

    },

    load () {
        if(!localStorage.getItem('trello')) return;

        const mountePoint = document.querySelector('.columns');
        mountePoint.innerHTML = '';

        const object = JSON.parse(localStorage.getItem('trello'));
        const getNoteById = id => object.notes.items.find(note => note.id === id);

        for(const { id, title, noteIds } of object.columns.items) {
            const column = new Column(id);
            column.element.querySelector('.column-header').textContent = title;
            
            mountePoint.append(column.element);
            
            for(const noteId of noteIds) {
                const { id, content } = getNoteById(noteId);
                
                const note = new Note(id, content);
                column.add(note);

            }
        }

        Column.idCounter = object.columns.idCounter || 0;
        Note.idCounter = object.notes.idCounter || 0;

    }
}