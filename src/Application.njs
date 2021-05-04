import Nullstack from "nullstack";
import "./Application.scss";
import ytdl from "ytdl-core";
import ytsr from "ytsr";
import fs from "fs";
import Home from "./Home";

import firebase from "./firebase/admin";

class Application extends Nullstack {
	static async start(context) {
		const { project } = context;
		context.storage = firebase.storage;
		// context.fstorage = fireclient.storage;
		context.search = ytsr;
		context.download = ytdl;
		context.fs = fs;
	}

	prepare({ page }) {
		page.locale = "pt-BR";
	}

	renderHead() {
		return (
			<head>
				<link href="https://fonts.gstatic.com" rel="preconnect" />
				<link
					href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
					rel="stylesheet"
				/>
				{/* Bootstrap and FontAwesome */}
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
					rel="stylesheet"
				/>
				<link
					href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
					rel="stylesheet"
				/>
				<title>Youtube Downloader - KowaslkiJr</title>
				<script src="https://www.gstatic.com/firebasejs/8.4.3/firebase-app.js"></script>
			</head>
		);
	}

	render() {
		return (
			<main>
				<Head />
				<Home route="/" />
			</main>
		);
	}
}

export default Application;
