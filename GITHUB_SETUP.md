# 🚀 Publicar no GitHub

Este guia mostra como publicar o projeto no GitHub para torná-lo open-source.

## Passo 1: Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Configure o repositório:
   - **Repository name**: `n8n-nodes-nicochat`
   - **Description**: `n8n node para integração com a API do NicoChat`
   - **Visibility**: ✅ **Public** (para ser open-source)
   - **NÃO** inicialize com README (já temos um)
3. Clique em **Create repository**

## Passo 2: Conectar o Repositório Local ao GitHub

O Git já está configurado no Replit. Você só precisa adicionar o remote do GitHub:

```bash
git remote add origin https://github.com/nicolaom/n8n-nodes-nicochat.git
```

## Passo 3: Fazer o Primeiro Push

```bash
git push -u origin main
```

Se você usar SSH, o comando seria:

```bash
git remote add origin git@github.com:nicolaom/n8n-nodes-nicochat.git
git push -u origin main
```

## Passo 4: Verificar

Após o push, acesse:
- Repositório: https://github.com/nicolaom/n8n-nodes-nicochat
- Issues: https://github.com/nicolaom/n8n-nodes-nicochat/issues

## Passo 5: Configurar o Repositório (Opcional mas Recomendado)

### Adicionar Topics

Em https://github.com/nicolaom/n8n-nodes-nicochat, clique em ⚙️ (engrenagem) ao lado de **About** e adicione topics:

- `n8n`
- `n8n-nodes`
- `nicochat`
- `whatsapp`
- `automation`
- `nodejs`
- `typescript`

### Adicionar Descrição

Na mesma seção, adicione:
- **Description**: `n8n node para integração com a API do NicoChat - Automação de WhatsApp`
- **Website**: `https://www.npmjs.com/package/n8n-nodes-nicochat`

### Habilitar Issues

Em **Settings** > **Features**, certifique-se de que **Issues** está habilitado.

## Atualizações Futuras

Sempre que fizer mudanças:

```bash
# As mudanças já são commitadas automaticamente pelo Replit
# Você só precisa fazer push
git push
```

## Criar uma Release no GitHub

Quando publicar uma nova versão no npm:

1. Acesse https://github.com/nicolaom/n8n-nodes-nicochat/releases/new
2. Clique em **Choose a tag** e digite: `v0.3.1` (ou a versão atual)
3. **Release title**: `v0.3.1 - Correção de URL do repositório`
4. **Description**:
   ```markdown
   ## 🔧 Correções
   - Corrigida URL do repositório GitHub no package.json
   - Adicionado campo bugs para reportar issues
   
   ## 📦 Instalação
   \`\`\`bash
   npm install n8n-nodes-nicochat
   \`\`\`
   
   ## 🔗 Links
   - npm: https://www.npmjs.com/package/n8n-nodes-nicochat
   - Documentação: Ver README.md
   ```
5. Clique em **Publish release**

## Status Atual

✅ **Versão 0.3.1 publicada no npm**
- npm: https://www.npmjs.com/package/n8n-nodes-nicochat
- GitHub: Aguardando push inicial

## Próximos Passos

Após publicar no GitHub, considere:

1. **Adicionar badge no README**:
   ```markdown
   [![npm version](https://badge.fury.io/js/n8n-nodes-nicochat.svg)](https://www.npmjs.com/package/n8n-nodes-nicochat)
   [![GitHub issues](https://img.shields.io/github/issues/nicolaom/n8n-nodes-nicochat)](https://github.com/nicolaom/n8n-nodes-nicochat/issues)
   [![GitHub stars](https://img.shields.io/github/stars/nicolaom/n8n-nodes-nicochat)](https://github.com/nicolaom/n8n-nodes-nicochat/stargazers)
   [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
   ```

2. **Criar GitHub Actions** para CI/CD (build e lint automáticos)

3. **Adicionar CHANGELOG.md** para documentar mudanças

4. **Criar templates de Issues** para bugs e features

## Precisa de Ajuda?

Se tiver problemas com git ou GitHub, abra uma issue no Replit ou consulte:
- [GitHub Docs](https://docs.github.com/)
- [Git Documentation](https://git-scm.com/doc)
