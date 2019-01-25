/*global $*/
'use strict';

const apiKey = 'addg1a0cb0qmUfz5gHiyFUAysPuw71fz5rbqnqLL';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function setQueryParam(param){
  const queryItems=Object.keys(param)
    .map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`);
  return queryItems.join('&');
}


function getStateParks(query, maxResults){
  const param ={
    key: apiKey,
    q: query,
    maxResults
  };
  const queryString = setQueryParam(param);
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(res => res.json())
    .then(resJson => console.log(resJson));
}

function main()

// Requirements:
// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see only the results for the current search.