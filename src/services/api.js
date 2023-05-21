import Papa from 'papaparse';




// Define the vec2 class
class vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  normalize() {
    let length = Math.sqrt(this.x * this.x + this.y * this.y);
    if (length !== 0) {
      this.x /= length;
      this.y /= length;
    }
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

export async function requestDataFrom(id) {
  const username = 'youlisse';
  const password = 'Rousselu1*';

  // Step 1: Request license terms
  const params = new URLSearchParams({
    entity_type: 'event',
    study_id: id,
  });

  const response1 = await fetch(`https://www.movebank.org/movebank/service/direct-read?${params.toString()}`, {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });

  if (response1.status !== 200) {
    console.log(`Request failed with status code: ${response1.status}`);
    return '';
  }

  const licenseTerms = await response1.text();
      const CryptoJS = require("crypto-js");

  const licenseHash = CryptoJS.MD5(licenseTerms).toString(CryptoJS.enc.Hex);

  // Step 2: Request data with license hash
  params.append('license-md5', licenseHash);

  const response2 = await fetch(`https://www.movebank.org/movebank/service/direct-read?${params.toString()}`, {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });

  if (response2.status !== 200) {
    console.log(`Request failed with status code: ${response2.status}`);
    return '';
  }

  const data = await response2.text();
  return data;
}
export async function askFree() {
  return new Promise((resolve, reject) => {
    fetch('https://www.movebank.org/movebank/service/direct-read?entity_type=study&i_have_download_access=true&api-token=7f2c8c37-29dc-408f-82cb-f108fdcd2d1b')
      .then(response => response.text())
      .then(csvData => {
        // Parse the CSV data into an array of objects
        const entries = Papa.parse(csvData.trim(), { header: true }).data;

        // Filter the entries to include only those with mode "GPS"
        const gpsEntries = entries.filter(entry => entry.sensor_type_ids === 'GPS');

        // Convert the filtered entries back into CSV format
        const idAndNameArray = gpsEntries.map(row => ({ id: row.id, name: row.name }));

        // Sort the idAndNameArray alphabetically based on the name property
        idAndNameArray.sort((a, b) => a.name.localeCompare(b.name));

        // Do something with the sorted CSV data, such as displaying it in your Vue.js app
        resolve(idAndNameArray);
      })
      .catch(error => reject(error));
  });
}


function calculateMovement(csvData) {
  // Split the CSV data into an array of lines
  let lines = csvData.split('\n');

  // Array to store the vec2 objects with movement
  let movementArray = [];

  // Loop through the lines of the CSV data
  for (let i = 1; i < lines.length-1; i++) {
    //console.log(lines[i]);
    // Split each line into an array of values
    let values = lines[i].split(',');

    // Extract the x and y values from the values array
    let x = parseFloat(values[1]);
    let y = parseFloat(values[2]);

   
    if (isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
    continue;
    }
    
    let prevValues = lines[i-1].split(',');
    let prevX = parseFloat(prevValues[1]);
    let prevY = parseFloat(prevValues[2]);
      if (isNaN(prevX) || isNaN(prevY) || !isFinite(prevX) || !isFinite(prevY)) {
      continue;
    }
    if (i==1){
      prevX =0.0;
      prevY = 0.0;
    }
    
    // Calculate the movement by subtracting the previous position from the current position
  
    let  moveX = x - prevX;
    let  moveY = y - prevY;
    //console.log(moveY);
    // Create a new vec2 object with the calculated movement
    let movement = new vec2(moveX, moveY);

    // Normalize the movement vector
    movement.normalize();

    // Push the movement object into the movementArray
    movementArray.push(movement);
  //}
  }

  // Return the movementArray
  return movementArray;
}


function calculateAverageVectors(vectors) {
  let totalX = 0;
  let totalY = 0;

  // Calculate the sum of X and Y components
  for (let i = 0; i < vectors.length; i++) {
    totalX += vectors[i].x;
    totalY += vectors[i].y;
  }

  // Calculate the average by dividing the sum by the number of vectors
  let averageX = totalX / vectors.length;
  let averageY = totalY / vectors.length;

  // Return the average vector as a new vec2 object
   let vec =new vec2(averageX, averageY);
   vec.normalize();
   //console.log(vec);
   return vec;
}


export { calculateMovement, calculateAverageVectors};

