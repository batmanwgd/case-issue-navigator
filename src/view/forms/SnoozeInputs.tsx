import React from "react";
import UsaSelect from "./UsaSelect";
import UsaTextInput from "./UsaTextInput";
import UsaNumberInput from "./UsaNumberInput";
import AddNoteInput from "./AddNoteInput";

interface Props {
  options: SnoozeOptionValue[];
  selectedOption: SnoozeOptionValue;
  followUpChange: (value: string) => void;
  snoozeReasonChange: (value: SnoozeReason) => void;
  caseIssueNotesChange: (value: string) => void;
  durationChange: (value?: number) => void;
  setError: (key: string, value: string) => void;
  deleteError: (key: string) => void;
  followUp: string;
  caseIssueNotes: string;
  duration: number | undefined;
}

export default function SnoozeInputs(props: Props) {
  const followUpFragment = () => {
    if (!props.selectedOption.followUp) {
      return null;
    }
    return (
      <UsaTextInput
        onChange={props.followUpChange}
        name="followUp"
        value={props.followUp}
        label={props.selectedOption.followUp}
      />
    );
  };

  return (
    <React.Fragment>
      <UsaSelect
        options={props.options.map(opt => ({
          ...opt,
          text: opt.snoozeReason
        }))}
        placeholder="- Select Reason -"
        name="snoozeReason"
        selected={props.selectedOption.value}
        onChange={props.snoozeReasonChange}
        label="Problem"
      />
      {followUpFragment()}
      <UsaNumberInput
        onChange={props.durationChange}
        name="duration"
        value={props.duration}
        label="Due in (days)"
        min={1}
        max={365}
        setError={props.setError}
        deleteError={props.deleteError}
        requiredText="Enter a number of days to snooze"
      />
      <AddNoteInput
        onChange={props.caseIssueNotesChange}
        value={props.caseIssueNotes}
      />
    </React.Fragment>
  );
}
