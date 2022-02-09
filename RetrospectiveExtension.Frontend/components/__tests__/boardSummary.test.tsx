import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
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

const mockedWorkItemCountProps: IBoardSummaryProps = {
  actionItems: [],
  isDataLoaded: false,
  pendingWorkItemsCount: 2,
  resolvedActionItemsCount: 3,
  boardName: '',
  feedbackItemsCount: 8,
  supportedWorkItemTypes: []
};

describe('Board Summary', () => {
  test('renders with no action or work items.', () => {
    const wrapper = shallow(<BoardSummary {...mockedDefaultProps} />);
    const component = wrapper.children().dive();

    verifySummaryBoardCounts(component, mockedDefaultProps);
  });

  test('renders with when work item counts are greater than zero.', () => {
    const wrapper = shallow(<BoardSummary {...mockedWorkItemCountProps} />);
    const component = wrapper.children().dive();

    verifySummaryBoardCounts(component, mockedWorkItemCountProps);
  });
});

const verifySummaryBoardCounts = (component: ShallowWrapper, props: IBoardSummaryProps) => {
  expect(component.findWhere(
    child => child.prop("aria-label") === "feedback item count").text()).toBe(
      props.feedbackItemsCount.toString());
  expect(component.findWhere(
    child => child.prop("aria-label") === "total work items count").text()).toBe(
      (props.actionItems.length).toString());
  expect(component.findWhere(
    child => child.prop("aria-label") === "pending work items count").text()).toBe(
      props.pendingWorkItemsCount.toString());
  expect(component.findWhere(
    child => child.prop("aria-label") === "resolved work items count").text()).toBe(
      props.resolvedActionItemsCount.toString());
};