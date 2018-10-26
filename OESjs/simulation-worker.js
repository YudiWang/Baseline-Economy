
self.importScripts("../framework/simulation-worker-core.js");

self.importScripts("simulation.js");

if (sim.model.objectTypes) {
  sim.model.objectTypes.forEach( function (objT) {
    self.importScripts( objT + ".js");
  });
}
if (sim.model.eventTypes) {
  sim.model.eventTypes.forEach( function (evtT) {
    self.importScripts( evtT + ".js");
  });
}
if (sim.model.activityTypes) {
  sim.model.activityTypes.forEach( function (actT) {
    self.importScripts( actT + ".js");
  });
}

//=================================================================

onmessage = function (e) {
  if (e.data.runExperiment) {
    sim.initializeSimulator( e.data.dbName);
    sim.runExperiment();
  } else {  // receive variable values changed via the UI
    sim.initializeSimulator();
    if (e.data.endTime) sim.scenario.simulationEndTime = e.data.endTime;
    if (e.data.createLog !== undefined) sim.config.createLog = e.data.createLog;
    if (e.data.changedModelVarValues) {
      Object.keys( e.data.changedModelVarValues).forEach( function (varName) {
        sim.model.v[varName].value = e.data.changedModelVarValues[varName];
      });
    }
    sim.runScenario( true);  // run in worker thread
  }
};