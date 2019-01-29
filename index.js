/*global $*/
'use strict';

const apiKey = 'addg1a0cb0qmUfz5gHiyFUAysPuw71fz5rbqnqLL';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

// HTTP Header = { X-Api-Key : addg1a0cb0qmUfz5gHiyFUAysPuw71fz5rbqnqLL } 

// Goal: display a list of national parks in an area

function setQueryParam(param){
  const queryItems=Object.keys(param)
    .map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`);
  return queryItems.join('&');
}


function getStateParks(query, maxResults = 10){
  const param ={
    api_key: apiKey,
    q: query, // term to search on
    limit: maxResults // limit default is 50 from API docs
  };
  const queryString = setQueryParam(param);
  const url = searchURL + '?' + queryString;
  console.log(queryString); // example query = dog
  // api_key=addg1a0cb0qmUfz5gHiyFUAysPuw71fz5rbqnqLL&q=dog&limit=10
  fetch(url)
    .then(res => res.json())
    .then(resJson => displayParkResults(resJson));
}


// Parks in the given state must be displayed on the page with Full name, description, website URL
function displayParkResults(resJson) {
  $('#results-list').empty(); // clears on each submit
  console.log(resJson); // returning undefined;
  if (resJson.data.length < 1) { // if no matching results return string
    return $('#results-list').text('No matching terms');
  } else {
    for (let i = 0; i < resJson.data.length; i++) {
      $('#results-list').append(
        `<h2>Results</h2><li><h3>${resJson.data[i].fullName}</h3>
        Description: ${resJson.data[i].description}<br><br>
        URL: <a href='${resJson.data[i].url}'>${resJson.data[i].url}</a>
      </li>`
      );
    }
  }
}



function watchForm() {
  $('form').submit(function(e) {
    e.preventDefault();
    const searchTerm = $('#js-searchInput').val();
    const maxResults = $('#js-maxResults').val()-1; // returning 1 extra
    getStateParks(searchTerm, maxResults);
  });
}

// runs on page load
$(watchForm);




// function testWord() {
//   console.log('test search input');
// }

// function handlingSearchInput() {
//   $('form').on('submit', function(e) {
//     e.preventDefault();
//   });
// }