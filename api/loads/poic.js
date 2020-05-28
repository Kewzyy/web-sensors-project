const csvtojson = require("csvtojson");

csvtojson()
  .fromFile("poic.csv")
  .then(csvData => {
    console.log(csvData);
  });