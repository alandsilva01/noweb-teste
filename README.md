# NowSearch

Projeto de teste Front-End (vaga Jr) — React + TypeScript + SCSS Modules

## Objetivo
- Página simples baseada no layout enviado (Figma). 
- Modal de busca de CEP integrada com ViaCEP (/ws/{cep}/json). 
- Campos preenchidos automaticamente e bloqueados para edição.
- Projeto pronto para deploy na Vercel.

## Tecnologias
- React + TypeScript (Vite)
- SCSS (Sass) com modules
- API pública ViaCEP

## Como rodar localmente
1. Instalar dependências:
```bash
npm install
```
2. Rodar ambiente de desenvolvimento:
```bash
npm run dev
```
3. Build para produção:
```bash
npm run build
npm run preview
```

## Observações
- Nome do projeto: NowSearch
- Arquitetura componentizada em `src/components`.

## Deploy na Vercel
- Conecte o repositório ao Vercel (deploy automático ao push em `main`).
- Certifique-se que o comando de build é `npm run build`.