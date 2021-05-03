import Nullstack from "nullstack";
import "./Home.scss";

class Home extends Nullstack {
	prepare() {
		// your code goes here
	}

	search_params = "";
	results = {};
	link = "";

	async initiate({ params }) {
		if ("search_params" in params) {
			this.search_params = params.search_params;
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
		} else {
			this.results.items = [];
		}
	}

	static async getVideoInfoByUrl({ download, link }) {
		const videoInfo = await download.getInfo(
			`https://www.youtube.com/watch?v=${link.split("watch?v=")[1]}`
		);
		return videoInfo;
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
		const result = await this.downloadVideo({ video });
		const link = result[0];
		const size = result[1];
		function download(link) {
			var a = document.createElement("a");
			a.href = link;
			a.setAttribute("download", "");
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
		let fileSize = 0;
		const checkFile = setInterval(() => {
			var http = new XMLHttpRequest();
			http.open("HEAD", link, true); // true = Asynchronous
			http.onreadystatechange = function () {
				if (this.readyState == this.DONE) {
					if (this.status === 200) {
						fileSize = this.getResponseHeader("content-length");
						if (Number(fileSize) >= size) {
							download(link);
							clearInterval(checkFile);
						}
						console.log("fileSize = " + fileSize);
					}
				}
			};
			http.send();
		}, 500);
	}

	static async downloadVideo({ download, fs, video }) {
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
		const result = await download(`http://www.youtube.com/watch?v=${video.id}`, {
			quality: String(highestaudioitag),
			filter: "audioonly",
		}).pipe(
			(file = await fs.createWriteStream(
				`./public/downloads/${video.title
					.replace(/^[\w,\s-]+\.[A-Za-z]$/g, "")
					.replace("|", "")
					.replace(/['"]+/g, "")}.mp3`
			))
		);
		return [
			`./downloads/${video.title
				.replace(/^[\w,\s-]+\.[A-Za-z]$/g, "")
				.replace("|", "")
				.replace(/['"]+/g, "")}.mp3`,
			highestaudiosize,
		];
	}

	render() {
		return (
			<div>
				<div class="container">
					<h1>YTDL - Nullstack</h1>
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
							) : this.results.items.length != 0 &&
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
								""
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
