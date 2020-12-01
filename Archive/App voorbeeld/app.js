var vm = new Vue({
	el: '#app',

	data: function () {
		return {
			search: null,
			video_id: null,
			playerVars: {
				autoplay: 1
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
	}
});
