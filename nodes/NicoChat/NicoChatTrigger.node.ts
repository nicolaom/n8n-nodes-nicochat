import type {
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';

export class NicoChatTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NicoChat Trigger',
		name: 'nicoChatTrigger',
		icon: 'file:nicochat.svg',
		group: ['trigger'],
		version: 1,
		description: 'Inicia o workflow quando recebe um webhook do NicoChat',
		defaults: {
			name: 'NicoChat Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Eventos',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Todos os Eventos',
						value: '*',
						description: 'Receber todos os eventos do NicoChat',
					},
					{
						name: 'Mensagem Recebida',
						value: 'message_received',
						description: 'Quando uma mensagem é recebida',
					},
					{
						name: 'Resposta do Usuario',
						value: 'user_response',
						description: 'Quando um usuário responde no chat',
					},
					{
						name: 'Tag Adicionada',
						value: 'tag_added',
						description: 'Quando uma tag é adicionada ao contato',
					},
					{
						name: 'Campo Atualizado',
						value: 'field_updated',
						description: 'Quando um campo customizado é atualizado',
					},
					{
						name: 'Conversao',
						value: 'conversion',
						description: 'Quando uma conversão é registrada',
					},
					{
						name: 'Evento Customizado',
						value: 'custom_event',
						description: 'Quando um evento customizado é disparado',
					},
				],
				default: ['*'],
				description: 'Selecione os tipos de eventos que devem disparar o workflow',
			},
			{
				displayName: 'Opcoes',
				name: 'options',
				type: 'collection',
				placeholder: 'Adicionar Opcao',
				default: {},
				options: [
					{
						displayName: 'Responder ao Webhook',
						name: 'respondToWebhook',
						type: 'boolean',
						default: false,
						description: 'Se deve enviar uma resposta de volta ao NicoChat',
					},
					{
						displayName: 'Mensagem de Resposta',
						name: 'responseMessage',
						type: 'string',
						displayOptions: {
							show: {
								respondToWebhook: [true],
							},
						},
						default: '{"status": "ok", "message": "Recebido com sucesso"}',
						description: 'Mensagem JSON para responder ao NicoChat',
					},
					{
						displayName: 'Validar Origem',
						name: 'validateOrigin',
						type: 'boolean',
						default: false,
						description: 'Validar que a requisição vem do NicoChat (verificar IPs conhecidos)',
					},
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const options = this.getNodeParameter('options', {}) as {
			respondToWebhook?: boolean;
			responseMessage?: string;
			validateOrigin?: boolean;
		};
		const events = this.getNodeParameter('events', ['*']) as string[];

		// Get the webhook data
		const bodyData = req.body || {};
		const headerData = req.headers || {};

		// Extract common NicoChat webhook fields
		const webhookData = {
			body: bodyData,
			headers: headerData,
			query: req.query || {},
		};

		// Check if event type matches filter
		const eventType = bodyData.event_type || bodyData.event || bodyData.type || 'unknown';
		
		if (!events.includes('*') && !events.includes(eventType)) {
			// Event type doesn't match filter, return empty
			return {
				workflowData: [],
			};
		}

		// Prepare response
		let responseData: IWebhookResponseData;

		if (options.respondToWebhook) {
			let responseBody;
			try {
				responseBody = JSON.parse(options.responseMessage || '{"status": "ok"}');
			} catch (error) {
				responseBody = { status: 'ok', message: options.responseMessage };
			}

			responseData = {
				workflowData: [this.helpers.returnJsonArray(webhookData)],
				webhookResponse: responseBody,
			};
		} else {
			responseData = {
				workflowData: [this.helpers.returnJsonArray(webhookData)],
			};
		}

		return responseData;
	}
}
