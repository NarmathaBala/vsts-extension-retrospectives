const environment = {
  CollaborationStateServiceUrl: 'https://my-backend-service.com', // change this to the deployed backend service
  CurrentEnvironment: process.env.NODE_ENV,
  AppInsightsInstrumentKey: 'my_instrumentation_key' // put Instrumentation key here
};

export default environment;
