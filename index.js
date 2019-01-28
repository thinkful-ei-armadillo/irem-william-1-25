/*global $*/
'use strict';

// create variable for apiKey and URL
const api_key = 'addg1a0cb0qmUfz5gHiyFUAysPuw71fz5rbqnqLL';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

// create function for formating array of keys into a string
function formatQueryParams(query){
  const queryItems = Object.keys(query)
    .map(key => `${key}=${query[key]}`);
  console.log(queryItems);
  return queryItems.join('&');
}

// create function for fetching API with params
function getStateParks(searchTerm, maxResults = 10) {
  // create query params
  const query ={
    searchTerm,
    maxResults,
  };
  const queryString = formatQueryParams(query);
  const url = `${searchURL}?${queryString}&api_key=${api_key}`;
  // URL?q=query&maxResults=maxResults

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
    // displayParkResults(responseJson, maxResults)
    .catch(err => {
      $('#js-error-message').text('Something went wrong: ${err.message}');
    });
}

// create function for display API results
function displayParkResults(responseJson) {
  $('results-list').empty();
  let html = '';
  for (let i = 0; i <responseJson.data.length; i++) {
    $('#results-list').append(
      `<ul>
      <li>State: ${responseJson.data[i].states}</li><br>
      <li>Park Name: ${responseJson.data[i].fullName}</li><br>
      <li>Park Description: ${responseJson.data[i].description}>/li><br>
      </ul>`
    );
    $('results-list').html(html); 
  }
}


// function for watching form submission
function watchForm() {
  $('form').submit(function(e) {
    e.preventDefault();
    const searchTerm = $('#js-searchInput').val();
    const maxResults = $('#js-limitSearchInput').val();
    getStateParks(searchTerm, maxResults);
  });
}

$(watchForm);
