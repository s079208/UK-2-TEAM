var vm = new Vue({
	el: '#app',
	data () {
		return {
			search: null,
			video_id: null/*'zKmsZzJQJV0'*/,
			queue: [],
			searchResults: [],
			currentVideo: null,
			isplaying: false,
			playerVars: {
				autoplay: 1,
				controls: 0,
			}
		};
	},
	computed: {
		player() {
			return this.$refs.youtube.player
		}
	},
	methods: {
		searchVideos () {
			var self = this;
			var search = encodeURI(this.search);
			axios.get('https://vuetv.acmoore.co.uk/search/'+search).then(function (response) {
				self.searchResults = response.data;
				console.log(response);
				/*var first_result = response.data[0];
				self.loadVideo(first_result.video_id);
				console.log(response.data);*/
        		
			});
			/* --------changes h1 to playing title
			let videoTitle = document.getElementById("videoTitle");
			let videoTitleRequest = (response.data[0].title);
			videoTitle.innerHTML = videoTitleRequest;*/
		},
		loadVideo 	(video) {
			this.player.loadVideoById(video.video_id);
			this.currentVideo = video;
			console.log(video);
		},
		playVideo 	() {this.player.playVideo();},
		pauseVideo 	() {this.player.pauseVideo();},
		stopVideo 	() {this.player.stopVideo()},
		setVolume 	() {
			let volumeValue = document.getElementById("volume");
			this.player.setVolume(volumeValue.value)
		},
		addQueue (video) {
			this.queue.push(video);
			console.log(video);
			for (var i = 0; i < this.queue.length;i++){console.log(this.queue[i])};
			this.searchResults = []
			
			if (this.isplaying===false) {
				video = this.queue.shift();
				this.loadVideo(video);
			} else {
				
			}
			/*--------------testing------------- *
			if (this.ready) {
				fetchVideo	
			} else if (playing) {
				//nothing
			}
			/*--------------testing------------- */
		},
		removeQueue (video) {
			console.log("delete");
			console.log(this.queue);
			
			this.queue = _.reject(this.queue, 
				{ 'video_id': video.video_id});
		},
		/*--------------testing------------- */
		ready(){
			console.log("ready");
			
		},
		skipVideo(){
			console.log("skipped");
			video = this.queue.shift();
			this.loadVideo(video);
		},
		playing(){
			console.log("playing");
			this.isplaying = true;
		},
		ended(){
			console.log("ended");
			this.isplaying = false;
			
		},
	}
});


