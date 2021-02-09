import {Message} from 'discord.js'
import {inject, injectable} from 'inversify'
import {TYPES} from '../types'

@injectable()
export class CommandsManager {
	constructor() {
	}

	public async executeCommand(
		message: Message,
		command: string,
		args: string[]
	): Promise<Message | Message[]> {
		return message
	}
}