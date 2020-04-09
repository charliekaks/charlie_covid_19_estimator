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
    const infectedByWeeks = currentlyInfectedImpact * (2 ** (Math.round(periodInDays / 3)));
    impact.infectionsByRequestedTime = infectedByWeeks;

    const infectedByWeeksSevere = currentlyInfectedSevere * (2 ** (Math.round(periodInDays / 3)));
    severeImpact.infectionsByRequestedTime = infectedByWeeksSevere;
  }
  //  else if (data.periodType === 'months') {
  //   const periodInDays = data.timeToElapse * 30;
  //   const iBRT = currentlyInfectedImpact * (2 ** Math.round(periodInDays / 3));
  //   impact.infectionsByRequestedTime = iBRT;

  //   const iBRTS = currentlyInfectedSevere * (2 ** Math.round(periodInDays / 3));
  //   severeImpact.infectionsByRequestedTime = iBRTS;
  // }

  const severeCasesImpact = Math.round(0.15 * impact.infectionsByRequestedTime);
  const severeCasesSevere = Math.round(0.15 * severeImpact.infectionsByRequestedTime);

  impact.severeCasesByRequestedTime = severeCasesImpact;
  severeImpact.severeCasesByRequestedTime = severeCasesSevere;

  const availableBedsImpact = Math.round(0.35 * impact.totalHospitalBeds) - severeCasesImpact;
  const availableBedsSevere = Math.round(0.35 * data.totalHospitalBeds) - severeCasesSevere;

  impact.hospitalBedsByRequestedTime = availableBedsImpact;
  severeImpact.hospitalBedsByRequestedTime = availableBedsSevere;
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
