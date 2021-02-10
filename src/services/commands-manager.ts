import {Message} from 'discord.js'
import {injectable} from 'inversify'
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

		const cmd = <Command>(this.commands.get(command)
			|| this.commands.forEach(c => {
				if (c.aliases.includes(command))
					return this.commands.get(c.title)
			}))

		await cmd.execute(message, args)

		return message
	}

	public prepareCommands(): void {
		const commandFiles = fs.readdirSync('src/commands').filter(file => {
			return file.endsWith('.ts')
		})

		commandFiles.forEach(file => {
			const command = <Command>require(`../commands/${file}`)
			this.commands.set(command.title, command)
		})
	}
}