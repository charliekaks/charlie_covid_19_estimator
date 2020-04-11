const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  const currentlyInfectedImpact = data.reportedCases * 10;
  impact.currentlyInfected = currentlyInfectedImpact;

  const currentlyInfectedSevere = data.reportedCases * 50;
  severeImpact.currentlyInfected = currentlyInfectedSevere;

  const period = data.timeToElapse;

  if (data.periodType === 'days') {
    const infected = currentlyInfectedImpact * (2 ** Math.round(period / 3));
    impact.infectionsByRequestedTime = infected;

    const infectedSevere = currentlyInfectedSevere * (2 ** Math.round(period / 3));
    severeImpact.infectionsByRequestedTime = infectedSevere;
  } else if (data.periodType === 'weeks') {
    const periodInDays = period * 7;
    const infectedByWeeks = currentlyInfectedImpact * (2 ** (Math.round(periodInDays / 3)));
    impact.infectionsByRequestedTime = infectedByWeeks;

    const infectedByWeeksSevere = currentlyInfectedSevere * (2 ** (Math.round(periodInDays / 3)));
    severeImpact.infectionsByRequestedTime = infectedByWeeksSevere;
  } else if (data.periodType === 'months') {
    const periodInDays = period * 30;
    const infectionsByMonths = currentlyInfectedImpact * (2 ** Math.round(periodInDays / 3));
    impact.infectionsByRequestedTime = infectionsByMonths;

    const infectionsByMonthsSevere = currentlyInfectedSevere * (2 ** Math.round(periodInDays / 3));
    severeImpact.infectionsByRequestedTime = infectionsByMonthsSevere;
  }

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
