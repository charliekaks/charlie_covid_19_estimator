function infectionsOverTime(data, infected) {
  const period = data.timeToElapse;
  const type = data.periodType;
  let infections;

  if (type === 'days') {
    infections = infected * (2 ** Math.round(period / 3));
  } else if (type === 'weeks') {
    infections = infected * (2 ** Math.round((period * 7) / 3));
  } else if (type === 'months') {
    infections = infected * (2 ** Math.round((period * 30) / 3));
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
  const severeCasesImpact = Math.round(0.15 * impact.infectionsByRequestedTime);
  const severeCasesSevere = Math.round(0.15 * severeImpact.infectionsByRequestedTime);

  impact.severeCasesByRequestedTime = severeCasesImpact;
  severeImpact.severeCasesByRequestedTime = severeCasesSevere;

  const availableBedsImpact = Math.round(0.35 * data.totalHospitalBeds) - severeCasesImpact;
  const availableBedsSevere = Math.round(0.35 * data.totalHospitalBeds) - severeCasesSevere;

  impact.hospitalBedsByRequestedTime = availableBedsImpact;
  severeImpact.hospitalBedsByRequestedTime = availableBedsSevere;

  const impactICUPatients = Math.round(0.05 * impact.infectionsByRequestedTime);
  const severeICUPatients = Math.round(0.05 * severeImpact.infectionsByRequestedTime);

  impact.casesForICUByRequestedTime = impactICUPatients;
  severeImpact.casesForICUByRequestedTime = severeICUPatients;

  const impactVentilators = Math.round(0.02 * impact.infectionsByRequestedTime);
  const severeVentilators = Math.round(0.02 * severeImpact.infectionsByRequestedTime);

  impact.casesForVentilatorsByRequestedTime = impactVentilators;
  severeImpact.casesForICUByRequestedTime = severeVentilators;

  const dailyIncome = data.region.avgDailyIncomeInUSD;
  const averagePopulation = data.region.avgDailyIncomePopulation;
  const infectionsImpact = impact.infectionsByRequestedTime;
  const infectionsSevere = severeImpact.infectionsByRequestedTime;
  if (data.periodType === 'days') {
    const dollarsLossImpact = infectionsImpact * averagePopulation * dailyIncome;
    impact.dollarsInFlight = dollarsLossImpact;
    const dollarsLossSevere = infectionsSevere * averagePopulation * dailyIncome;
    severeImpact.dollarsInFlight = dollarsLossSevere;
  } else if (data.periodType === 'weeks') {
    const dollarsLossImpact = infectionsImpact * averagePopulation * dailyIncome;
    impact.dollarsInFlight = dollarsLossImpact * 7;

    const dollarsLossSevere = infectionsSevere * averagePopulation * dailyIncome;
    severeImpact.dollarsInFlight = dollarsLossSevere * 7;
  } else if (data.periodType === 'months') {
    const dollarsLossImpact = infectionsImpact * averagePopulation * dailyIncome;
    impact.dollarsInFlight = dollarsLossImpact * 30;

    const dollarsLossSevere = infectionsSevere * averagePopulation * dailyIncome;
    severeImpact.dollarsInFlight = dollarsLossSevere * 30;
  }
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
