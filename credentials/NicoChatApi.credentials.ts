import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NicoChatApi implements ICredentialType {
	name = 'nicoChatApi';
	displayName = 'NicoChat API';
	documentationUrl = 'https://app.nicochat.com.br/api';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API Key para autenticação na API do NicoChat',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.nicochat.com.br/api',
			url: '/flow/bot-fields',
			method: 'GET',
		},
	};
}
