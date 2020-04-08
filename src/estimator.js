const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  const currentlyInfectedImpact = data.reportedCases * 10;
  impact.currentlyInfected = currentlyInfectedImpact;

  const currentlyInfectedSevere = data.reportedCases * 50;
  severeImpact.currentlyInfected = currentlyInfectedSevere;

  if (data.periodType === 'days') {
    const ifcReT = currentlyInfectedImpact * (2 * Math.floor(data.timeToElapse / 3));
    impact.infectionsByRequestedTime = ifcReT;

    const iBRTS = currentlyInfectedSevere * (2 * Math.floor(data.timeToElapse / 3));
    severeImpact.infectionsByRequestedTime = iBRTS;
  } else if (data.periodType === 'weeks') {
    const iBRT = currentlyInfectedImpact * (2 * Math.floor((data.timeToElapse * 7) / 3));
    impact.infectionsByRequestedTime = iBRT;

    const iBRTS = currentlyInfectedSevere * (2 * Math.floor((data.timeToElapse * 7) / 3));
    severeImpact.infectionsByRequestedTime = iBRTS;
  } else if (data.periodType === 'months') {
    const iBRT = currentlyInfectedImpact * (2 * Math.floor((data.timeToElapse * 30) / 3));
    impact.infectionsByRequestedTime = iBRT;

    const iBRTS = currentlyInfectedSevere * (2 * Math.floor((data.timeToElapse * 30) / 3));
    severeImpact.infectionsByRequestedTime = iBRTS;
  }

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
