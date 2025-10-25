# NicoChat n8n Custom Node - Project Documentation

## Project Overview

This is a custom n8n node for integrating with the NicoChat API (https://app.nicochat.com.br/api). The node provides comprehensive functionality for managing WhatsApp contacts, tags, custom fields, flows, broadcasts, templates, and conversation history.

## Project Status: ✅ Published to npm (v0.2.2)

Last updated: October 25, 2025

## What This Node Does

The NicoChat custom node allows n8n users to automate WhatsApp marketing and customer service workflows by connecting to the NicoChat platform. It provides:

- **Contact Management**: Create, update, delete, and search for contacts (subscribers)
- **Tag Management**: Organize contacts with tags for segmentation
- **Custom Fields**: Store and retrieve custom data for each contact
- **Flow Automation**: Send automated conversation flows to contacts
- **Mass Broadcasting**: Send messages to multiple contacts or tag groups
- **WhatsApp Templates**: Use approved WhatsApp templates for communication
- **Conversation History**: Access and analyze past conversations

## Architecture

### Technology Stack
- **Language**: TypeScript
- **Runtime**: Node.js 20
- **Framework**: n8n node development framework
- **Build Tool**: TypeScript compiler with watch mode
- **Linting**: ESLint
- **Formatting**: Prettier

### Project Structure
```
n8n-nodes-nicochat/
├── credentials/
│   └── NicoChatApi.credentials.ts    # API Key authentication
├── nodes/
│   └── NicoChat/
│       ├── NicoChat.node.ts          # Main node implementation (1107 lines)
│       ├── NicoChat.node.json        # Node metadata
│       └── nicochat.svg              # Node icon (64x64 SVG)
├── package.json                       # Project configuration
├── tsconfig.json                      # TypeScript settings
└── README.md                          # User documentation
```

## Implementation Details

### Node Type
**Programmatic Node** - Uses custom `execute` method for complex operations and dynamic dropdown support.

### Authentication
- Type: API Key (Bearer token)
- Header: `Authorization: Bearer {api_key}`
- Base URL: https://app.nicochat.com.br/api

### Resources Implemented

1. **Subscribers** (6 operations)
   - Get, Create, Update, Delete, Search (with 16 filters), Get Many (deprecated)
   
2. **Tags** (7 operations)
   - Add to Subscriber, Remove from Subscriber, Add Multiple Tags, Remove Multiple Tags, Create, Delete, Get Many
   - ⚠️ **No Update**: API doesn't support editing tags
   - ✨ Multi-tag operations support up to 20 tags in a single request
   
3. **Custom Fields** (2 operations)
   - Get Many, Set Field Value
   
4. **Flow** (2 operations)
   - Send to Subscriber, Get Many
   - ✨ Dynamic dropdown for flow selection
   
5. **Broadcast** (2 operations)
   - Send to Contacts, Send to Tags
   
6. **WhatsApp Templates** (2 operations)
   - Get Many, Send
   - ✨ Dynamic dropdown for template selection
   
7. **Conversation** (1 operation)
   - Get History (with date filters and pagination)

### Dynamic Features

The node implements **loadOptions** methods for dynamic dropdowns:
- `getFlows()` - Lists available flows for selection
- `getTemplates()` - Lists available WhatsApp templates for selection

This provides a better user experience by showing actual options instead of requiring users to type names manually.

## Development Configuration

### Build Workflow
- **Name**: Build
- **Command**: `npm run build:watch`
- **Status**: ✅ Running (0 errors)
- **Purpose**: Automatically compiles TypeScript on file changes

### Package Configuration
```json
{
  "name": "n8n-nodes-nicochat",
  "version": "0.1.0",
  "description": "n8n node for NicoChat API integration",
  "main": "index.js",
  "n8n": {
    "nodes": ["dist/nodes/NicoChat/NicoChat.node.js"],
    "credentials": ["dist/credentials/NicoChatApi.credentials.js"]
  }
}
```

## API Limitations & Design Decisions

### Known API Limitations
1. **No Tag Update**: NicoChat API doesn't provide an endpoint to update/rename tags
   - To "rename" a tag, users must create a new one and delete the old one
   - This limitation is documented in the README

### Design Decisions
1. **Programmatic vs Declarative**: Chose programmatic style because:
   - Need dynamic dropdowns based on user's actual data
   - Complex request/response handling required
   - Better control over error handling and data transformation

2. **Portuguese Language**: All operation descriptions and labels are in Portuguese because:
   - NicoChat is a Brazilian platform
   - Target users are primarily Portuguese speakers

3. **user_ns Identifier**: Used consistently across operations
   - This is NicoChat's unique identifier for contacts
   - Preferred over email for reliability

## Testing & Quality Assurance

### Build Status
✅ TypeScript compilation: 0 errors
✅ Code structure: Verified by architect
✅ API endpoint mapping: Complete and accurate
✅ Node metadata: Correct package identifier

### Required Testing (User must perform)
1. **End-to-end testing** in actual n8n instance
2. **API integration testing** with real NicoChat credentials
3. **Error handling validation** with edge cases
4. **Rate limiting behavior** verification

## User Preferences

*No specific user preferences recorded yet*

## Recent Changes

### October 25, 2025 - Version 0.2.2 Published to npm ✅
- ✅ **Enhancement**: Added dynamic dropdown for WhatsApp templates selection
- ✅ **Published to npm**: https://www.npmjs.com/package/n8n-nodes-nicochat
- New Features:
  - Created `getTemplates()` loadOptions method to fetch WhatsApp templates from API
  - Modified `templateName` field to use dynamic dropdown instead of text input
  - Users can now see all available templates with their languages (e.g., "welcome (pt_BR)")
  - Follows same pattern as flows and custom fields dropdowns

### October 25, 2025 - Version 0.2.1 Published to npm ✅
- ✅ **Fix**: Removed accents from operation names to fix n8n rendering issues
- ✅ **Published to npm**: https://www.npmjs.com/package/n8n-nodes-nicochat
- Changed operation names (descriptions kept in Portuguese):
  - "Adicionar Múltiplas Tags" → "Adicionar Multiplas Tags"
  - "Remover Múltiplas Tags" → "Remover Multiplas Tags"
  - "Definir Múltiplos Campos" → "Definir Multiplos Campos"
  - "Obter Histórico" → "Obter Historico"

### October 25, 2025 - Version 0.2.0 Published to npm
- ✅ **Published to npm**: https://www.npmjs.com/package/n8n-nodes-nicochat
- ✅ **New Search Operation**: Replaced "Get Many" with "Search Contacts" featuring 16 advanced filters:
  - Basic filters: name, phone, email
  - Channel filters: is_channel (WhatsApp/Instagram/Email/Telegram/SMS)
  - Opt-in filters: is_opt_in_email, is_opt_in_sms
  - Interaction filters: is_interacted_in_last_24h, is_bot_interacted_in_last_24h, is_last_message_in_last_24h
  - Advanced filters: tag_ns, label_id, event_ns, user_field_ns, user_field_value
  - Pagination: limit (1-100), page (1-1000)
- ✅ **Multi-Tag Operations**: Added bulk tag management (up to 20 tags per request):
  - Add Multiple Tags: Efficiently add multiple tags to a subscriber in one request
  - Remove Multiple Tags: Efficiently remove multiple tags from a subscriber in one request
- ✅ **Complete Portuguese Translation**: All operations, labels, and descriptions translated
- ✅ **API Endpoint Corrections**: Fixed all routes with proper /api/subscriber/ and /api/flow/ prefixes
- ✅ **Code Quality**: All lint errors fixed, n8n best practices compliance verified
- ✅ **Architect Review**: Implementation reviewed and approved

### October 24, 2025 - Version 0.1.7 Published
- ✅ Fixed all linting errors for npm publication
- ✅ Updated to official NicoChat icon (blue with white "N")
- ✅ Added Icon type import for credentials
- ✅ Fixed alphabetical ordering of all operation options
- ✅ Removed unused error variable
- ✅ Build: 0 errors, Lint: 0 errors

### Initial Implementation
- ✅ Set up Node.js 20 development environment
- ✅ Created project structure from n8n-nodes-starter
- ✅ Implemented all 7 resources with 19 total operations
- ✅ Added API Key credential configuration
- ✅ Configured build workflow with watch mode
- ✅ Created custom SVG icon for node

## Next Steps for User

### To Use This Node Locally:
1. Run `npm run build` to compile
2. Run `npm link` to create local package link
3. In n8n directory: `npm link n8n-nodes-nicochat`
4. Restart n8n

### To Publish to npm:
1. Create npm account if needed
2. Update version in package.json
3. Run `npm publish`
4. Users can install with: `npm install n8n-nodes-nicochat`

### To Submit for n8n Verification:
1. Publish to npm first
2. Test thoroughly in production
3. Submit via [n8n Creator Portal](https://creators.n8n.io/nodes)
4. Benefits: Available in n8n Cloud, verified badge, increased visibility

## Support & Resources

- **NicoChat API Docs**: https://app.nicochat.com.br/api
- **n8n Node Development**: https://docs.n8n.io/integrations/creating-nodes/
- **This Project's README**: See README.md for usage examples

## Notes

- This node uses TypeScript for type safety and better development experience
- All API requests use Bearer token authentication
- Error handling delegates to n8n's built-in HTTP request authentication helper
- Node is designed for Brazilian market (Portuguese language)
