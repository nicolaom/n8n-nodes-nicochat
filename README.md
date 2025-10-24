# n8n-nodes-nicochat

Custom n8n node para integração com a API NicoChat (https://app.nicochat.com.br/api).

## Instalação

### Opção 1: Via npm (quando publicado)
```bash
npm install n8n-nodes-nicochat
```

### Opção 2: Instalação local para desenvolvimento

1. Clone o repositório e instale as dependências:
```bash
npm install
```

2. Compile o node:
```bash
npm run build
```

3. Crie um link npm:
```bash
npm link
```

4. No diretório da sua instância n8n:
```bash
npm link n8n-nodes-nicochat
```

5. Reinicie o n8n para carregar o novo node.

## Configuração

### Credenciais

O node usa autenticação via API Key:

1. Acesse https://app.nicochat.com.br/api e obtenha sua chave de API
2. No n8n, crie uma nova credencial "NicoChat API"
3. Insira sua API Key

## Recursos Disponíveis

### 1. Subscribers (Contatos)

Gerenciamento completo de contatos/assinantes:

- **Get** - Buscar um contato específico por user_ns ou email
- **Create** - Criar novo contato com nome, telefone e email
- **Update** - Atualizar dados de contato existente
- **Delete** - Remover um contato
- **Get Many** - Listar contatos com paginação e filtros

### 2. Tags

Gerenciamento de tags para organização de contatos:

- **Add to Subscriber** - Adicionar tag a um contato
- **Remove from Subscriber** - Remover tag de um contato
- **Create** - Criar nova tag
- **Delete** - Deletar tag existente
- **Get Many** - Listar tags com filtros

**Nota:** A API NicoChat não suporta edição/atualização de tags. Para "renomear" uma tag, é necessário criar uma nova e deletar a antiga.

### 3. Custom Fields (Campos Personalizados)

Gerenciamento de campos customizados:

- **Get Many** - Listar todos os campos personalizados disponíveis
- **Set Field Value** - Definir valor de campo personalizado para um contato

### 4. Flow (Fluxos)

Envio e gerenciamento de fluxos:

- **Send to Subscriber** - Enviar fluxo específico para um contato
- **Get Many** - Listar fluxos disponíveis

O campo Flow Name possui dropdown dinâmico que lista automaticamente os fluxos disponíveis.

### 5. Broadcast

Disparos em massa de mensagens:

- **Send to Contacts** - Enviar broadcast para lista de contatos (user_ns)
- **Send to Tags** - Enviar broadcast para contatos com tags específicas

### 6. WhatsApp Templates

Gerenciamento de templates WhatsApp:

- **Get Many** - Listar templates WhatsApp disponíveis
- **Send** - Enviar template WhatsApp para um contato

O campo Template possui dropdown dinâmico que lista automaticamente os templates disponíveis.

### 7. Conversation (Histórico)

Acesso ao histórico de conversas:

- **Get History** - Obter histórico de conversa de um contato com filtros de data e paginação

## Estrutura do Projeto

```
n8n-nodes-nicochat/
├── credentials/
│   └── NicoChatApi.credentials.ts    # Configuração de autenticação
├── nodes/
│   └── NicoChat/
│       ├── NicoChat.node.ts          # Implementação principal do node
│       ├── NicoChat.node.json        # Metadados do node
│       └── nicochat.svg              # Ícone do node
├── package.json                       # Configurações e dependências
└── tsconfig.json                      # Configurações TypeScript
```

## Desenvolvimento

### Scripts disponíveis

- `npm run build` - Compila o TypeScript
- `npm run build:watch` - Compila com watch mode (detecta mudanças)
- `npm run lint` - Verifica código com ESLint
- `npm run format` - Formata código com Prettier
- `npm run dev` - Inicia n8n com o node carregado

### Build

O projeto está configurado com build automático via workflow. Qualquer alteração nos arquivos TypeScript será automaticamente compilada.

## Exemplos de Uso

### Criar novo contato e adicionar tag

1. **Node NicoChat** - Resource: Subscriber, Operation: Create
   - Name: "João Silva"
   - Phone: "5511999999999"
   - Email: "joao@example.com"

2. **Node NicoChat** - Resource: Tag, Operation: Add to Subscriber
   - User NS: `{{ $json.user_ns }}` (do node anterior)
   - Tag Name: "Cliente VIP"

### Enviar fluxo para contatos com tag específica

1. **Node NicoChat** - Resource: Broadcast, Operation: Send to Tags
   - Tags: "Cliente VIP"
   - Message: "Sua mensagem aqui"

### Atualizar campo personalizado

1. **Node NicoChat** - Resource: Custom Field, Operation: Set Field Value
   - User NS: "user_ns_do_contato"
   - Field Name: "ultima_compra"
   - Field Value: "2025-10-24"

### Obter histórico de conversa

1. **Node NicoChat** - Resource: Conversation, Operation: Get History
   - User NS: "user_ns_do_contato"
   - Options:
     - Date From: "2025-10-01"
     - Date To: "2025-10-24"
     - Limit: 50

## Limitações

- **Tag Edit**: A API NicoChat não suporta atualização/edição de tags. Para renomear, é necessário criar nova tag e deletar a antiga.

## Mapeamento de Endpoints

| Recurso | Operação | Método | Endpoint |
|---------|----------|--------|----------|
| Subscribers | Get | GET | `/flow/bot-user-get` |
| Subscribers | Create | POST | `/flow/create-bot-user` |
| Subscribers | Update | POST | `/flow/update-bot-user` |
| Subscribers | Delete | DELETE | `/flow/delete-bot-user` |
| Subscribers | Get Many | GET | `/flow/bot-users` |
| Tags | Add to Subscriber | POST | `/flow/bot-user-add-tag-by-name` |
| Tags | Remove from Subscriber | POST | `/flow/bot-user-remove-tag-by-name` |
| Tags | Create | POST | `/flow/create-tag` |
| Tags | Delete | DELETE | `/flow/delete-tag-by-name` |
| Tags | Get Many | GET | `/flow/tags` |
| Custom Fields | Get Many | GET | `/flow/user-fields` |
| Custom Fields | Set Field Value | POST | `/flow/bot-user-set-user-field-by-name` |
| Flow | Send to Subscriber | POST | `/flow/bot-user-send-sub-flow-by-flow-name` |
| Flow | Get Many | GET | `/flow/sub-flows` |
| Broadcast | Send to Contacts | POST | `/flow/broadcast-many-bot-users` |
| Broadcast | Send to Tags | POST | `/flow/broadcast-tag` |
| WhatsApp Templates | Get Many | GET | `/flow/whatsapp-templates` |
| WhatsApp Templates | Send | POST | `/flow/send-whatsapp-template` |
| Conversation | Get History | GET | `/flow/bot-user-conversation` |

## Suporte

Para dúvidas sobre a API NicoChat, consulte a documentação oficial em https://app.nicochat.com.br/api

## Licença

MIT
