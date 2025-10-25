import type {
        IHookFunctions,
        INodeType,
        INodeTypeDescription,
        IWebhookFunctions,
        IWebhookResponseData,
} from 'n8n-workflow';

export class NicoChatTrigger implements INodeType {
        description: INodeTypeDescription = {
                displayName: 'Requisicao Externa NicoChat Trigger',
                name: 'nicoChatTrigger',
                icon: 'file:nicochat.svg',
                group: ['trigger'],
                version: 1,
                description: 'Recebe requisições externas do NicoChat via webhook',
                defaults: {
                        name: 'Requisição Externa NicoChat',
                },
                inputs: [],
                outputs: ['main'],
                credentials: [],
                usableAsTool: true,
                webhooks: [
                        {
                                name: 'default',
                                httpMethod: 'POST',
                                responseMode: 'onReceived',
                                path: 'webhook',
                        },
                ],
                properties: [],
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

                const webhookData = {
                        body: req.body || {},
                        headers: req.headers || {},
                        query: req.query || {},
                };

                return {
                        workflowData: [this.helpers.returnJsonArray(webhookData)],
                };
        }
}
