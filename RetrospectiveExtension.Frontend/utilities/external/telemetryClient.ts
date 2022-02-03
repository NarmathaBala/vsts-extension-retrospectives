import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import environment from '../../config/environment';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: environment.AppInsightsInstrumentKey,
    extensions: [reactPlugin],
    loggingLevelConsole:2,
    loggingLevelTelemetry:2,
    extensionConfig: {
      [reactPlugin.identifier]: { history: {} }
    }
  }
});
appInsights.loadAppInsights();

// The new log error function logs the data to console as usual,
// but also sends error messages to Application insights as well.
const updatedConsoleError=(function(oldErrorFunction){
  return {
      error: function(message?: any, ...optionalParams: any[]){
        oldErrorFunction(message, optionalParams);
          appInsights.trackException({error:{message:message, name:"console.error"}});
      },
  };
}(window.console.error));
//Then redefine the old console
window.console.error = updatedConsoleError.error;

export { reactPlugin, appInsights };
