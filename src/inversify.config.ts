import 'reflect-metadata'
import {Container} from 'inversify'
import {TYPES} from './types'
import {Bot} from './bot'
import {Client} from 'discord.js'
import {MessageResponder} from './services/message-responder'
import {PingFinder} from './services/ping-finder'
import {CommandsManager} from './services/commands-manager'
import {DatabaseManager} from './db/db-manager'

const container = new Container()

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope()
container.bind<Client>(TYPES.Client).toConstantValue(new Client())
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN)
container.bind<MessageResponder>(TYPES.MessageResponder).to(MessageResponder).inSingletonScope()
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope()
container.bind<CommandsManager>(TYPES.CommandsManager).to(CommandsManager).inSingletonScope()
container.bind<DatabaseManager>(TYPES.DatabaseManager).to(DatabaseManager).inSingletonScope()

export default container
