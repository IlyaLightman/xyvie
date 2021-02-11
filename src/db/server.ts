import * as mongoose from 'mongoose'

export interface IServer extends mongoose.Document {
	id: string
	controllingLevels: {
		firstLevelRoles: Array<string>,
		secondLevelRoles: Array<string>,
		thirdLevelRoles: Array<string>
	}
	playlists: Array<{
		title: string,
		songs: Array<{title: string, url: string }>
	}>
	toxicityClassifier: boolean
	toxicityClassifierSettings: {
		identity_attack: boolean,
		insult: boolean,
		obscene: boolean,
		severe_toxicity: boolean,
		sexual_explicit: boolean,
		threat: boolean,
		toxicity: boolean
	}
}

export const ServerSchema = new mongoose.Schema({
	id: {
		type: String, require: true
	},
	controllingLevels: {
		// Zero level commands are for all
		// First level commands - some complex commands
		firstLevelRoles: [
			{ type: String }
		],
		// Second Level - moderator commands, controlling some users
		secondLevelRoles: [
			{ type: String }
		],
		// Third Level - admin commands, controlling the server
		thirdLevelRoles: [
			{ type: String }
		]
	},
	// Controlling by first level plus
	playlists: [
		{
			title: {
				type: String,
				require: true
			},
			songs: [
				{
					title: {
						type: String,
						require: true
					},
					url: {
						type: String,
						require: true
					}
				}
			]
		}
	],
	toxicityClassifier: {
		type: Boolean,
		default: false
	},
	toxicityClassifierSettings: {
		identity_attack:
			{ type: Boolean, default: true },
		insult:
			{ type: Boolean, default: true },
		obscene:
			{ type: Boolean, default: true },
		severe_toxicity:
			{ type: Boolean, default: true },
		sexual_explicit:
			{ type: Boolean, default: true },
		threat:
			{ type: Boolean, default: true },
		toxicity:
			{ type: Boolean, default: true }
	}
})

const Server = mongoose.model<IServer>('Server', ServerSchema)
module.exports = { Server }