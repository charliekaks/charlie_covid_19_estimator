function infectionsOverTime(data, infected) {
  const period = data.timeToElapse;
  const type = data.periodType;
  let infections = null;

  if (type === 'days') {
    infections = infected * (2 ** Math.trunc(period / 3));
  } else if (type === 'weeks') {
    infections = infected * (2 ** Math.trunc((period * 7) / 3));
  } else if (type === 'months') {
    infections = infected * (2 ** Math.trunc((period * 30) / 3));
  }
  return infections;
}

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  const currentlyInfectedImpact = data.reportedCases * 10;
  impact.currentlyInfected = currentlyInfectedImpact;

  const currentlyInfectedSevere = data.reportedCases * 50;
  severeImpact.currentlyInfected = currentlyInfectedSevere;

  impact.infectionsByRequestedTime = infectionsOverTime(data, currentlyInfectedImpact);
  severeImpact.infectionsByRequestedTime = infectionsOverTime(data, currentlyInfectedSevere);
  // Challenge 2.
  const severePositiveImpact = Math.trunc(0.15 * impact.infectionsByRequestedTime);
  const severePositiveSevere = Math.trunc(0.15 * severeImpact.infectionsByRequestedTime);

  impact.severeCasesByRequestedTime = severePositiveImpact;
  severeImpact.severeCasesByRequestedTime = severePositiveSevere;

  const availableBedsImpact = Math.trunc(0.35 * data.totalHospitalBeds);
  const bedsOverRequestedTime = severePositiveImpact - availableBedsImpact;
  const bedsOverRequestedTimeSevere = severePositiveSevere - availableBedsImpact;
  impact.hospitalBedsByRequestedTime = bedsOverRequestedTime;
  severeImpact.hospitalBedsByRequestedTime = bedsOverRequestedTimeSevere;

  const impactICUPatients = Math.trunc(0.05 * impact.infectionsByRequestedTime);
  const severeICUPatients = Math.trunc(0.05 * severeImpact.infectionsByRequestedTime);

  impact.casesForICUByRequestedTime = impactICUPatients;
  severeImpact.casesForICUByRequestedTime = severeICUPatients;

  const impactVentilators = Math.trunc(0.02 * impact.infectionsByRequestedTime);
  const severeVentilators = Math.trunc(0.02 * severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = impactVentilators;
  severeImpact.casesForICUByRequestedTime = severeVentilators;

  const dailyIncome = data.region.avgDailyIncomeInUSD;
  const averagePopulation = data.region.avgDailyIncomePopulation;
  const infectionsImpact = impact.infectionsByRequestedTime;
  const infectionsSevere = severeImpact.infectionsByRequestedTime;

  const dollarsLossImpact = infectionsImpact * averagePopulation * dailyIncome;
  impact.dollarsInFlight = dollarsLossImpact;
  const dollarsLossSevere = infectionsSevere * averagePopulation * dailyIncome;
  severeImpact.dollarsInFlight = dollarsLossSevere;
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
