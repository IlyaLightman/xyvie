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

	public async registerServer(srv: IServer): Promise<IServer> {
		try {
			const newServer = new Server(srv)
			await newServer.save()
			return <IServer>newServer
		} catch (err) {
			console.log(err)
		}
	}

	public async deleteServer(id: string): Promise<string> {
		try {
			await Server.findOneAndDelete({ id })
			return 'Server deleted successfully'
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