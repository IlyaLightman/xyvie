import {Client, Message} from 'discord.js'
import {inject, injectable} from 'inversify'
import {TYPES} from './types'
import {MessageResponder} from './services/message-responder'
import {DatabaseManager} from './db/db-manager'

@injectable()
export class Bot {
    private client: Client
    private readonly token: string
    private messageResponder: MessageResponder
    private databaseManager: DatabaseManager

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.MessageResponder) messageResponder: MessageResponder,
        @inject(TYPES.DatabaseManager) databaseManager: DatabaseManager
    ) {
        this.client = client
        this.token = token
        this.messageResponder = messageResponder
        this.databaseManager = databaseManager
    }

    public async listen(): Promise<string> {
        try {
            this.client.on('message', async (message: Message) => {
                try {
                    if (message.author.bot) {
                        return console.log('Ignoring bot message')
                    }
                    console.log("Message received! Contents: ", message.content)

                    // await this.messageResponder.handle(message)
                    this.messageResponder.handle(message).then(() => {
                        console.log('Action executed')
                    }).catch(() => {
                        // console.log('Response not sent :(')
                    })

                    // console.log('Response sent!')
                } catch (err) {
                    console.log(err)
                }
            })

            await this.databaseManager.initializeDatabase()

            return this.client.login(this.token)
        } catch (err) {
            console.log(err)
        }
    }
}