var vm = new Vue({
	el: '#app',

	data: function () {
		return {
			search: null,
			video_id: null,
			playerVars: {
				autoplay: 1,
				controls:0
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
			var search = encodeURI(this.search);

			axios.get('https://vuetv.acmoore.co.uk/search/'+search).then(function (response) {
				var first_result = response.data[0];
				self.loadVideo(first_result.video_id);
			});
		},

		loadVideo: function (video_id) {
			this.player.loadVideoById(video_id);
		},

		playVideo: function () {
			this.player.playVideo();
		},

		pauseVideo: function () {
			this.player.pauseVideo();
		},

		stopVideo: function () {
			this.player.stopVideo()
		},

	/*	setVolume: function () {
			this.player.setVolume(50)
		}, */

	/*	getVideoTitle: function () {
			let videoTitle = document.getElementById("videoTitle");
			let title = snippet.title;
			videoTitle.innerHTML= title.innerHTML;
		}, */
	}
});


/* AutoComplete */
$("#youtube").autocomplete({
    source: function(request, response){
        /* google geliştirici kimliği (zorunlu değil) */
        var apiKey = 'AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';
        /* aranacak kelime */
        var query = request.term;
        /* youtube sorgusu */
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
    /* seçilene işlem yapmak için burayı kullanabilirsin */
    select: function( event, ui ) {
        $.youtubeAPI(ui.item.label);
    }
});

/* De knop zoeken */
$('button#submit').click(function(){
    var value = $('input#youtube').val();
        $.youtubeAPI(value);
});

/* Youtube Arama Fonksiyonu */
$.youtubeAPI = function(kelime){
    var sonuc = $('#sonuc');
    sonuc.html('Arama gerçekleştiriliyor...');
    $.ajax({
        type: 'GET',
        url: 'https://gdata.youtube.com/feeds/api/videos?q=' + kelime + '&max-results=15&v=2&alt=jsonc',
        dataType: 'jsonp',
        success: function( veri ){
            if( veri.data.items ){
                sonuc.empty();
                $.each( veri.data.items, function(i, data) {
                    sonuc.append('<div class="youtube">\
                        <img src="' + data.thumbnail.sqDefault + '" alt="" />\
                        <h3><a href="javascript:void(0)" onclick="$.youtubePlay(\'' + data.id + '\', \'' + data.content[5] + '\')">' + data.title + '</a></h3>\
                        <p>' + data.description + '</p>\
                    </div>\
                    <div class="youtubeOynat" id="' + data.id + '"></div>');
                });
            }
            else {
                sonuc.html('<div class="hata"><strong>' + kelime + '</strong> ile ilgili hiç video bulunamadı!</div>');
            }
        }
    });
}
