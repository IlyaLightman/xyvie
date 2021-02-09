import 'reflect-metadata'
import 'mocha'
import {expect} from 'chai'
import {PingFinder} from '../src/services/ping-finder'
import {MessageResponder} from '../src/services/message-responder'
import {instance, mock, verify, when} from 'ts-mockito'
import {Message} from 'discord.js'

describe('MessageResponder', () => {
	let mockedPingFinderClass: PingFinder
	let mockedPingFinderInstance: PingFinder
	let mockedMessageClass: Message
	let mockedMessageInstance: Message

	let service: MessageResponder

	beforeEach(() => {
		mockedPingFinderClass = mock(PingFinder)
		mockedPingFinderInstance = instance(mockedPingFinderClass)
		mockedMessageClass = mock(Message)
		mockedMessageInstance = instance(mockedMessageClass)
		setMessageContents()

		service = new MessageResponder(mockedPingFinderInstance)
	})

	it('should reply', async () => {
		whenIsPingThenReturn(true)

		await service.handle(mockedMessageInstance)

		verify(mockedMessageClass.reply('Pong!')).once()
	})

	it('should not reply', async () => {
		whenIsPingThenReturn(false)

		await service.handle(mockedMessageInstance).then(() => {
			expect.fail('Unexpected promise')
		}).catch(() => { })

		verify(mockedMessageClass.reply('Pong!')).never()
	})

	const setMessageContents = () => {
		mockedMessageInstance.content = "Non-empty string"
	}

	const whenIsPingThenReturn = (result: boolean) => {
		when(mockedPingFinderClass.isPing("Non-empty string")).thenReturn(result)
	}
})

describe('PingFinder', () => {
	let service: PingFinder

	beforeEach(() => {
		service = new PingFinder()
	})

	it('should find "ping" in the string', () => {
		expect(service.isPing('ping')).to.be.true
	})
})
