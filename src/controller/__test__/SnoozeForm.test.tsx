import React from "react";
import { mount } from "enzyme";
import SnoozeForm from "../SnoozeForm";
import { SNOOZE_OPTIONS_SELECT } from "../config";

const rowData = {
  receiptNumber: "FAK123"
} as Case;

describe("SnoozeForm", () => {
  it("should render a snooze form with required snooze option select values", () => {
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="active"
      />
    );
    SNOOZE_OPTIONS_SELECT.forEach((_, index) => {
      expect(wrapper.find(`option[value="${index}"]`).length).toBe(1);
    });
  });
  it("should call the snooze callback on submit", () => {
    const snooze = jest.fn();
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={snooze}
        closeDialog={jest.fn()}
        caseType="active"
      />
    );
    wrapper.find("#SnoozeSumbit").simulate("click");
    expect(snooze).toBeCalledTimes(1);
  });
  it("should call the closeDialog callback on submit", () => {
    const closeDialog = jest.fn();
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={closeDialog}
        caseType="active"
      />
    );
    wrapper.find("#SnoozeSumbit").simulate("click");
    expect(closeDialog).toBeCalledTimes(1);
  });
  it("should handle snooze reason dropdown changes", () => {
    const spy = jest.spyOn(SnoozeForm.prototype, "snoozeReasonChange");
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="active"
      />
    );
    wrapper.find("select").simulate("change", {
      target: { value: 0 }
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it("should handle follow-up reason changes", () => {
    const spy = jest.spyOn(SnoozeForm.prototype, "followUpChange");
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="active"
      />
    );
    wrapper.find("select").simulate("change", {
      target: {
        value: 0
      }
    });
    wrapper.find("#followUp").simulate("change", {
      target: {
        value: "Some entry"
      }
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it("should handle case issue notes changes", () => {
    const spy = jest.spyOn(SnoozeForm.prototype, "caseIssueNotesChange");
    const wrapper = mount(
      <SnoozeForm
        rowData={rowData}
        snooze={jest.fn()}
        closeDialog={jest.fn()}
        caseType="active"
      />
    );
    wrapper.find("select").simulate("change", {
      target: {
        value: 0
      }
    });
    wrapper.find("#showNoteField").simulate("click");
    wrapper.find("#caseIssueNotes").simulate("change", {
      target: {
        value: "Some entry"
      }
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
