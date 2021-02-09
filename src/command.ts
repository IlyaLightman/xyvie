import {Message} from 'discord.js'

export abstract class Command {
	public title: string
	public description: string
	public aliases: string[]
	public accessLevel: number
	public guildOnly: boolean
	public usage: string

	public abstract execute(
		message: Message,
		args: string[]
	): Promise<string>
}