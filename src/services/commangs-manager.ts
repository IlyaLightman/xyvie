import {Message} from 'discord.js'
import {inject, injectable} from 'inversify'
import {TYPES} from '../types'
import {Command} from '../command'
import * as fs from 'fs'

@injectable()
export class CommandsManager {
	private commands: Map<string, Command>

	public async executeCommand(
		message: Message,
		command: string,
		args: string[]
	): Promise<Message | Message[]> {
		console.log(command, args)
		return message
	}

	public prepareCommands(): void {
		const commandFiles = fs.readdirSync('../commands').filter(file => {
			return file.endsWith('.ts')
		})

		commandFiles.forEach(file => {
			const command = <Command>require(`./commands/${file}`)
			this.commands.set(command.title, command)
		})
	}
}