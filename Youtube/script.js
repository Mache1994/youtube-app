let apiKey = "AIzaSyBSCTFi6Igi4dmt7KPmMKrEsFmGRQFHe-8";
let searchTerm

function buildFetch(searchTerm, urlSearch, callback){
  $.ajax({
    url : urlSearch,
    method : "GET",
    data: {
        apiKey: apiKey,
        q: searchTerm,
    },
    dataType : "json",
    success : responseJson => callback(responseJson),
    error : err => console.log(err)
  });
}

function watchForm(){

  $(".YouForm").on("submit", (event) => {
    event.preventDefault();

    searchTerm = $('#VideoSearchBox').val();
    if(searchTerm != "")
    {
      let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchTerm}&key=${apiKey}`;
      buildFetch(searchTerm, url, displayVideos);
    }
  });
}



function displayVideos(data){
  	$(".results").html(""); //Empty the html of that section

  	let fHtml=''

  	for(let i = 0; i < 10; i++)
    {
    	fHtml+=`<li>
    	<div class=" Video">
    		
                <a href = "https://www.youtube.com/watch?v=${data.items[i].id.videoId}"" target = "-blank"> ${data.items[i].snippet.title}
                </a>
                <br>
    			
    		<a href = "https://www.youtube.com/watch?v=${data.items[i].id.videoId}"" target = "-blank">
    			<img style="width:15%" src="${data.items[i].snippet.thumbnails.default.url}" alt="${searchTerm} Image" />
    		</a>
    		<br>
    		</div> 
    						</li>`;
    }

	$('.results').append('<ul>'+fHtml+'</ul>');
	$(".buttons").html("");
	$(".buttons").append(`<button type="submit" class="NextButton">More Results</button>`);
  
}




$(watchForm);