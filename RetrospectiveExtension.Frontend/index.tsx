import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as SDK from 'azure-devops-extension-sdk';
import { getProjectId } from './utilities/servicesHelper';
import './css/main.scss';

import FeedbackBoardContainer, { FeedbackBoardContainerProps } from './components/feedbackBoardContainer';
// TODO (enpolat) : import { appInsightsClient, TelemetryEvents } from './utilities/appInsightsClient'

initializeIcons();

// TODO (enpolat) : appInsightsClient.trackEvent(TelemetryEvents.ExtensionLaunched);

SDK.init()
  .then(() => getProjectId())
  .then(projectId => {
    const feedbackBoardContainerProps: FeedbackBoardContainerProps = {
      projectId
    };

    ReactDOM.render(
      <FeedbackBoardContainer {...feedbackBoardContainerProps}/>,
      document.getElementById('root') as HTMLElement,
    );
  })
