import fs from 'fs';
import { IToken } from './MAL';
const path = './config.json';
let file = '{}';

const savedConfig  = () : IToken =>{
	if(fs.existsSync(path)){

		file = fs.readFileSync(path, 'utf8');
	}
	return JSON.parse(file);
}

function saveConfig(data : IToken){

	fs.writeFileSync(path, JSON.stringify(data, null, 2));
}
export  {savedConfig, saveConfig, isTokenExpired};

function isTokenExpired(): boolean{
	const config = savedConfig();
	const savedDate = new Date (config.requestDate)
	const expires = parseInt(config.expires_in, 10)
	return new Date().getTime() > savedDate.getTime()  + expires * 1000;
}