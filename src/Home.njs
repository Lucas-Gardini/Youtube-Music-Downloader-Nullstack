import Nullstack from "nullstack";
import firebase from "firebase/app";
import "firebase/storage";

import "./Home.scss";

class Home extends Nullstack {
	search_params = "";
	results = {};
	link = "";

	async initiate({ params }) {
		if ("search_params" in params) {
			this.search_params = params.search_params;
		}
		if (String(this.search_params).includes("https")) {
			const videoInfo = await this.getVideoInfoByUrl({ link: this.search_params });
			const video = {
				id: videoInfo.player_response.videoDetails.videoId,
				title: videoInfo.player_response.videoDetails.title,
				thumb: videoInfo.player_response.videoDetails.thumbnail.thumbnails[3].url,
			};
			// this.callDownload({ video });
			this.results.items = video;
		} else {
			this.results = await this.searchVideos({ search_params: params.search_params });
		}
	}

	static async getVideoInfoByUrl({ download, link, router }) {
		link = link.split("watch?v=")[1];
		link = link.split("&list=")[0];
		try {
			const videoInfo = await download.getInfo(link);
			return videoInfo;
		} catch (e) {
			router.url = "/";
			return {};
		}
	}

	static async searchVideos({ search, download, search_params }) {
		const options = {
			limit: 10,
			pages: 1,
		};
		if (!(typeof search_params === "undefined" || search_params.length <= 0)) {
			const result = await search(search_params, options);
			result.items = result.items.filter(function (video) {
				return (
					video.title !== "People also watched" && String(video.title).indexOf("Mix") < 0
				);
			});
			return result;
		} else {
			const result = {};
			result.items = {};
			return result;
		}
	}

	async callDownload({ video }) {
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
		const video_info = await this.downloadVideo({ video });
		async function download() {
			let reference = await fstorage.ref(`${video_info[0]}.mp3`);
			const downloadUrl = await reference.getDownloadURL();
			// var a = document.createElement("a");
			// a.href = downloadUrl;
			// a.setAttribute("download", "");
			// document.body.appendChild(a);
			// a.click();
			// document.body.removeChild(a);

			function saveBlob(blob, fileName) {
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
		let timeout = (video_info[1] / 1024) * 2;
		setTimeout(() => {
			download(video_info[0]);
		}, timeout);
		this.launchToast();
	}

	static async downloadVideo({ download, fs, video, storage }) {
		var file;
		const info = await download.getInfo(`http://www.youtube.com/watch?v=${video.id}`);
		const formats = info.player_response.streamingData.adaptiveFormats;
		const onlyaudio = [];
		for (let c in formats) {
			if (String(formats[c].mimeType).indexOf("audio") > -1) {
				onlyaudio.push(formats[c]);
			}
		}
		let highestaudiosize = 0;
		let highestaudioitag = 0;
		for (let c in onlyaudio) {
			if (onlyaudio[c].contentLength > highestaudiosize) {
				highestaudiosize = onlyaudio[c].contentLength;
				highestaudioitag = onlyaudio[c].itag;
			}
		}

		const video_title = video.title
			.replace(/^[\w,\s-]+\.[A-Za-z]$/g, "")
			.replace("|", "")
			.replace(/['"]+/g, "")
			.replace("/", "")
			.replace("\\", "")
			.replace("%", "")
			.replace(">", "")
			.replace("<", "");

		const file_name = `./public/downloads/${video_title}.mp3`;

		const result = await download(`http://www.youtube.com/watch?v=${video.id}`, {
			quality: String(highestaudioitag),
			filter: "audioonly",
		}).pipe((file = await fs.createWriteStream(file_name)));
		file.on("finish", async () => {
			const upload = await storage().bucket().upload(file_name);
			fs.unlinkSync(file_name);
		});

		return [video_title, highestaudiosize];
	}

	async launchToast() {
		var x = document.getElementById("toast");
		x.className = "show";
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 5000);
	}

	render() {
		return (
			<div>
				<div class="container">
					<h1>Youtube Music Downloader - Nullstack</h1>
					<form onsubmit={this.ghost_function} class="row g-2 justify-content-md-center">
						<div class="col-10">
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
										/>
										<div class="card-body">
											<h5 class="card-title">{video.title}</h5>
											<p class="card-text">{video.author}</p>
										</div>
										<button
											class="btn btn-sm btn-primary"
											onclick={this.callDownload}
											video={video}
										>
											<i class="fas fa-download"></i> Download
										</button>
										<br />
									</div>
								))
							) : Object.keys(this.results.items).length != 0 ||
							  typeof this.results.items.length != "undefined" ? (
								<div class="card m-1" style="width: 18rem;">
									<img src={this.results.items.thumb} class="card-img-top" />
									<div class="card-body">
										<h5 class="card-title">{this.results.items.title}</h5>
										{/* <p class="card-text">{video.author}</p> */}
									</div>
									<button
										class="btn btn-sm btn-primary"
										onclick={this.callDownload}
										video={this.results.items}
									>
										<i class="fas fa-download"></i> Download
									</button>
									<br />
								</div>
							) : (
								<div>"Sem vídeos"</div>
							)}
						</div>

						<div id="toast">
							<div id="img">
								<i class="fas fa-download"></i>
							</div>
							<div id="desc">Download Iniciado</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
