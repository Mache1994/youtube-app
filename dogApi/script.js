
function handleFetch(searchTerm, callback){
  let url = `https://dog.ceo/api/breed/${searchTerm}/images/random/10`;

  fetch(url)
    .then(response => {
      if (response.ok){
        return response.json();
      }
      else{
        throw new Error('Something went wrong. Try again later.');
      }
    })
    .then(responseJson => {
      callback(responseJson);
    })
    .catch(err => {
      $('.results').html(err.message);
    })
}

function displayResults(data){
  $('.results').html('');

  for ( let i = 0; i < data.message.length; i ++){
    $('.results').append(`
                      <div class="dogImage">
                        <img src="${data.message[i]}" alt="Dog image">
                      </div>
                  `);
  }
}

function watchForm(){

  $('.dogForm').on('submit', (event) => {
    event.preventDefault();
    
    let breedName = $('#dogSearchBox').val();
    handleFetch(breedName, displayResults);
  });
}

$(watchForm);