import * as React from 'react';
import { shallow } from 'enzyme';
import { mocked } from 'jest-mock';
import FeedbackBoardPreviewEmail from '../../components/feedbackBoardPreviewEmail';
import { WorkflowPhase } from '../../interfaces/workItem';

export const mockedIdentity = mocked({
    directoryAlias: 'Jane Doe',
    id: 'Jane Doe',
    imageUrl: 'https://imageurl',
    inactive: false,
    isAadIdentity: false,
    isContainer: false,
    isDeletedInOrigin: false,
    profileUrl: 'https://profileurl',
    uniqueName: 'Jane Doe',
    _links: [],
    descriptor: 'Sample descriptor',
    displayName: 'Jane Doe',
    url:'https://identityurl'
});

const mockedBoard = mocked({
  id: 'Test Board Id',
  __etag: 5,
  title:'Test Board Title',
  teamId: 'Test Id',
  projectId: 'Test Project Id',
  createdBy: mockedIdentity,
  createdDate: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  areaPaths: ['Test Area 1'],
  iterations: ['Test Iteration 1'],
  columns: [ mocked({
    id: 'Feedback Column Id',
    title: 'Sample Feedback Column',
    iconClass: 'sample icon class',
    accentColor: '#57886C',
  })],
  modifiedDate: new Date(),
  modifiedBy: mockedIdentity,
  activePhase: WorkflowPhase.Collect,
  isIncludeTeamEffectivenessMeasurement: true,
  isAnonymous: true,
  shouldShowFeedbackAfterCollect: true,
  displayPrimeDirective: true,
  maxVotesPerUser: Math.floor(Math.random() * 10) + 1,
  boardVoteCollection : { ['sample voter id']: 1 },
  teamEffectivenessMeasurementVoteCollection : [
    mocked({
      userId: 'sample voter id',
      responses: [
        {questionId: 'When does it snow?', selection: 2},
        {questionId: 'What color is the sky?', selection: 4}]
    })]
});

const mockedProps = mocked({
  board: mockedBoard,
  teamId: 'Test Id',
  onCopy: jest.fn(() => {})
});

describe('Feedback Board Preview Email ', () => {
  it('displays a loading spinner when content has not been generated.', () => {
    const wrapper = shallow(<FeedbackBoardPreviewEmail {...mockedProps} />);
    const component = wrapper.children().dive();
    expect(component.prop('className')).toBe('preview-email-spinner');
  });
});