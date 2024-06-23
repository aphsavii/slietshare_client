const PROGRAMMES = ["ICD", "BE"];
const TRADES = {
  ICD: ["CDE", "CSMM", "CSME", "CTV", "CPT", "CFP", "CFF", "CWG", "CTD", "CAC","CEN"],
  BE: ["GCS", "GEE", "GEC","GCT", "GFT", "GIN", "GME"],
};

const QUESTION_TYPES = ["minor-1", "minor-2", "major"];

const getBatchYears = () => {
  let currentYear = new Date();
  currentYear = currentYear.getFullYear()
  return [currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
}

const getIcons= ()=>{
  return {
    linkedin:'/assets/icons/linkedin.png',
    github:'/assets/icons/github.png',
    leetcode:'/assets/icons/leetcode.png',
    codeforces:'/assets/icons/codeforces.png',
    hackerrank:'/assets/icons/hackerrank.png',
    medium:'/assets/icons/medium.png',
    stackoverflow:'/assets/icons/stackoverflow.png'
  }
}

export { PROGRAMMES, TRADES, QUESTION_TYPES, getBatchYears, getIcons };
