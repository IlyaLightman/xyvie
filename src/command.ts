import {Message} from 'discord.js'
import {inject} from 'inversify'
import {TYPES} from './types'
import {DatabaseManager} from './db/db-manager'

export abstract class Command {
	protected readonly databaseManager: DatabaseManager

	public title: string
	public description: string
	public aliases: string[]
	public accessLevel: number
	public guildOnly: boolean
	public usage: string

	constructor(
		@inject(TYPES.DatabaseManager) databaseManager: DatabaseManager
	) {
		this.databaseManager = databaseManager
	}

	public abstract execute(
		message: Message,
		args: string[]
	): Promise<string>
}