/*global $*/
'use strict';

const apiKey = 'addg1a0cb0qmUfz5gHiyFUAysPuw71fz5rbqnqLL';
const searchURL = 'https://developer.nps.gov/api/v1/parks/?api_key=addg1a0cb0qmUfz5gHiyFUAysPuw71fz5rbqnqLL';


function testResults() {
  return fetch(searchURL)
    .then(res => res.json())
    .then(resJson => console.log(resJson));
}
testResults();
function setQueryParam(param){
  const queryItems=Object.keys(param)
    .map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`);
  return queryItems.join('&');
}


function getStateParks(query, maxResults){
  const param ={
    api_key: apiKey,
    q: query,
    maxResults
  };
  const queryString = setQueryParam(param);
  const url = searchURL + '?' + queryString;
  // URL?q=query&maxResults=maxResults

  fetch(url)
    .then(res => res.json())
    .then(resJson => console.log(resJson));
}



function displayParkResults(resJson) {
  $('results-list').empty();
  for (let i = 0; i <resJson.items.length; i++) {
    $('#results-list').append(
      `<li><h3>${parkName}</h3>
        Full name: 
        Description:
        URL:
      </li>`
    );
  }
}




function watchForm() {
  $('form').submit(function(e) {
    e.preventDefault();
    const searchTerm = $('#searchInput').val();
    const maxResults = $('#limitSearchInput').val();
    getStateParks(searchTerm, maxResults);
  });
}

$(watchForm);


// Requirements:
// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see only the results for the current search.



// function testWord() {
//   console.log('test search input');
// }

// function handlingSearchInput() {
//   $('form').on('submit', function(e) {
//     e.preventDefault();
//   });
// }