import moment from 'moment';

export default function tasksReducer(notes, action) {
    switch (action.type) {
      case 'added': {        
        return [
          ...notes,
          {
            id: action.id,
            title: action.title,
            text: action.text,
            color: action.color,
            date: moment(),
          },
        ];
      }
      case 'changed': {
        return notes.map((n) => {
          if (n.id === action.note.id) {
            return {
                id: n.id,
                title: action.note.title,
                text: action.note.text,
                date: n.date,
                color: n.color,
            };
          } else {
            return n;
          }
        });
      }
      case 'deleted': {
        return notes.filter((n) => n.id !== action.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }
  