const environment = {
  CollaborationStateServiceUrl: 'https://app-retro-tool-24.azurewebsites.net', // change this to the deployed backend service
  CurrentEnvironment: process.env.NODE_ENV,
  AppInsightsInstrumentKey: 'c3f1611c-5060-4d9e-af29-2d781f104aa8' // put Instrumentation key here
};

export default environment;
