/*global $*/
'use strict';

const apiKey = 'addg1a0cb0qmUfz5gHiyFUAysPuw71fz5rbqnqLL';
const searchURL = 'https://developer.nps.gov/api/v1/parks';



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
  // URL?q=query&maxResults=maxResults
  console.log(queryString);

  fetch(url)
    .then(res => res.json())
    .then(resJson => displayParkResults(resJson));
}


// Parks in the given state must be displayed on the page with Full name, description, website URL
function displayParkResults(resJson) {
  $('results-list').empty();
  let html = '';
  console.log(resJson); // returning undefined;
  for (let i = 0; i < resJson.data.length; i++) {
    $('#results-list').append(
      `<li><h3>${resJson.data[i].fullName}</h3>
        Description: ${resJson.data[i].description},
        URL: ${resJson.data[i].url}
      </li>`
    );
    $('results-list').html(html); 
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