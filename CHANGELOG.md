# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.4.0] - 2025-10-25

### Adicionado
- **Parâmetros completos do webhook** (iguais ao webhook padrão do n8n):
  - HTTP Method (POST, GET, PUT, DELETE, PATCH, HEAD)
  - Path customizável
  - Authentication (None)
  - Respond mode (Immediately, When Last Node Finishes, Using Respond to Webhook Node)
  - Response Code (100-599)
  - Response Data (All Entries, First Entry JSON, First Entry Binary, No Response Body)
  - Response Headers customizados

### Melhorado
- Interface idêntica ao webhook nativo do n8n
- Trigger muito mais flexível e configurável
- Compatível com Test URL e Production URL

## [0.3.3] - 2025-10-25

### Mudado
- **BREAKING CHANGE**: Trigger simplificado para apenas receber requisições
- Removidos filtros de eventos do trigger (não eram necessários)
- Removidas opções avançadas (resposta customizada, validação de origem)
- Nome alterado para "Requisicao Externa NicoChat Trigger" (sem acento, conforme padrão n8n)

### Melhorado
- Trigger muito mais simples e direto de usar
- Apenas mostra a URL do webhook e recebe os dados (body, headers, query)
- Código reduzido de 182 para 61 linhas

## [0.3.2] - 2025-10-25

### Adicionado
- Badges no README (npm version, license, n8n community node)
- Arquivo CONTRIBUTING.md com guia completo para contribuidores open-source
- Arquivo GITHUB_SETUP.md com instruções detalhadas de publicação no GitHub
- Arquivo .gitattributes para normalização de line endings
- CHANGELOG.md completo com histórico de todas as versões

### Melhorado
- Documentação README com seção open-source destacada
- Limpeza de arquivos temporários em attached_assets

## [0.3.1] - 2025-10-25

### Corrigido
- URL do repositório GitHub corrigida de `nicochat` para `nicolaom` no package.json
- Adicionado campo `bugs` apontando para GitHub Issues

### Adicionado
- Arquivo CONTRIBUTING.md com guia para contribuidores
- Arquivo GITHUB_SETUP.md com instruções para publicar no GitHub
- Badges no README.md (npm version, license, n8n)
- Arquivo .gitattributes para normalização de line endings

## [0.3.0] - 2025-10-25

### Adicionado
- **NicoChat Trigger Node** (webhook trigger) - Feature principal
  - Endpoint webhook para receber eventos do NicoChat
  - Filtro de eventos (mensagem recebida, tag adicionada, campo atualizado, etc.)
  - Resposta customizada ao NicoChat
  - Validação de origem opcional
- Documentação completa do trigger no README.md

### Casos de Uso
- Workflows disparados automaticamente por eventos no NicoChat
- Integração bidirecional entre n8n e NicoChat
- Automação baseada em eventos

## [0.2.2] - 2025-10-25

### Adicionado
- Dropdown dinâmico para seleção de WhatsApp Templates
- Método `getTemplates()` usando POST /whatsapp-template/list
- Mapeamento de templates com nome, idioma e categoria

### Melhorado
- Experiência do usuário ao enviar templates WhatsApp

## [0.2.1] - 2025-10-24

### Corrigido
- Problema de renderização no n8n causado por acentos nos nomes de operações
- Removidos acentos de todos os campos `name` das operações
- Mantidos acentos nas descrições (displayName e description)

### Afetado
- Todas as operações agora usam nomes sem acento (ex: "Obter Historico" em vez de "Obter Histórico")

## [0.2.0] - 2025-10-24

### Adicionado
- Suporte a múltiplas tags em uma única operação
  - `Add Multiple Tags to Subscriber` - até 20 tags
  - `Remove Multiple Tags from Subscriber` - até 20 tags
- Validação de limite de 20 tags por requisição

### Melhorado
- Documentação sobre limitações de tags
- Exemplos de uso de operações com múltiplas tags

## [0.1.0] - 2025-10-24

### Adicionado
- Node NicoChat com 7 recursos principais:
  1. **Subscribers** - Get, Create, Update, Delete, Search, Get Many
  2. **Tags** - Add, Remove, Add Multiple, Remove Multiple, Create, Delete, Get Many
  3. **Custom Fields** - Get Many, Set Field Value
  4. **Flow** - Send to Subscriber, Get Many (com dropdown dinâmico)
  5. **Broadcast** - Send to Contacts, Send to Tags
  6. **WhatsApp Templates** - Get Many, Send
  7. **Conversation** - Get History (com filtros de data e paginação)

- Credenciais NicoChat API com autenticação Bearer token
- Ícone customizado do NicoChat
- Documentação completa em português

### Recursos Dinâmicos
- Dropdown de flows carregado dinamicamente da API
- Filtros avançados de busca de subscribers (16 filtros)
- Paginação em todas as operações que listam dados

### Limitações Conhecidas
- API não suporta atualização de tags (workaround: criar nova e deletar antiga)
- Operação "Get Many" de subscribers marcada como deprecated

---

## Links

- [npm](https://www.npmjs.com/package/n8n-nodes-nicochat)
- [GitHub](https://github.com/nicolaom/n8n-nodes-nicochat)
- [Documentação NicoChat API](https://app.nicochat.com.br/api)
