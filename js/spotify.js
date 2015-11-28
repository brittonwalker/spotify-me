// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/

$('#search').on('submit', function(event) {
  event.preventDefault();

  $search = $('#search-keyword');
  var keyword = $search.val();
  $('#results').empty();

  if ($( "#search-type option:selected").val() === "artist"){
    searchByArtist(keyword)
  } else {
    searchByTrack(keyword)
  }

})

// Search by Artist function
function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;

  $.getJSON(url)
  .done(function(data){
    if (data.artists && data.artists.length > 0) {
      $.each(data.artists, function(i, res) {
        var artists = $("<li><a href=" + res.href + ">" + res.name + "</a></li>");
        $('#results').append(artists);
      })
    }
  })
}

// Search by Track function
function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;

  $.getJSON(url)
  .done(function(data){
    if (data.tracks && data.tracks.length > 0) {
      $.each(data.tracks, function(i, res) {
        var tracks = $("<li><a href=" + res.href + ">" + res.name + " by " + res.artists[0].name + "</a></li>");
        $('#results').append(tracks);
      })
    }
  })
}
