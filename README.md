# Portfólio — Ruan Pablo

Meu portfólio como desenvolvedor full-stack júnior, feito como o começo de um jogo: você conversa com a PixelArt do Ruan, escolhe o que quer ver e ele acompanha a visita pelo portfólio.

**Site:** novo-portfolio-sigma-nine.vercel.app

![Prévia do portfólio](public/site.png)

## O que tem no projeto:

- **Conversa de abertura** com caixa de diálogo estilo RPG, texto digitado e as escolhas ("Sou recrutador", "Sou dev, quero ver o código").
- **Assistente em pixel art:** o personagem pula do topo para o canto da tela ao rolar e explica cada seção do portfólio.
- **Diário de bordo:** um pergaminho com a minha trajetória até aqui.
- **Projetos** em lista expansível, com tecnologias e a estrutura de arquivos.
- **Tema secreto:** o código Konami (↑ ↑ ↓ ↓ ← → ← → B A) ou o botão "Modo vermelho" no rodapé que troca as cores de fundo do portfólio.
- **Som opcional** na digitação (desligado por padrão).

## Tecnologias:

React, TypeScript, Vite e Motion. CSS puro com variáveis (sem biblioteca de estilos). Publicado na Vercel.

## Decisões:

- **Acessibilidade:** navegação por teclado, link "Pular para o conteúdo", `aria-live` nas falas, foco visível, alvos de toque de 44 px e respeito a `prefers-reduced-motion`.
- **Celular primeiro:** o menu vira uma barra fixa embaixo da tela, ao alcance do polegar.
- **Desempenho:** Lighthouse no mobile (medido localmente): Performance 84, Acessibilidade 100, Boas práticas 100, SEO 92.
- **Sem dependência de som ou animação:** tudo funciona com o som desligado e com movimento reduzido.

## Rodar no seu computador:

```bash
git clone https://github.com/Rp-1177/new-portfolio.git
cd portfolio-rp
npm install
npm run dev
```

Para testar a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura:

```
src/
  components/   Hero, About, Projects, Games, Contact, Assistant, Journal, Motes, Pixel, ThemeButton
  hooks/        useTypewriter, useSpeaker, useActiveSection
  data/         content.ts (todos os textos e projetos)
  lib/          sound.ts (som da digitação)
public/         imagens do personagem, ícones e og.png
```

Os textos ficam em `src/data/content.ts`, então dá para reaproveitar o projeto trocando só esse arquivo.

## Contato:

- GitHub: [@Rp-1177](https://github.com/Rp-1177)
- LinkedIn: https://linkedin.com/in/rp1177
- E-mail: rpnascimento1177@gmail.com

---
