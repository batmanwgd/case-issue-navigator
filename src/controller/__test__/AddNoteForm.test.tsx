import React from "react";
import { mount } from "enzyme";
import { AddNoteForm } from "../AddNoteForm";
import RestAPIClient from "../../api/RestAPIClient";

describe("AddNoteForm", () => {
  it("does not render when snoozeInformation is missing", () => {
    const rowData: Case = {
      receiptNumber: "",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      showDetails: false,
      snoozeInformation: undefined
    };
    const wrapper = mount(
      <AddNoteForm rowData={rowData} getCaseDetails={() => undefined} />
    );

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it("renders an add a note button", () => {
    const rowData: Case = {
      receiptNumber: "",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      showDetails: false,
      snoozeInformation: {}
    };
    const wrapper = mount(
      <AddNoteForm rowData={rowData} getCaseDetails={() => undefined} />
    );

    expect(wrapper.find("button").text()).toBe("Add A Note");
  });

  it("Adding a note preserves snooze data", () => {
    const snoozeEnd = new Date();
    snoozeEnd.setDate(snoozeEnd.getDate() + 1);

    jest.spyOn(RestAPIClient.caseDetails, "updateActiveSnooze");
    const rowData: Case = {
      receiptNumber: "ABC123",
      caseCreation: "",
      extraData: {} as CaseExtraData,
      previouslySnoozed: false,
      showDetails: false,
      snoozeInformation: {
        snoozeStart: new Date().toString(),
        snoozeEnd: snoozeEnd.toString(),
        snoozeReason: "assigned_case",
        user: {
          id: "",
          name: ""
        }
      }
    };
    const wrapper = mount(
      <AddNoteForm rowData={rowData} getCaseDetails={() => undefined} />
    );

    // Open modal
    wrapper
      .find("button")
      .at(0)
      .simulate("click", {});
    wrapper
      .find("textarea")
      .at(0)
      .simulate("change", { target: { value: "I am a note." } });
    wrapper
      .find("button")
      .at(1)
      .simulate("click", {});
    expect(RestAPIClient.caseDetails.updateActiveSnooze).toHaveBeenCalledWith(
      "ABC123",
      {
        duration: 1,
        reason: "assigned_case",
        notes: [
          {
            content: "I am a note.",
            subType: null,
            type: "COMMENT"
          }
        ]
      }
    );
  });
});
