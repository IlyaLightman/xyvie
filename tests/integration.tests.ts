import container from '../src/inversify.config'
import {TYPES} from '../src/types'
import {Client} from 'discord.js'
import {Bot} from '../src/bot'
import {instance, mock} from 'ts-mockito'

describe('Bot', () => {
	let discordMock: Client
	let discordInstance: Client
	let bot: Bot

	beforeEach(() => {
		discordMock = mock(Client)
		discordInstance = instance(discordMock)
		container.rebind<Client>(TYPES.Client).toConstantValue(discordInstance)
		bot = container.get<Bot>(TYPES.Bot)
	})

	// Test cases o_0
})