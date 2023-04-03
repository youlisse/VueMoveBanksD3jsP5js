import Papa from 'papaparse';

async function requestDataFrom() {

    let res = await fetch('https://www.movebank.org/movebank/service/direct-read?entity_type=event&study_id=657674643&api-token=7f2c8c37-29dc-408f-82cb-f108fdcd2d1b');
    let licence=res.text();
    const CryptoJS = require("crypto-js");
    const hash = CryptoJS.MD5(licence).toString(CryptoJS.enc.Hex);
    let answer = await fetch('https://www.movebank.org/movebank/service/direct-read?entity_type=event&study_id=220229&api-token=7f2c8c37-29dc-408f-82cb-f108fdcd2d1b&license-md5='+hash);
    return answer.text();
    //return licence;

           } 





function askFree(){ 
fetch('https://www.movebank.org/movebank/service/direct-read?entity_type=study&i_have_download_access=true&api-token=7f2c8c37-29dc-408f-82cb-f108fdcd2d1b')
  .then(response => response.text())
  .then(csvData => {
    // Parse the CSV data into an array of objects
    const entries = Papa.parse(csvData.trim(), { header: true }).data;

    // Filter the entries to include only those with mode "GPS"
    const gpsEntries = entries.filter(entry => entry.sensor_type_ids === 'GPS');

    // Convert the filtered entries back into CSV format
   //const filteredCsvData = Papa.unparse(gpsEntries);
    const idAndNameArray = gpsEntries.map(row => ({ id: row.id, name: row.name }));

    // Do something with the filtered CSV data, such as displaying it in your Vue.js app
    console.log(idAndNameArray);
});
}

export default { requestDataFrom  , askFree}


