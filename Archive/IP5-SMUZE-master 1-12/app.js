/*const _ = require("lodash"); */


var vm = new Vue({
	el: '#app',
	data: function () {
		return {
			search: null,
			video_id: null/*'zKmsZzJQJV0'*/,
			queue: [],
			playing: [],
			searchResults: [],
			/*video_id: null,*/
			playerVars: {
				autoplay: 1,
				controls: 0,
				/*rel:1*/
			}
		};
	},
	computed: {
		player() {
			return this.$refs.youtube.player
		}
	},
	methods: {
		searchVideos: function() {
			var self = this;
			/*var queue = ;*/
			var search = encodeURI(this.search);
			axios.get('https://vuetv.acmoore.co.uk/search/'+search).then(function (response) {
				var first_result = response.data[0];
				self.loadVideo(first_result.video_id);
				console.log(response.data);
				self.searchResults = response.data;
				for (var i = 0; i < response.data.length; i++) {
					response.data[i]
					console.log(response.data[i].image);
					console.log(response.data[i].video_id);
					console.log(response.data[i].title);
					
				}
				console.log('-----------------efkes iets anders---------')
				console.log(response.data)

			});
			/* --------changes h1 to playing title
			let videoTitle = document.getElementById("videoTitle");
			let videoTitleRequest = (response.data[0].title);
			videoTitle.innerHTML = videoTitleRequest;*/
		},
		loadVideo: function (video_id) {this.player.loadVideoById(video_id);},
		playVideo: function () {this.player.playVideo();},
		pauseVideo: function () {this.player.pauseVideo();},
		stopVideo: function () {this.player.stopVideo()},
		setVolume: function () {
			let volumeValue = document.getElementById("volume");
			this.player.setVolume(volumeValue.value)
		},
		addQueue:	function (video) {
			this.queue.push(video);
			console.log(video.video_id);

			for (var i = 0; i < this.queue.length; i++) {
				console.log(this.queue[i])
			}
			/*console.log(queue);*/
		},
		removeQueue:	function (video) {
			console.log("delete");
			console.log(this.queue);
			

			this.queue = _.reject(this.queue, 
				{ 'video_id': video.video_id});

			/*_.reject(queue, 
				{ 'video_id': "Nskh_L0IHmc"}); */


			/*_.reject(queue, 
					{ 'video_id': this.video_id});	*/


			/*_.reject(queue, {
				for (let i = 0; i < queue.length; i++) {
					'video_id': queue[i].video_id
		
				}
			});*/
			/*queue.remove();*/
			/*this.queue.remove(this.video_id);
			vue.delete(this.video)*/
			/*<button @click="removeQueue">remove queue</button>*/
		},
	}
});


/*### [Search by keyword](/javascript/search.js)

Method: youtube.search.list<br>
Description: This code sample calls the API's <code>search.list</code> method to retrieve search results associated
with a particular keyword. The HTML page uses JQuery, along with the <code>auth.js</code> and <code>search.js</code> JavaScript files, to show a simple search form and display the list of search results.*/

/* Auto complete */
$("#youtube").autocomplete({
    source: function(request, response){
        // API KEY
        //var apiKey = 'AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';
				var apiKey = 'AIzaSyAnalLPwbNqLXYOBCAKRHW_uyRL_vTYngU' // own api
        // Search term
        var query = request.term;
        /* YouTube search request */
        $.ajax({
            url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?",
            dataType: 'jsonp',
            success: function(data, textStatus, request) {
               response( $.map( data[1], function(item) {
                    return {
                        label: item[0],
                        value: item[0]
                    }
                }));
            }
        });
    },
    select: function( event, ui ) {
        $.youtubeAPI(ui.item.label);
    }
});
// Button
$('button#submit').click(function(){
    var value = $('input#youtube').val();
        $.youtubeAPI(value);
});
/* YouTube search request*/
$.youtubeAPI = function(search){
    $.ajax({
        type: 'GET',
        url: 'https://gdata.youtube.com/feeds/api/videos?q=' + search + '&max-results=5&v=2&alt=jsonc',
        dataType: 'jsonp',
        success: function( info ){
            if( info.data.items ){
					      result.empty();
                $.each( info.data.items, function(i, data) {
                    result.append('<div class="youtube">\
                        <img src="' + data.thumbnail.sqDefault + '" alt="" />\
                        <h3><a href="javascript:void(0)" onclick="$.youtubePlay(\'' + data.id + '\', \'' + data.content[5] + '\')">' + data.title + '</a></h3>\
                        <p>' + data.description + '</p>\
                    </div>\
                    <div class="youtubeOynat" id="' + data.id + '"></div>');
                });
            }
            else {
                result.html('<div class="hata">' + search + '</div>');
            }
        }
    });
}


/* -------------TEST CODE-----------------

setInterval(function () {
	console.log("logging");
	console.log(data.discription[0]);
	console.log(data);
	console.log(discription);
	console.log(info);
	console.log(search);
	console.log(info.data.items);
}, 500);

	getVideoTitle: function () {
		let videoTitle = document.getElementById("videoTitle");
		let title = snippet.title;
		videoTitle.innerHTML= title.innerHTML;
	},
	*/
