const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  const currentlyInfectedImpact = data.reportedCases * 10;
  impact.currentlyInfected = currentlyInfectedImpact;

  const currentlyInfectedSevere = data.reportedCases * 50;
  severeImpact.currentlyInfected = currentlyInfectedSevere;

  if (data.periodType === 'days') {
    const periodInDays = data.timeToElapse;
    const infected = currentlyInfectedImpact * (2 ** Math.round(periodInDays / 3));
    impact.infectionsByRequestedTime = infected;

    const infectedSevere = currentlyInfectedSevere * (2 ** Math.round(periodInDays / 3));
    severeImpact.infectionsByRequestedTime = infectedSevere;
  } else if (data.periodType === 'weeks') {
    const periodInDays = data.timeToElapse * 7;
    const iBRT = currentlyInfectedImpact * (2 ** Math.round(periodInDays / 3));
    impact.infectionsByRequestedTime = iBRT;

    const iBRTS = currentlyInfectedSevere * (2 ** Math.round(periodInDays / 3));
    severeImpact.infectionsByRequestedTime = iBRTS;
  } else if (data.periodType === 'months') {
    const periodInDays = data.timeToElapse * 30;
    const iBRT = currentlyInfectedImpact * (2 ** Math.round(periodInDays / 3));
    impact.infectionsByRequestedTime = iBRT;

    const iBRTS = currentlyInfectedSevere * (2 ** Math.round(periodInDays / 3));
    severeImpact.infectionsByRequestedTime = iBRTS;
  }

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
