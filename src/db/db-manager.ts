import {injectable} from 'inversify'
import {IServer} from './server'

const mongoose = require('mongoose')
require('dotenv').config()

const Server = require('./server')

@injectable()
export class DatabaseManager {
	public async findServer(id: string): Promise<IServer> {
		try {
			const srv = await Server.findOne({ id })
			return <IServer>srv
		} catch (err) {
			console.log(err)
		}
	}

	public async saveServer(srv: IServer): Promise<IServer> {
		try {
			await srv.save()
			return <IServer>srv
		} catch (err) {
			console.log(err)
		}
	}

	public async initializeDatabase(): Promise<void> {
		try {
			await mongoose.connect(process.env.MONGO, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			})
		} catch (err) {
			console.log(err)
		}
	}
}