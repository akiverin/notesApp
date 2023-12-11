import moment from 'moment'; // Импортируем библиотеку moment.js

export default function tasksReducer(notes, action) {
    switch (action.type) {
      case 'added': {
        console.log({
            id: action.id,
            title: action.title,
            text: action.text,
            color: action.color,
            date: moment().format(),
          },)
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
            return action.note;
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
  