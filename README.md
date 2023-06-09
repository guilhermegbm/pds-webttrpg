# Dragon's Den (VTT)
**Equipe**:
  - João Vitor Tavares de Almeida Trindade (FrontEnd Dev)
  - Guilherme Barboza (FullStack Dev)
  - Lucas Campos (BackEnd Dev)
  - Ábner de Marcos Neves (FrontEnd Dev)

**Escopo**: Sistema Web que permite que jogadores se reúnem para jogar um jogo de RPG tabletop de forma online.

**Tecnologias**: 
  - FrontEnd:
    - VueJS
  - BackEnd:
    - NodeJS
    - TypeScript
    - Docker
  - BD:
    - PostgreSQL
  
**Backlog do produto**


1. Como usuário que ainda não tem conta, eu desejo fazer sign up no sistema e criar a minha conta.
2. Como usuário, eu desejo fazer login na minha conta.
3. Como usuário, eu desejo ver um dashboard com uma listagem de todos os meus jogos, abertos ou finalizados.
4. Como usuário, quero listar jogos públicos disponíveis.
5. Como usuário, quero criar um jogo novo com nome, número máximo de  jogadores, descrição e me tornar GM desse jogo.
6. Como usuário, quero entrar em um jogo já criado e me tornar um jogador desse Jogo.
7. Como GM, quero criar fichas de personagem/inimigos.
8. Como jogador, eu quero configurar a ficha que foi atribuída a mim.
9. Como GM, durante o jogo, quero criar tokens dos personagens/inimigos e colocá-los em um mapa.
10.  Como Jogador ou GM, eu quero mover meus tokens pelo mapa.
11.  Como Jogador ou GM, eu quero mandar mensagens públicas no chat.
12.  Como jogador ou GM, eu quero rolar dados.
13. Como GM quero adicionar mapa em alguma cena.
14. Como jogador ou GM, eu quero mandar mensagens privadas (whisper) para um jogador ou GM pelo Chat.
15. Como GM quero poder criar cenas novas.
16. Como GM quero configurar as cenas em algum jogo.
17. Como sistema, desejo alertar os usuários de um jogo que está prestes a começar, enviando-lhes um email de aviso.
18. Como sistema, desejo alertar os usuários via email quando seu pedido de acesso a algum jogo é aceito.
19. Como sistema, desejo alertar ao GM via email quando um usuário envia um pedido de acesso a um jogo.

**Sprint #2**
1. Como usuário que ainda não tem conta, eu desejo fazer sign up no sistema e criar a minha conta.
- [x] Implementar tela com formulário de cadastro (Ábner)
- [x] Integrar tela com API do backend (Ábner)
- [x] Implementar caso de uso e api rest para o cadastro (Lucas)
- [x] Modelar tabela/entidade e salvar dados no banco (Guilherme)
 
2. Como usuário, eu desejo fazer login na minha conta.
- [x] Implementar tela com formulário de login (Ábner)
- [x] Integrar tela com api do backend (Ábner)
- [x] Implementar caso de uso e api rest de autenticação no back (Lucas)
- [x] Implementar geração de token de autenticação (Guilherme e Lucas)
- [x] Implementar middleware para verificação de token de autenticação (Lucas)


3. Como usuário, eu desejo ver um dashboard com uma listagem de todos os meus jogos, abertos ou finalizados.
- [x] Implementar caso de uso que retorna todos os jogos de um usuário (Lucas e Guilherme)
- [x] Disponibilizar api rest para retornar lista de jogos (Lucas)
- [x] Implementar tela de dashboard (Guilherme)
- [x] Integrar tela com API do backend (Guilherme)


4. Como usuário, quero listar jogos públicos disponíveis.
- [x] Implementar caso de uso que retorna todos os jogos públicos (Lucas e Guilherme)
- [x] Implementar api rest para retornar os jogos públicos. (Lucas)
- [x] Implementar na tela de dashboard uma aba de jogos públicos (Guilherme)
- [x] Integrar tela com API do backend (Guilherme)


5. Como usuário, quero criar um jogo novo com nome, número máximo de jogadores, descrição e me tornar GM desse jogo.
- [x] Implementar tela com formulário de criação de jogo (João)
- [x] Implementar API para criar novos jogos (Lucas)
- [x] Integrar tela com APi do backend (João)


6. Como usuário, quero entrar em um jogo já criado e me tornar um jogador desse Jogo:
- [x] Implementar Modal para ver informações do jogo (João)
- [x] Implementar caso de uso no backend: Atualizar lista de jogadores inclusos no Jogo (Lucas)
- [x] Integrar tela com API do backend (Guilherme)


7. Como GM, quero criar fichas de personagem/inimigos:
- [x] Implementar Modal para criação de fichas (Ábner)
- [x] Criar um layout de ficha básico (João)
- [x] Integrar com API para salvar fichas e pessoas atribuídas (João)
- [x] Implementar funcionalidade no backend para salvar fichas no banco (Lucas)


8. Como jogador, eu quero configurar a ficha que foi atribuída a mim
- [x] Implementar caso de uso para configurar ficha do jogador (Lucas)
- [x] Implementar api rest que acionará o caso de uso (Lucas)
- [x] Implementar tela com campos da ficha (Ábner)
- [x] Integrar API para editar e salvar alterações na ficha (Ábner)


9. Como GM, durante o jogo, quero criar tokens dos personagens/inimigos e colocá-los em um mapa:
- [x] Criar campo que permite upload de imagem para o token (João)
- [x] Integrar upload com API do backend (João)
- [x] Implementar repositório para upload de imagens dos personagens  (Lucas)
- [x] Implementar api rest para receber uma imagem e salvar no repositório (Lucas)


10.  Como Jogador ou GM, eu quero mover meus tokens pelo mapa:
- [x] Implementar movimentação de tokens por setas direcionais (João)
- [x] Implementar busca periódica da posição dos tokens dos outros personagens, inimigos e objetos (João)
- [ ] Implementar caso de uso no backend para atualizar e salvar a nova posição do token (Guilherme)
- [ ] Implementar caso de uso no backend para buscar a posição dos outros personagens, inimigos e objetos (Guilherme)


11.  Como Jogador ou GM, eu quero mandar mensagens públicas no chat:
- [x] Criar layout do chat (Ábner)
- [x] Periodicamente atualizar o chat com novas mensagens (João)
- [x] Implementar chat no backend por jogo (Lucas)


12.  Como jogador ou GM, eu quero rolar dados.
- [x] Criar comandos específicos para rolar dados no chat (João)
- [x] Chamar api do backend de rolar dados e receber o resultado (Ábner)
- [x] Implementar caso de uso para ação de rolar os dados (Lucas)
- [x] Implementar api rest para executar a ação de rolar os dados (Guilherme)


13. Como GM quero adicionar mapa em alguma cena.
- [x] Implementar layout para permitir o upload de imagens (Ábner)
- [x] Integrar upload com backend (Ábner)
- [x] Implementar repositório para upload de mapas (Lucas)

# Arquitetura do projeto

A estrutura do projeto segue uma arquitetura Hexagonal mesclada com princípios de DDD, onde as pastas e pacotes mais altos na hierarquia segmentam os múltiplos domínios do sistema e, para cada domínio, a estrutura se divide para seguir os princípios da arquitetura hexagonal, incluindo adaptadores, portas de saída e classes do domínio (Entidades e classes de Regra de Negócio).

Mais especificamente, o projeto possui atualmente três domínios principais:

Game - que engloba todas as funcionalidades referentes a jogo, como a criação e listagem dos Jogos e o gerenciamento das fichas, tokens e jogadores.

User - que implementa as funções associadas aos usuários do sistema, por exemplo, as funcionalidades de sign-up, sign-in, "esqueci minha senha", etc.

Chat - que agrupa as operações realizadas sobre o chat, como o envio de mensagens, a busca/recebimento de mensagens, o tratamento da rolagem de dados, entre outras.

Para cada domínio, implementamos uma sub Arquitetura Hexagonal com um pacote "application", que contém todas as classes com a Regra de Negócio daquele domínio, um pacote "entity", que armazena todas as entidades relacionadas àquele domínio, um pacote repository, que define as Interfaces (portas de saída) necessárias para conexão ao banco de dados, e um pacote "infra" que contém toda a implementação de repositórios (Adaptadores que implementam as portas de saída), de classes Rest (Adaptadores de conexão HTTP) e de classes utilitárias que usam alguma tecnologia específica.
