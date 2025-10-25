# Contribuindo para n8n-nodes-nicochat

Obrigado pelo interesse em contribuir! Este é um projeto open-source e contribuições são bem-vindas.

## Como Contribuir

### Reportar Bugs

Se você encontrar um bug, por favor:

1. Verifique se o bug já não foi reportado nas [Issues](https://github.com/nicolaom/n8n-nodes-nicochat/issues)
2. Crie uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs comportamento atual
   - Versão do n8n e do node
   - Screenshots se aplicável

### Sugerir Melhorias

Para sugerir novas funcionalidades:

1. Abra uma [Issue](https://github.com/nicolaom/n8n-nodes-nicochat/issues) descrevendo:
   - A funcionalidade proposta
   - Por que seria útil
   - Como você imagina que funcionaria

### Contribuir com Código

1. **Fork o repositório**

2. **Clone seu fork**
   ```bash
   git clone https://github.com/seu-usuario/n8n-nodes-nicochat.git
   cd n8n-nodes-nicochat
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

4. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/minha-feature
   ```

5. **Faça suas alterações**
   - Siga o estilo de código existente
   - Mantenha os nomes de operações sem acentos (limitação do n8n)
   - Use português nas descrições e labels
   - Teste suas alterações

6. **Compile e teste**
   ```bash
   npm run build
   npm run lint
   ```

7. **Commit suas alterações**
   ```bash
   git add .
   git commit -m "feat: descrição da sua feature"
   ```

8. **Push para seu fork**
   ```bash
   git push origin feature/minha-feature
   ```

9. **Abra um Pull Request**
   - Descreva claramente o que foi alterado
   - Referencie issues relacionadas se houver

## Padrões de Código

### Convenções de Commit

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

### Estrutura de Código

- Operações no arquivo `nodes/NicoChat/NicoChat.node.ts`
- Triggers no arquivo `nodes/NicoChat/NicoChatTrigger.node.ts`
- Credenciais no arquivo `credentials/NicoChatApi.credentials.ts`

### Testes

Antes de submeter um PR, certifique-se de que:

- O código compila sem erros: `npm run build`
- O linter passa sem warnings: `npm run lint`
- Você testou a funcionalidade em uma instância n8n local

## Desenvolvimento Local

### Configurar n8n para desenvolvimento

1. **Link o node localmente**
   ```bash
   npm link
   ```

2. **Na pasta do n8n**
   ```bash
   npm link n8n-nodes-nicochat
   ```

3. **Inicie o n8n em modo desenvolvimento**
   ```bash
   n8n start
   ```

4. **Para recompilar automaticamente**
   ```bash
   npm run build:watch
   ```

### Testar com NicoChat

Você precisará de:
- Uma conta NicoChat (https://app.nicochat.com.br)
- Uma API Key (Settings > API)
- Contatos de teste

## Recursos Úteis

- [Documentação n8n](https://docs.n8n.io/)
- [Criar Custom Nodes n8n](https://docs.n8n.io/integrations/creating-nodes/)
- [API NicoChat](https://app.nicochat.com.br/api)

## Código de Conduta

- Seja respeitoso e construtivo
- Foque no problema, não nas pessoas
- Aceite críticas construtivas
- Ajude a criar uma comunidade acolhedora

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a licença MIT do projeto.

## Dúvidas?

Abra uma [Issue](https://github.com/nicolaom/n8n-nodes-nicochat/issues) com a tag `question`.
