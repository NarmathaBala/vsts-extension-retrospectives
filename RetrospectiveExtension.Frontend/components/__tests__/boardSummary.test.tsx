import * as React from 'react';
import { shallow } from 'enzyme';
import BoardSummary, { IBoardSummaryProps } from '../boardSummary';
import { WorkItem, WorkItemType } from '../__mocks__/azure-devops-extension-api/WorkItemTracking/WorkItemTracking';

const mockedDefaultProps: IBoardSummaryProps = {
  actionItems: [],
  isDataLoaded: false,
  pendingWorkItemsCount: 0,
  resolvedActionItemsCount: 0,
  boardName: '',
  feedbackItemsCount: 0,
  supportedWorkItemTypes: []
};

describe('Board Summary', () => {
  test('renders with no action or work items.', () => {
    const wrapper = shallow(<BoardSummary {...mockedDefaultProps} />);
    const component = wrapper.children().dive();

    console.log(component.debug());

    expect(component.findWhere(
      child => child.prop("aria-label") === "feedback item count").text()).toBe(0);
    expect(component.findWhere(
      child => child.prop("aria-label") === "total work items count").text()).toBe(0);
    expect(component.findWhere(
      child => child.prop("aria-label") === "pending work items count").text()).toBe(0);
    expect(component.findWhere(
      child => child.prop("aria-label") === "resolved work items count").text()).toBe(0);
  });
});