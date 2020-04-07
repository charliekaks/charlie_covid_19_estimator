const covid19ImpactEstimator = (data) => {
    let impact ={};
    let severeImpact = {};

    let currentlyInfectedImpact = data.reportedCases * 10;
    impact.currentlyInfected = currentlyInfectedImpact;

    let currentlyInfectedSevere = data.reportedCases * 50;
    severeImpact.currentlyInfected = currentlyInfectedSevere;
    return{
        data,
        impact,
        severeImpact
    }
    
};

export default covid19ImpactEstimator;
