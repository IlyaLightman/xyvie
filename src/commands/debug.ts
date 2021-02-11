import {Command} from '../command'
import {Message} from 'discord.js'

export class debug extends Command {
	public title: string = 'debug'
	public description: string = 'Комманда для отладки бота'
	public aliases: string[] = ['debugger']
	public accessLevel: number = 2
	public guildOnly: boolean = false
	public usage: string = ''

	public async execute(message: Message, args: string[]): Promise<string> {
		const srv = await this.databaseManager.findServer(message.guild.id)

		return Promise.resolve('')
	}
}