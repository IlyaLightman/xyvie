import {Message} from 'discord.js'
import {PingFinder} from './ping-finder'
import {CommandsManager} from './commands-manager'
import {inject, injectable} from 'inversify'
import {TYPES} from '../types'
import {DatabaseManager} from '../db/db-manager'
import {IServer} from '../db/server'

@injectable()
export class MessageResponder {
	private pingFinder: PingFinder
	private commandsManager: CommandsManager
	private databaseManager: DatabaseManager

	constructor(
		@inject(TYPES.PingFinder) pingFinder: PingFinder,
		@inject(TYPES.CommandsManager) commandsManager: CommandsManager,
		@inject(TYPES.DatabaseManager) databaseManager: DatabaseManager
	) {
		this.pingFinder = pingFinder
		this.commandsManager = commandsManager
		this.databaseManager = databaseManager

		this.commandsManager.prepareCommands()
	}

	public async handle(message: Message): Promise<Message | Message[]> {
		try {
			const srv = <IServer>(await this.databaseManager.findServer(message.guild.id))

			if (this.pingFinder.isPing(message.content)) {
				return message.reply('Pong!')
			}

			if (message.content.slice(0, srv.prefix.length) == srv.prefix) {
				const splitMessage: string[] = message.content.split(' ')
				return this.commandsManager.executeCommand(
					message, splitMessage[0].slice(1), splitMessage.slice(1))
			}

			return Promise.reject()
		} catch (err) {
			console.log(err)
		}
	}
}