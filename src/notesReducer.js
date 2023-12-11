export default function tasksReducer(notes, action) {
    switch (action.type) {
      case 'added': {
        return [
          ...notes,
          {
            id: action.id,
            title: action.title,
            text: action.text,
            color: action.color
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
  