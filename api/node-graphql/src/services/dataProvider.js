const axios = require('axios');
require('dotenv').config();

function getExercises(options) {
  let url = 'https://api.api-ninjas.com/v1/exercises?';

  if (options.name) url += `name=${options.name}&`;
  if (options.type) url += `type=${options.type}&`;
  if (options.muscle) url += `muscle=${options.muscle}&`;
  if (options.difficulty) url += `difficulty=${options.difficulty}&`;
  if (options.offset) url += `offset=${options.offset}&`;
  url += `limit=4&`; 


  return axios.get(url, {
    headers: {
      'X-Api-Key': process.env.APIKEY
    },
  })
  .then(response => {
    if(response.status != 200) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.data;
  })
  .catch(error => {
    console.error('Request failed:', error);
    throw error;
  });
}



module.exports = getExercises;

//provided by api-ninja https://www.api-ninjas.com/api/exercises