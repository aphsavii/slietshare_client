const PROGRAMMES = ["ICD", "BE"];
const TRADES = {
  ICD: ["CDE", "CSMM", "CSME", "CTV", "CPT", "CFP", "CFF", "CWG", "CTD", "CAC"],
  BE: ["GCS", "GEE", "GEC","GCT", "GFT", "GIN", "GME"],
};

const QUESTION_TYPES = ["minor-1", "minor-2", "major"];

const getBatchYears = () => {
  let currentYear = new Date();
  currentYear = currentYear.getFullYear()
  return [currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
}

export { PROGRAMMES, TRADES, QUESTION_TYPES, getBatchYears };
