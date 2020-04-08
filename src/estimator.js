const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  const currentlyInfectedImpact = data.reportedCases * 10;
  impact.currentlyInfected = currentlyInfectedImpact;

  const currentlyInfectedSevere = data.reportedCases * 50;
  severeImpact.currentlyInfected = currentlyInfectedSevere;

  if (data.periodType === 'days') {
    const infectionsByRequestedTimeImpact =
      currentlyInfectedImpact * (2 * Math.floor(data.timeToElapse / 3));
    impact.infectionsByRequestedTime = infectionsByRequestedTimeImpact;

    const infectionsByRequestedTimeSevereImpact =
      currentlyInfectedSevere * (2 * Math.floor(data.timeToElapse / 3));
      severeImpact.infectionsByRequestedTime = infectionsByRequestedTimeSevereImpact;
  } else if (data.periodType === 'weeks') {
    const infectionsByRequestedTimeImpact =
      currentlyInfectedImpact * (2 * Math.floor((data.timeToElapse * 7) / 3));
    impact.infectionsByRequestedTime = infectionsByRequestedTimeImpact;

    const infectionsByRequestedTimeSevereImpact =
      currentlyInfectedSevere * (2 * Math.floor((data.timeToElapse * 7) / 3));
      severeImpact.infectionsByRequestedTime = infectionsByRequestedTimeSevereImpact;
  } else if (data.periodType === 'months') {
    const infectionsByRequestedTimeImpact =
      currentlyInfectedImpact * (2 * Math.floor((data.timeToElapse * 30) / 3));
    impact.infectionsByRequestedTime = infectionsByRequestedTimeImpact;

    const infectionsByRequestedTimeSevereImpact =
      currentlyInfectedSevere * (2 * Math.floor((data.timeToElapse * 30) / 3));
      severeImpact.infectionsByRequestedTime = infectionsByRequestedTimeSevereImpact;
  }

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
