import Nullstack from "nullstack";
import slugify from "slugify";
import firebase from "firebase/app";
import "firebase/storage";

import "./Home.scss";

class Home extends Nullstack {
	search_params = "";
	results = {};
	link = "";
	isDownloading = false;
	btnCanDownload = "display: inline";

	prepare({ project, page }) {
		// page.title = `Home`;
		page.description = `Baixe suas músicas preferidas quando e onde quiser!`;
	}

	async initiate({ params }) {
		// Checking if someone searched for something
		if ("search_params" in params) {
			this.search_params = params.search_params;
		}
		// If user searched using a url
		if (String(this.search_params).includes("https")) {
			// Getting video info
			const videoInfo = await this.getVideoInfoByUrl({ link: this.search_params });
			const video = {
				id: videoInfo.player_response.videoDetails.videoId,
				title: videoInfo.player_response.videoDetails.title,
				thumb: videoInfo.player_response.videoDetails.thumbnail.thumbnails[3].url,
			};

			this.results.items = video;
		} else {
			// Searching video using ytsr
			this.results = await this.searchVideos({ search_params: params.search_params });
		}

		// Customizing slugify library
		slugify.extend({
			"|": "",
		});
	}

	// Function for getting video info using a url like https://youtu.be/3Q-cxGwcQeI
	static async getVideoInfoByUrl({ download, link, router }) {
		// Getting videoId from link (There is two different types of URLs)
		if (String(link).includes("watch?v=")) {
			videoId = link.split("watch?v=")[1];
			// Making sure to remove playlist id
			videoId = link.split("&list=")[0];
		} else {
			videoId = link.split("youtu.be/")[1];
		}

		try {
			// Getting video information like Channel, Thumb, Size, Etc from ytdl.getInfo();
			const videoInfo = await download.getInfo(link);
			return videoInfo;
		} catch (e) {
			router.url = "/";
			return {};
		}
	}

	// Function for searching videos without using a URL
	static async searchVideos({ search, download, search_params }) {
		// I think this don't work...
		const options = {
			limit: 10,
			pages: 1,
		};
		// if Search Params isn't undefined OR has content
		if (!(typeof search_params === "undefined" || search_params.length <= 0)) {
			// We search for the videos using the provided params
			const result = await search(search_params, options);
			// A little filter for removing a "People also watched" and "Mix" because they don't count as videos
			result.items = result.items.filter(function (video) {
				return (
					video.title !== "People also watched" && String(video.title).indexOf("Mix") < 0
				);
			});
			return result;
		} else {
			// if Seach Params is undefined OR contains nothing
			// We just return a empty object
			const result = {};
			// Setting items to an empty array just to prevent a bug in the render
			result.items = {};
			return result;
		}
	}

	// Function for the client to call the server for a Download
	async callDownload({ video }) {
		// We deactivate all the buttons to prevent spam
		this.btnCanDownload = "display: none";
		this.isDownloading = true;
		// We connect to our public firebase (for view files only)
		if (firebase.apps.length < 1) {
			var firebaseConfig = {
				apiKey: "AIzaSyD1MLKqLoHU-rJ70FkR6GClQCnipXqsNI8",
				authDomain: "ytdl-nullstack.firebaseapp.com",
				projectId: "ytdl-nullstack",
				storageBucket: "ytdl-nullstack.appspot.com",
				messagingSenderId: "438283141364",
				appId: "1:438283141364:web:11705b218e9d688aa49ea1",
			};
			firebase.initializeApp(firebaseConfig);
		}

		const fstorage = firebase.storage();
		// Sending a download request to server and getting the title and the file size
		const video_info = await this.downloadVideo({ video });
		// Function to download a blob from a XMLHttpRequest that is down there
		async function download() {
			let reference = await fstorage.ref(`${video_info[0]}.mp3`);
			const downloadUrl = await reference.getDownloadURL();
			function saveBlob(blob, fileName) {
				if (!String(fileName).includes("mp3")) {
					fileName = String(fileName) + ".mp3";
				}
				var a = document.createElement("a");
				a.href = window.URL.createObjectURL(blob);
				a.download = fileName;
				a.dispatchEvent(new MouseEvent("click"));
			}

			var xhr = new XMLHttpRequest();
			xhr.responseType = "blob";
			xhr.onload = function (event) {
				var blob = xhr.response;
				saveBlob(blob, video_info[0]);
			};
			xhr.open("GET", downloadUrl);
			xhr.send();
		}
		// Timeouting the download, because we only want to download when it is fully uploaded to the firebase storage
		let timeout = (video_info[1] / 1024) * 2;
		setTimeout(() => {
			this.btnCanDownload = "display: inline";
			this.isDownloading = false;
			download(video_info[0]);
		}, timeout);
	}

	// Function for the server to download and upload the file
	static async downloadVideo({ download, fs, video, storage }) {
		var file;
		// Using ytdl.getInfo() to get the video available formats and the file size
		const info = await download.getInfo(`http://www.youtube.com/watch?v=${video.id}`);
		const formats = info.player_response.streamingData.adaptiveFormats;
		const onlyaudio = [];
		// Getting only audio formats
		for (let c in formats) {
			if (String(formats[c].mimeType).indexOf("audio") > -1) {
				onlyaudio.push(formats[c]);
			}
		}
		let highestaudiosize = 0;
		let highestaudioitag = 0;

		// Setting the highest audio size and tag (used for download)
		for (let c in onlyaudio) {
			if (onlyaudio[c].contentLength > highestaudiosize) {
				highestaudiosize = onlyaudio[c].contentLength;
				highestaudioitag = onlyaudio[c].itag;
			}
		}

		// Making the video title compatible for file names
		const video_title = slugify(video.title, {
			replacement: " ", // Replacing all invalid chars with a space
		});

		const file_name = `./public/downloads/${video_title}.mp3`;

		// Downloading the video and saving in the server
		const result = await download(`http://www.youtube.com/watch?v=${video.id}`, {
			quality: String(highestaudioitag),
			filter: "audioonly", // Making sure that is only audio
		}).pipe((file = await fs.createWriteStream(file_name)));
		file.on("finish", async () => {
			// Uploading the file to the firebase storage when it's fully downloaded
			const upload = await storage().bucket().upload(file_name);
			// Deleting the file after the upload
			fs.unlinkSync(file_name);
		});

		return [video_title, highestaudiosize];
	}

	// Function for clearing the params
	async resetSearch() {
		this.search_params = "";
	}

	// Function for redirecting the user to the video on youtube
	async redirect({ video }) {
		window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank");
	}

	render() {
		return (
			<div>
				<div class="container">
					<br />
					<h1>
						<i class="fas fa-play-circle"></i>&nbsp;Youtube Music Downloader - Nullstack
					</h1>
					{/* For some reason, I need to define a onsubmit at this form for 
					everything to work. Obs: This function don't even exists */}
					<form onsubmit={this.ghost_function} class="row g-2 justify-content-md-center">
						<div class="col-8">
							<label for="search_params">Pesquise ou digite a url</label>
							<input
								id="search_params"
								type="text"
								class="form-control"
								placeholder="Ex: https://www.youtube.com/watch?v=TM2FtVMqymk"
								bind={this.search_params}
							/>
						</div>
						<div style="display: flex;" class="col-2">
							<button
								style="margin: auto; margin-top: 24px; margin-left: 0px; width: 150px"
								class="btn btn-success"
							>
								<i class="fas fa-search"></i>
							</button>
						</div>
						<div style="display: flex;" class="col-2">
							<button
								type="button"
								style="margin: auto; margin-top: 24px; margin-left: 0px; width: 100px"
								class="btn btn-danger"
								onclick={this.resetSearch}
							>
								<i class="fas fa-backspace"></i>
							</button>
						</div>
					</form>
					<br />
					<div id="beforeDownload" class="container">
						<div class="container row">
							{Object.keys(this.results.items).length > 3 ? (
								this.results.items.map((video) => (
									<div class="card m-1" style="width: 18rem;">
										<img
											src={
												Array.isArray(video.thumbnails) &&
												video.thumbnails.length > 0
													? `${video.thumbnails[0].url}`
													: ""
											}
											class="card-img-top"
											onclick={this.redirect}
											video={video}
										/>
										<div class="card-body">
											<h5 class="card-title">{video.title}</h5>
											<p class="card-text">{video.author}</p>
										</div>
										<button
											class="btn btn-sm btn-primary"
											style={this.btnCanDownload}
											onclick={this.callDownload}
											video={video}
										>
											<i class="fas fa-download"></i> Download
										</button>
										<br />
									</div>
								))
							) : (Object.keys(this.results.items).length != 0 &&
									Object.keys(this.results.items).includes("id")) ||
							  typeof this.results.items.length != "undefined" ? (
								<div class="card m-1" style="width: 18rem;">
									<img
										src={this.results.items.thumb}
										class="card-img-top"
										onclick={this.redirect}
										video={this.results.items}
									/>
									<div class="card-body">
										<h5 class="card-title">{this.results.items.title}</h5>
										{/* <p class="card-text">{video.author}</p> */}
									</div>
									<button
										class="btn btn-sm btn-primary"
										style={this.btnCanDownload}
										onclick={this.callDownload}
										video={this.results.items}
									>
										<i class="fas fa-download"></i> Download
									</button>
									<br />
								</div>
							) : (
								<div>"Sem vídeos ou Download Iniciado"</div>
							)}
						</div>

						<div class="bottom">
							<h2>
								Feito com
								<a
									href="https://nullstack.app/pt-br"
									target="_blank"
									style="color: #d22365"
								>
									Nullstack
								</a>
								&nbsp;por: KowalskiJr
							</h2>
						</div>

						{this.isDownloading && (
							<div class="loader">
								<div style="text-align: center">
									<h1 style="color: aliceblue">Salvando o arquivo no servidor</h1>
									<div class="lds-ring">
										<div></div>
										<div></div>
										<div></div>
										<div></div>
									</div>
									<h2 style="color: aliceblue">Aguarde...</h2>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
