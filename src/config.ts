import dotenv from 'dotenv';
dotenv.config();

import { IToken } from './MAL';
import * as redis from 'redis';

let file = '{}';

const client = redis.createClient({
	url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`
});
client.connect().then(() => {
	console.log('connected');
}).catch((e) => {
	console.log('redis connection error: ', e);
});

client.on('error', (err) => console.log('Redis error', err));


const savedConfig  = async () : Promise<IToken> =>{

	const data = await client.GET('config')
	console.log('data', data)
	
	if(data !== null){
		file = data
		console.log('if file is not null')
		return JSON.parse(file);
	}

	return JSON.parse(file);
}

function saveConfig(data : IToken){

	client.SET('config', JSON.stringify(data));

	
}
export  {savedConfig, saveConfig, isTokenExpired};

async function isTokenExpired(): Promise<boolean>{
	const config = await savedConfig();
	
	const savedDate = new Date (config.requestDate)
	const expires = parseInt(config.expires_in, 10)
	return new Date().getTime() > savedDate.getTime()  + expires * 1000;
}