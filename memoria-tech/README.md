# Memória Tech — Computação em Libras

Jogo em React, TypeScript e Tailwind CSS. Não utiliza emojis nem sinais fictícios.

## Executar

```bash
npm install
npm run dev
```

Abra o endereço informado pelo Vite (normalmente http://localhost:5173).

## Cadastrar sinais reais

1. Grave ou obtenha, com autorização, vídeos dos 12 sinais em Libras, com revisão de pessoa fluente na língua.
2. Coloque os arquivos MP4 em `public/libras/` (crie a pasta).
3. No arquivo `src/App.tsx`, no array `ITEMS`, acrescente `video:'/libras/computador.mp4'` ao objeto correspondente, e repita para os demais.
4. Desative **modo demonstração** na tela de preparação para jogar apenas com sinais validados. O nível exige 4, 8 ou 12 vídeos cadastrados.

**Atenção:** as cartas de demonstração apresentam um personagem genérico e a mensagem "SIMULAÇÃO — SEM SINAL". Elas testam as regras do jogo, mas **não ensinam Libras**. A versão pedagógica depende de vídeos reais validados. O personagem não executa gestos inventados.

## Recursos

- 3 níveis: 4, 8 e 12 pares
- Modo individual e de 2 a 4 equipes
- Placar, alternância de turnos e reinício
- Pares exigem componente + carta de Libras
- Vídeos com controles e opção de repetir
- Erros permanecem abertos até o botão Continuar
- Acessibilidade: contraste, redução de movimento, teclado e tela cheia
- Ilustrações padronizadas por ícones vetoriais Lucide

## Observação de acessibilidade

A interface contém português curto e pictogramas, mas vídeos de instrução e boas-vindas ainda precisam ser produzidos para uma experiência realmente bilíngue. Teste a aplicação com estudantes surdos e profissionais de Libras antes de utilizá-la como material didático definitivo.
