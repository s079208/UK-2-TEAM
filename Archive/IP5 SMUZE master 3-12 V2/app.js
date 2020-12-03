var vm = new Vue({
	el: '#app',
	data () {
		return {
			search: null,
			video_id: null,
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
			});
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
		},
		removeQueue (video) {
			console.log("delete");
			console.log(this.queue);
			
			this.queue = _.reject(this.queue, 
				{ 'video_id': video.video_id});
		},
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


