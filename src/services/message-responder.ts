import {Message} from 'discord.js'
import {PingFinder} from './ping-finder'
import {CommandsManager} from './commangs-manager'
import {inject, injectable} from 'inversify'
import {TYPES} from '../types'

@injectable()
export class MessageResponder {
	private pingFinder: PingFinder
	private commandsManager: CommandsManager

	constructor(
		@inject(TYPES.PingFinder) pingFinder: PingFinder,
		@inject(TYPES.CommandsManager) commandsManager: CommandsManager
	) {
		this.pingFinder = pingFinder
		this.commandsManager = commandsManager

		this.commandsManager.prepareCommands()
	}

	public handle(message: Message): Promise<Message | Message[]> {
		if (this.pingFinder.isPing(message.content)) {
			return message.reply('Pong!')
		}

		if (message.content[0] == '$') {
			const splitMessage: string[] = message.content.split(' ')
			return this.commandsManager.executeCommand(
				message, splitMessage[0].slice(1), splitMessage.slice(1))
		}

		return Promise.reject()
	}
}
