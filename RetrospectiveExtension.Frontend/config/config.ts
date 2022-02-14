export interface AppConfiguration {
    CollaborationStateServiceUrl: string,
    AppInsightsInstrumentKey: string,
    CurrentEnvironment: string,
}
function getConfiguration(): AppConfiguration {
    console.log(`environment is ${process.env.REACT_APP_COLLABORATION_STATE_SERVICE_URL}`);
    return {
        AppInsightsInstrumentKey: process.env.REACT_APP_APP_INSIGHTS_INSTRUMENTATION_KEY || '',
        CollaborationStateServiceUrl: process.env.REACT_APP_COLLABORATION_STATE_SERVICE_URL || 'https://unset.com/',
        CurrentEnvironment: process.env.NODE_ENV,
    }
}
export const config: AppConfiguration = getConfiguration();
