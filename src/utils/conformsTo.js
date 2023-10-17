const conformsTo = (obj, ruleSet) =>
  Object.keys(ruleSet).every(key => ruleSet[key](obj[key]));

export default conformsTo;
