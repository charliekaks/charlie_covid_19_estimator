const covid19ImpactEstimator = data => {
  let impact = {};
  let severeImpact = {};

  const currentlyInfectedImpact = data.reportedCases * 10;
  impact.currentlyInfected = currentlyInfectedImpact;

  const currentlyInfectedSevere = data.reportedCases * 50;
  severeImpact.currentlyInfected = currentlyInfectedSevere;

  
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
