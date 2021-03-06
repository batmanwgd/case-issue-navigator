export default class NoteUtils {
  static getFollowUp(notes: Note[] | undefined, subtype: SubType): Note | null {
    if (!notes) {
      return null;
    }
    const notesOfSubtype = notes
      .filter(note => note.subType === subtype)
      .sort((a, b) => {
        return (
          new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
        );
      });

    const followUp = notesOfSubtype[0];
    return followUp ? followUp : null;
  }
}
