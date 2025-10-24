import {
        IExecuteFunctions,
        INodeExecutionData,
        INodeType,
        INodeTypeDescription,
        IDataObject,
        NodeOperationError,
} from 'n8n-workflow';

export class NicoChat implements INodeType {
        description: INodeTypeDescription = {
                displayName: 'NicoChat',
                name: 'nicoChat',
                icon: 'file:nicochat.svg',
                group: ['transform'],
                version: 1,
                subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
                description: 'Integração com a API do NicoChat',
                defaults: {
                        name: 'NicoChat',
                },
                inputs: ['main'],
                outputs: ['main'],
                credentials: [
                        {
                                name: 'nicoChatApi',
                                required: true,
                        },
                ],
                properties: [
                        {
                                displayName: 'Resource',
                                name: 'resource',
                                type: 'options',
                                noDataExpression: true,
                                options: [
                                        {
                                                name: 'Subscriber',
                                                value: 'subscriber',
                                                description: 'Operações com contatos (subscribers)',
                                        },
                                        {
                                                name: 'Tag',
                                                value: 'tag',
                                                description: 'Operações com tags',
                                        },
                                        {
                                                name: 'Custom Field',
                                                value: 'customField',
                                                description: 'Operações com campos personalizados',
                                        },
                                        {
                                                name: 'Flow',
                                                value: 'flow',
                                                description: 'Enviar fluxos para contatos',
                                        },
                                        {
                                                name: 'Broadcast',
                                                value: 'broadcast',
                                                description: 'Disparos em massa',
                                        },
                                        {
                                                name: 'WhatsApp Template',
                                                value: 'whatsappTemplate',
                                                description: 'Templates do WhatsApp',
                                        },
                                        {
                                                name: 'Conversation',
                                                value: 'conversation',
                                                description: 'Histórico de conversas',
                                        },
                                ],
                                default: 'subscriber',
                        },

                        // ===============================
                        // SUBSCRIBER OPERATIONS
                        // ===============================
                        {
                                displayName: 'Operation',
                                name: 'operation',
                                type: 'options',
                                noDataExpression: true,
                                displayOptions: {
                                        show: {
                                                resource: ['subscriber'],
                                        },
                                },
                                options: [
                                        {
                                                name: 'Create',
                                                value: 'create',
                                                description: 'Criar um novo contato',
                                                action: 'Criar contato',
                                        },
                                        {
                                                name: 'Get',
                                                value: 'get',
                                                description: 'Buscar um contato específico',
                                                action: 'Buscar contato',
                                        },
                                        {
                                                name: 'Get Many',
                                                value: 'getMany',
                                                description: 'Listar contatos',
                                                action: 'Listar contatos',
                                        },
                                        {
                                                name: 'Update',
                                                value: 'update',
                                                description: 'Atualizar um contato',
                                                action: 'Atualizar contato',
                                        },
                                        {
                                                name: 'Delete',
                                                value: 'delete',
                                                description: 'Deletar um contato',
                                                action: 'Deletar contato',
                                        },
                                ],
                                default: 'create',
                        },

                        // Subscriber: user_ns (for get, update, delete)
                        {
                                displayName: 'User NS',
                                name: 'userNs',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['subscriber'],
                                                operation: ['get', 'update', 'delete'],
                                        },
                                },
                                default: '',
                                description: 'Identificador único do contato (user_ns)',
                        },

                        // Subscriber: Create fields
                        {
                                displayName: 'First Name',
                                name: 'firstName',
                                type: 'string',
                                displayOptions: {
                                        show: {
                                                resource: ['subscriber'],
                                                operation: ['create'],
                                        },
                                },
                                default: '',
                                description: 'Primeiro nome do contato',
                        },
                        {
                                displayName: 'Last Name',
                                name: 'lastName',
                                type: 'string',
                                displayOptions: {
                                        show: {
                                                resource: ['subscriber'],
                                                operation: ['create'],
                                        },
                                },
                                default: '',
                                description: 'Sobrenome do contato',
                        },
                        {
                                displayName: 'Email',
                                name: 'email',
                                type: 'string',
                                displayOptions: {
                                        show: {
                                                resource: ['subscriber'],
                                                operation: ['create'],
                                        },
                                },
                                default: '',
                                description: 'Email do contato',
                        },
                        {
                                displayName: 'Phone',
                                name: 'phone',
                                type: 'string',
                                displayOptions: {
                                        show: {
                                                resource: ['subscriber'],
                                                operation: ['create'],
                                        },
                                },
                                default: '',
                                description: 'Telefone do contato',
                        },

                        // Subscriber: Update fields
                        {
                                displayName: 'Update Fields',
                                name: 'updateFields',
                                type: 'collection',
                                placeholder: 'Adicionar Campo',
                                default: {},
                                displayOptions: {
                                        show: {
                                                resource: ['subscriber'],
                                                operation: ['update'],
                                        },
                                },
                                options: [
                                        {
                                                displayName: 'First Name',
                                                name: 'first_name',
                                                type: 'string',
                                                default: '',
                                        },
                                        {
                                                displayName: 'Last Name',
                                                name: 'last_name',
                                                type: 'string',
                                                default: '',
                                        },
                                        {
                                                displayName: 'Email',
                                                name: 'email',
                                                type: 'string',
                                                default: '',
                                        },
                                        {
                                                displayName: 'Phone',
                                                name: 'phone',
                                                type: 'string',
                                                default: '',
                                        },
                                ],
                        },

                        // Subscriber: GetMany options
                        {
                                displayName: 'Options',
                                name: 'options',
                                type: 'collection',
                                placeholder: 'Adicionar Opção',
                                default: {},
                                displayOptions: {
                                        show: {
                                                resource: ['subscriber'],
                                                operation: ['getMany'],
                                        },
                                },
                                options: [
                                        {
                                                displayName: 'Limit',
                                                name: 'limit',
                                                type: 'number',
                                                typeOptions: {
                                                        minValue: 1,
                                                        maxValue: 1000,
                                                },
                                                default: 50,
                                                description: 'Número máximo de resultados a retornar',
                                        },
                                        {
                                                displayName: 'Page',
                                                name: 'page',
                                                type: 'number',
                                                typeOptions: {
                                                        minValue: 1,
                                                },
                                                default: 1,
                                                description: 'Número da página',
                                        },
                                ],
                        },

                        // ===============================
                        // TAG OPERATIONS
                        // ===============================
                        {
                                displayName: 'Operation',
                                name: 'operation',
                                type: 'options',
                                noDataExpression: true,
                                displayOptions: {
                                        show: {
                                                resource: ['tag'],
                                        },
                                },
                                options: [
                                        {
                                                name: 'Add to Subscriber',
                                                value: 'addToSubscriber',
                                                description: 'Adicionar tag a um contato',
                                                action: 'Adicionar tag ao contato',
                                        },
                                        {
                                                name: 'Remove from Subscriber',
                                                value: 'removeFromSubscriber',
                                                description: 'Remover tag de um contato',
                                                action: 'Remover tag do contato',
                                        },
                                        {
                                                name: 'Create',
                                                value: 'create',
                                                description: 'Criar uma nova tag',
                                                action: 'Criar tag',
                                        },
                                        {
                                                name: 'Delete',
                                                value: 'delete',
                                                description: 'Deletar uma tag',
                                                action: 'Deletar tag',
                                        },
                                        {
                                                name: 'Get Many',
                                                value: 'getMany',
                                                description: 'Listar tags',
                                                action: 'Listar tags',
                                        },
                                ],
                                default: 'addToSubscriber',
                        },

                        // Tag: user_ns (for add/remove operations)
                        {
                                displayName: 'User NS',
                                name: 'userNs',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['tag'],
                                                operation: ['addToSubscriber', 'removeFromSubscriber'],
                                        },
                                },
                                default: '',
                                description: 'Identificador único do contato (user_ns)',
                        },

                        // Tag: tag name
                        {
                                displayName: 'Tag Name',
                                name: 'tagName',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['tag'],
                                                operation: ['addToSubscriber', 'removeFromSubscriber', 'create', 'delete'],
                                        },
                                },
                                default: '',
                                description: 'Nome da tag',
                        },

                        // Tag: GetMany options
                        {
                                displayName: 'Options',
                                name: 'options',
                                type: 'collection',
                                placeholder: 'Adicionar Opção',
                                default: {},
                                displayOptions: {
                                        show: {
                                                resource: ['tag'],
                                                operation: ['getMany'],
                                        },
                                },
                                options: [
                                        {
                                                displayName: 'Limit',
                                                name: 'limit',
                                                type: 'number',
                                                default: 50,
                                        },
                                        {
                                                displayName: 'Page',
                                                name: 'page',
                                                type: 'number',
                                                default: 1,
                                        },
                                        {
                                                displayName: 'Name',
                                                name: 'name',
                                                type: 'string',
                                                default: '',
                                                description: 'Buscar por nome da tag',
                                        },
                                ],
                        },

                        // ===============================
                        // CUSTOM FIELD OPERATIONS
                        // ===============================
                        {
                                displayName: 'Operation',
                                name: 'operation',
                                type: 'options',
                                noDataExpression: true,
                                displayOptions: {
                                        show: {
                                                resource: ['customField'],
                                        },
                                },
                                options: [
                                        {
                                                name: 'Get Many',
                                                value: 'getMany',
                                                description: 'Listar campos personalizados',
                                                action: 'Listar campos personalizados',
                                        },
                                        {
                                                name: 'Set Field Value',
                                                value: 'setFieldValue',
                                                description: 'Definir valor de campo personalizado',
                                                action: 'Definir valor do campo',
                                        },
                                ],
                                default: 'getMany',
                        },

                        // Custom Field: user_ns
                        {
                                displayName: 'User NS',
                                name: 'userNs',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['customField'],
                                                operation: ['setFieldValue'],
                                        },
                                },
                                default: '',
                                description: 'Identificador único do contato (user_ns)',
                        },

                        // Custom Field: field name
                        {
                                displayName: 'Field Name',
                                name: 'fieldName',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['customField'],
                                                operation: ['setFieldValue'],
                                        },
                                },
                                default: '',
                                description: 'Nome do campo personalizado',
                        },

                        // Custom Field: field value
                        {
                                displayName: 'Field Value',
                                name: 'fieldValue',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['customField'],
                                                operation: ['setFieldValue'],
                                        },
                                },
                                default: '',
                                description: 'Valor do campo personalizado',
                        },

                        // ===============================
                        // FLOW OPERATIONS
                        // ===============================
                        {
                                displayName: 'Operation',
                                name: 'operation',
                                type: 'options',
                                noDataExpression: true,
                                displayOptions: {
                                        show: {
                                                resource: ['flow'],
                                        },
                                },
                                options: [
                                        {
                                                name: 'Send to Subscriber',
                                                value: 'sendToSubscriber',
                                                description: 'Enviar fluxo para um contato',
                                                action: 'Enviar fluxo para contato',
                                        },
                                        {
                                                name: 'Get Many',
                                                value: 'getMany',
                                                description: 'Listar fluxos disponíveis',
                                                action: 'Listar fluxos',
                                        },
                                ],
                                default: 'sendToSubscriber',
                        },

                        // Flow: user_ns
                        {
                                displayName: 'User NS',
                                name: 'userNs',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['flow'],
                                                operation: ['sendToSubscriber'],
                                        },
                                },
                                default: '',
                                description: 'Identificador único do contato (user_ns)',
                        },

                        // Flow: flow name
                        {
                                displayName: 'Flow Name',
                                name: 'flowName',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['flow'],
                                                operation: ['sendToSubscriber'],
                                        },
                                },
                                default: '',
                                description: 'Nome do fluxo a enviar',
                        },

                        // ===============================
                        // BROADCAST OPERATIONS
                        // ===============================
                        {
                                displayName: 'Operation',
                                name: 'operation',
                                type: 'options',
                                noDataExpression: true,
                                displayOptions: {
                                        show: {
                                                resource: ['broadcast'],
                                        },
                                },
                                options: [
                                        {
                                                name: 'Send',
                                                value: 'send',
                                                description: 'Enviar broadcast para contatos',
                                                action: 'Enviar broadcast',
                                        },
                                        {
                                                name: 'Send by Tag',
                                                value: 'sendByTag',
                                                description: 'Enviar broadcast por tag',
                                                action: 'Enviar broadcast por tag',
                                        },
                                ],
                                default: 'send',
                        },

                        // Broadcast: message
                        {
                                displayName: 'Message',
                                name: 'message',
                                type: 'string',
                                typeOptions: {
                                        rows: 4,
                                },
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['broadcast'],
                                                operation: ['send', 'sendByTag'],
                                        },
                                },
                                default: '',
                                description: 'Mensagem do broadcast',
                        },

                        // Broadcast: user_ns list (for send)
                        {
                                displayName: 'User NS List',
                                name: 'userNsList',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['broadcast'],
                                                operation: ['send'],
                                        },
                                },
                                default: '',
                                description: 'Lista de user_ns separados por vírgula',
                        },

                        // Broadcast: tag name (for sendByTag)
                        {
                                displayName: 'Tag Name',
                                name: 'tagName',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['broadcast'],
                                                operation: ['sendByTag'],
                                        },
                                },
                                default: '',
                                description: 'Nome da tag para filtrar contatos',
                        },

                        // ===============================
                        // WHATSAPP TEMPLATE OPERATIONS
                        // ===============================
                        {
                                displayName: 'Operation',
                                name: 'operation',
                                type: 'options',
                                noDataExpression: true,
                                displayOptions: {
                                        show: {
                                                resource: ['whatsappTemplate'],
                                        },
                                },
                                options: [
                                        {
                                                name: 'Send',
                                                value: 'send',
                                                description: 'Enviar template do WhatsApp',
                                                action: 'Enviar template',
                                        },
                                ],
                                default: 'send',
                        },

                        // WhatsApp Template: user_ns
                        {
                                displayName: 'User NS',
                                name: 'userNs',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['whatsappTemplate'],
                                                operation: ['send'],
                                        },
                                },
                                default: '',
                                description: 'Identificador único do contato (user_ns)',
                        },

                        // WhatsApp Template: template name
                        {
                                displayName: 'Template Name',
                                name: 'templateName',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['whatsappTemplate'],
                                                operation: ['send'],
                                        },
                                },
                                default: '',
                                description: 'Nome do template aprovado no WhatsApp',
                        },

                        // WhatsApp Template: parameters (optional)
                        {
                                displayName: 'Template Parameters',
                                name: 'templateParameters',
                                type: 'string',
                                displayOptions: {
                                        show: {
                                                resource: ['whatsappTemplate'],
                                                operation: ['send'],
                                        },
                                },
                                default: '',
                                description: 'Parâmetros do template em formato JSON (opcional)',
                        },

                        // ===============================
                        // CONVERSATION OPERATIONS
                        // ===============================
                        {
                                displayName: 'Operation',
                                name: 'operation',
                                type: 'options',
                                noDataExpression: true,
                                displayOptions: {
                                        show: {
                                                resource: ['conversation'],
                                        },
                                },
                                options: [
                                        {
                                                name: 'Get History',
                                                value: 'getHistory',
                                                description: 'Obter histórico de conversa',
                                                action: 'Obter histórico',
                                        },
                                ],
                                default: 'getHistory',
                        },

                        // Conversation: user_ns
                        {
                                displayName: 'User NS',
                                name: 'userNs',
                                type: 'string',
                                required: true,
                                displayOptions: {
                                        show: {
                                                resource: ['conversation'],
                                                operation: ['getHistory'],
                                        },
                                },
                                default: '',
                                description: 'Identificador único do contato (user_ns)',
                        },

                        // Conversation: limit
                        {
                                displayName: 'Limit',
                                name: 'limit',
                                type: 'number',
                                displayOptions: {
                                        show: {
                                                resource: ['conversation'],
                                                operation: ['getHistory'],
                                        },
                                },
                                default: 50,
                                description: 'Número de mensagens a retornar',
                        },
                ],
        };

        async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
                const items = this.getInputData();
                const returnData: IDataObject[] = [];
                const resource = this.getNodeParameter('resource', 0) as string;
                const operation = this.getNodeParameter('operation', 0) as string;

                for (let i = 0; i < items.length; i++) {
                        try {
                                if (resource === 'subscriber') {
                                        if (operation === 'create') {
                                                const firstName = this.getNodeParameter('firstName', i) as string;
                                                const lastName = this.getNodeParameter('lastName', i) as string;
                                                const email = this.getNodeParameter('email', i) as string;
                                                const phone = this.getNodeParameter('phone', i) as string;

                                                const body: IDataObject = {};
                                                if (firstName) body.first_name = firstName;
                                                if (lastName) body.last_name = lastName;
                                                if (email) body.email = email;
                                                if (phone) body.phone = phone;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'POST',
                                                                url: 'https://app.nicochat.com.br/api/flow/create-bot-user',
                                                                body,
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'get') {
                                                const userNs = this.getNodeParameter('userNs', i) as string;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'GET',
                                                                url: 'https://app.nicochat.com.br/api/flow/bot-user-info',
                                                                qs: { user_ns: userNs },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'getMany') {
                                                const options = this.getNodeParameter('options', i) as IDataObject;

                                                const qs: IDataObject = {};
                                                if (options.limit) qs.limit = options.limit;
                                                if (options.page) qs.page = options.page;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'GET',
                                                                url: 'https://app.nicochat.com.br/api/flow/bot-users',
                                                                qs,
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'update') {
                                                const userNs = this.getNodeParameter('userNs', i) as string;
                                                const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

                                                const body: IDataObject = { user_ns: userNs };
                                                Object.assign(body, updateFields);

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'POST',
                                                                url: 'https://app.nicochat.com.br/api/flow/update-bot-user',
                                                                body,
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'delete') {
                                                const userNs = this.getNodeParameter('userNs', i) as string;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'DELETE',
                                                                url: 'https://app.nicochat.com.br/api/flow/delete-bot-user',
                                                                body: { user_ns: userNs },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        }
                                } else if (resource === 'tag') {
                                        if (operation === 'addToSubscriber') {
                                                const userNs = this.getNodeParameter('userNs', i) as string;
                                                const tagName = this.getNodeParameter('tagName', i) as string;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'POST',
                                                                url: 'https://app.nicochat.com.br/api/flow/bot-user-add-tag-by-name',
                                                                body: { user_ns: userNs, name: tagName },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'removeFromSubscriber') {
                                                const userNs = this.getNodeParameter('userNs', i) as string;
                                                const tagName = this.getNodeParameter('tagName', i) as string;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'POST',
                                                                url: 'https://app.nicochat.com.br/api/flow/bot-user-remove-tag-by-name',
                                                                body: { user_ns: userNs, name: tagName },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'create') {
                                                const tagName = this.getNodeParameter('tagName', i) as string;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'POST',
                                                                url: 'https://app.nicochat.com.br/api/flow/create-tag',
                                                                body: { name: tagName },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'delete') {
                                                const tagName = this.getNodeParameter('tagName', i) as string;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'DELETE',
                                                                url: 'https://app.nicochat.com.br/api/flow/delete-tag-by-name',
                                                                body: { name: tagName },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'getMany') {
                                                const options = this.getNodeParameter('options', i) as IDataObject;

                                                const qs: IDataObject = {};
                                                if (options.limit) qs.limit = options.limit;
                                                if (options.page) qs.page = options.page;
                                                if (options.name) qs.name = options.name;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'GET',
                                                                url: 'https://app.nicochat.com.br/api/flow/tags',
                                                                qs,
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        }
                                } else if (resource === 'customField') {
                                        if (operation === 'getMany') {
                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'GET',
                                                                url: 'https://app.nicochat.com.br/api/flow/user-fields',
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'setFieldValue') {
                                                const userNs = this.getNodeParameter('userNs', i) as string;
                                                const fieldName = this.getNodeParameter('fieldName', i) as string;
                                                const fieldValue = this.getNodeParameter('fieldValue', i) as string;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'POST',
                                                                url: 'https://app.nicochat.com.br/api/flow/bot-user-set-user-field-by-name',
                                                                body: { user_ns: userNs, field_name: fieldName, field_value: fieldValue },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        }
                                } else if (resource === 'flow') {
                                        if (operation === 'sendToSubscriber') {
                                                const userNs = this.getNodeParameter('userNs', i) as string;
                                                const flowName = this.getNodeParameter('flowName', i) as string;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'POST',
                                                                url: 'https://app.nicochat.com.br/api/flow/bot-user-send-sub-flow-by-flow-name',
                                                                body: { user_ns: userNs, flow_name: flowName },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'getMany') {
                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'GET',
                                                                url: 'https://app.nicochat.com.br/api/flow/sub-flows',
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        }
                                } else if (resource === 'broadcast') {
                                        if (operation === 'send') {
                                                const message = this.getNodeParameter('message', i) as string;
                                                const userNsList = this.getNodeParameter('userNsList', i) as string;

                                                const users = userNsList.split(',').map((u) => u.trim());

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'POST',
                                                                url: 'https://app.nicochat.com.br/api/flow/bot-user-broadcast',
                                                                body: { user_ns_list: users, content: message },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        } else if (operation === 'sendByTag') {
                                                const message = this.getNodeParameter('message', i) as string;
                                                const tagName = this.getNodeParameter('tagName', i) as string;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'POST',
                                                                url: 'https://app.nicochat.com.br/api/flow/bot-user-broadcast-by-tag',
                                                                body: { tag_name: tagName, content: message },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        }
                                } else if (resource === 'whatsappTemplate') {
                                        if (operation === 'send') {
                                                const userNs = this.getNodeParameter('userNs', i) as string;
                                                const templateName = this.getNodeParameter('templateName', i) as string;
                                                const templateParameters = this.getNodeParameter('templateParameters', i, '') as string;

                                                const body: IDataObject = {
                                                        user_ns: userNs,
                                                        template_name: templateName,
                                                };

                                                if (templateParameters) {
                                                        try {
                                                                body.parameters = JSON.parse(templateParameters);
                                                        } catch (error) {
                                                                throw new NodeOperationError(
                                                                        this.getNode(),
                                                                        'Template parameters must be valid JSON',
                                                                );
                                                        }
                                                }

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'POST',
                                                                url: 'https://app.nicochat.com.br/api/flow/bot-user-send-whatsapp-template',
                                                                body,
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        }
                                } else if (resource === 'conversation') {
                                        if (operation === 'getHistory') {
                                                const userNs = this.getNodeParameter('userNs', i) as string;
                                                const limit = this.getNodeParameter('limit', i) as number;

                                                const responseData = await this.helpers.httpRequestWithAuthentication.call(
                                                        this,
                                                        'nicoChatApi',
                                                        {
                                                                method: 'GET',
                                                                url: 'https://app.nicochat.com.br/api/flow/bot-user-chat-messages',
                                                                qs: { user_ns: userNs, limit },
                                                                json: true,
                                                        },
                                                );
                                                returnData.push(responseData as IDataObject);
                                        }
                                }
                        } catch (error) {
                                if (this.continueOnFail()) {
                                        returnData.push({ error: error.message });
                                        continue;
                                }
                                throw error;
                        }
                }

                return [this.helpers.returnJsonArray(returnData)];
        }
}
