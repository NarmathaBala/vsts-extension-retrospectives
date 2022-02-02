import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { CommonServiceIds } from 'azure-devops-extension-api';
import { mocked } from 'ts-jest/utils';
import { v4 as uuid } from 'uuid';
import FeedbackItem from '../feedbackItem';
import FeedbackColumn from '../feedbackColumn';

const workflowPhaseMock = jest.requireMock('../../interfaces/workItem');

// Mock Environment
jest.mock('../../config/environment', () => {
  const mockEnv = {
    CollaborationStateServiceUrl: "https://serviceurl",
  };

  return mockEnv;
});

// Mock Azure DevOps Extension SDK
jest.mock('azure-devops-extension-sdk', () => {
  const mockExtensionDataService = {
    getExtensionDataManager: jest.fn(),
  };

  const mockLocationService = {
    getResourceAreaLocation: jest.fn().mockImplementation(() => 'https://hosturl'),
  };

  const mockProjectPageService = {
    getProject: jest.fn().mockImplementation(() => {
      const mockProjectInfo = {
        id: "id",
        name: "name",
      };

      return mockProjectInfo;
    }),
  };

  const mockUser = {
    id: "userId",
  };

  const mockExtensionContext = {
    id: "contextId",
  };

  const mockSdk = {
    getService: jest.fn().mockImplementation(id => {
      if (id == CommonServiceIds.LocationService)
        return mockLocationService;
      else if (id == CommonServiceIds.ProjectPageService)
        return mockProjectPageService;
      else
        return mockExtensionDataService;
    }),
    getUser: jest.fn().mockImplementation(() => mockUser),
    getExtensionContext: jest.fn().mockImplementation(() => mockExtensionContext),
    getAccessToken: jest.fn().mockImplementation(() => 'token'),
  };

  return mockSdk;
});

// Mock Azure DevOps Extension API
jest.mock('azure-devops-extension-api/Core', () => {
  const mockCore = {
    CoreRestClient: {
      RESOURCE_AREA_ID: "resourceAreaId",
    },
  };

  return mockCore;
});

jest.mock('azure-devops-extension-api/Core/CoreClient', () => {});
jest.mock('azure-devops-extension-api/WebApi', () => {});
jest.mock('azure-devops-extension-api/WorkItemTracking', () => {});
jest.mock('azure-devops-extension-api/WorkItemTracking/WorkItemTracking', () => {});
jest.mock('azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient', () => {
  const mockWorkItemTrackingClient = {
    WorkItemTrackingRestClient: {},
  };

  return mockWorkItemTrackingClient;
});

jest.mock('azure-devops-extension-api/Common', () => {
  const mockCommon = {
    getClient: jest.fn(),
  };

  return mockCommon;
});

const testTeamId = uuid();
const testBoardId = uuid();
const testWorkItemType = mocked({
  _links:[],
  color: '#cc293d',
  description: 'Test Work Item Type Description',
  fieldInstances: [],
  fields: [],
  icon: {
    id: uuid(),
    url: ''
  },
  isDisabled: true,
  name: 'Test Work Item Type Name',
  referenceName: 'Test Work Item Type Reference Name',
  states:[],
  transitions: {},
  url: '',
  xmlForm: '',
});
const testColumnUuidOne = uuid();
const testColumnUuidTwo = uuid();
const testUpvotes = Math.floor(Math.random() * 10);
const testGroupedItemProps = mocked({
  groupedCount: 0,
  isGroupExpanded: false,
  isMainItem: true,
  parentItemId: '',
  setIsGroupBeingDragged: jest.fn((isBeingDragged) => { }),
  toggleGroupExpand: jest.fn(() => {}),
  updateGroupCardStackHeight: jest.fn(() => {}),
});
const testFeedbackItem = mocked({
  id: uuid(),
  element: mocked({
    innerText:'Test Inner Text',
    innerHtml:'<div>Test Inner HTML</div>'
  }),
  boardId: testBoardId,
  title: 'Test Feedback Item',
  description: 'Test Feedback Item Description',
  columnId: testColumnUuidOne,
  upvotes: Math.floor(Math.random() * 10),
  voteCollection: { [uuid()]: testUpvotes },
  createdDate: new Date(),
  createdByProfileImage: 'testProfileImageSource',
  groupedItemProps: testGroupedItemProps,
  userIdRef: uuid(),
  timerSecs: Math.floor(Math.random() * 60),
  timerstate: false,
  timerId: uuid(),
});
const testColumnItem = mocked({
  feedbackItem: testFeedbackItem,
  actionItems: [],
  newlyCreated: false,
  showAddedAnimation: false,
  shouldHaveFocus: false,
  hideFeedbackItems: false,
});

const testColumnIds: string[] = [testColumnUuidOne, testColumnUuidTwo];
const testColumnsObj: any = {};
testColumnsObj[testColumnUuidOne] = {
  columnProperties:
  {
    id: testColumnUuidOne,
    title: 'Test Feedback Column One',
    iconClass: 'far fa-smile',
    accentColor: '#008000',
  },
  columnItems:
    [
      {
        feedbackItem: testFeedbackItem,
        actionItems: []
      },
    ]
};
const testColumns = mocked(testColumnsObj);

const testColumnProps = mocked({
  columns: testColumns,
  columnIds: testColumnIds,
  columnName: testColumns[testColumnUuidOne].columnProperties.title,
  columnId: testColumnUuidOne,
  accentColor: testColumns[testColumnUuidOne].columnProperties.accentColor,
  iconClass: testColumns[testColumnUuidOne].columnProperties.iconClass,
  workflowPhase: workflowPhaseMock,
  isDataLoaded: false,
  columnItems: testColumns[testColumnUuidOne].columnItems,
  team: {
    id: uuid(),
    identity:{
      customDisplayName:'Test Web API Identity Custom Display Name',
      descriptor:{
        identifier:'Test Identifier',
        identityType:'Test Identity Type'
      },
      id: uuid(),
      isActive: true,
      isContainer: false,
      masterId: uuid(),
      memberIds:[],
      memberOf:[],
      members:[],
      metaTypeId:5,
      properties:[],
      providerDisplayName:'Test Web API Identity Provider Display Name',
      resourceVersion:10,
      socialDescriptor:'Test Social Descriptor',
      subjectDescriptor:'Test Subject Descriptor',
      uniqueUserId:500,
    },
    name: 'Test Web API Team Name',
    description: 'Test Web API Team Description',
    identityUrl: '',
    projectId: uuid(),
    projectName: 'Test Azure DevOps Retrospectives Extension',
    url: ''
  },
  boardId: uuid(),
  boardTitle: 'Test Feedback Board',
  defaultActionItemIteration: testTeamId,
  defaultActionItemAreaPath: testTeamId,
  nonHiddenWorkItemTypes: [testWorkItemType],
  allWorkItemTypes: [testWorkItemType],
  isBoardAnonymous: false,
  shouldFocusOnCreateFeedback: false,
  hideFeedbackItems: false,
  onVoteCasted: jest.fn(() => { }),
  addFeedbackItems: jest.fn((
    columnId, columnItems, shouldBroadcast, newlyCreated, showAddedAnimation, shouldHaveFocus, hideFeedbackItems) => {

  }),
  removeFeedbackItemFromColumn: jest.fn((
    columnIdToDeleteFrom, feedbackItemIdToDelete, shouldSetFocusOnFirstAvailableItem) => { }),
  refreshFeedbackItems: jest.fn((feedbackItems, shouldBroadcast) => { }),
});

describe('Feedback Item', () => {
  test('Render the default Feedback Item.', () => {
    const testProps =
      FeedbackColumn.createFeedbackItemProps(testColumnProps, testColumnItem, true);
    TestRenderer.create(<FeedbackItem {...testProps} />);
  });
});