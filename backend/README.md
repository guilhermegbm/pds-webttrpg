# **webttrpg backend**

## **Descrição**
<p>Essa projeto tem como objetivo executar todas as ações referente ao jogo de rpg <b>webttrpg</b></p>

## **Pré-requisitos**
Antes de começar, você deve ter instalado em seu ambiente o [docker](https://docs.docker.com/engine/install) e o [docker-compose](https://docs.docker.com/compose/install/other/)

Para instalar o <b>docker-compose</b> no <b>LINUX</b>, basta seguir os seguintes passos:
```bash
# Faz download e instala o docker compose
curl -SL https://github.com/docker/compose/releases/download/v2.16.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose

# Define permissões
sudo chmod +x /usr/local/bin/docker-compose

# Verifica instalação
sudo docker-compose --version
```

## **Executando o projeto**
<p>Nosso ambiente foi construído baseado em docker.</p>

### **Executando local**
<p>Na pasta raiz do projeto <b>(backend)</b>, execute um único comando para subir o servidor backend.</p>

```bash
docker-compose up
```
Pronto, servidor inicializado. Veja em: http:/localhost:3000

Para finalizar a aplicação, basta rodar o comando:
```bash
docker-compose down
```

### **Executando local modo DEV**
<p>A execução em modo DEV é um pouco diferente, deve-se informar qual a o arquivo docker-compose.yml específico, que no nosso caso é <b>docker-compose-DEV.yml</b></p>
<p>Basta executar da seguinte forma:</p>

```bash
docker-compose -f docker-compose-DEV.yml up
```
Pronto, servidor inicializado. Veja em: http:/localhost:3000

Para finalizar a aplicação, basta rodar o comando:
```bash
docker-compose down
```

# **Comando úteis docker-compose**
<ul>
    <li><b>docker-compose up</b>: cria e inicia os contêineres.</li>
    <li><b>docker-compose build</b>: realiza apenas a etapa de build das imagens que serão utilizadas.</li>
    <li><b>docker-compose logs</b>: visualiza os logs dos contêineres.</li>
    <li><b>docker-compose restart</b>: reinicia os contêineres.</li>
    <li><b>docker-compose ps</b>: lista os contêineres.</li>
    <li><b>docker-compose scale</b>: permite aumentar o número de réplicas de um contêiner.</li>
    <li><b>docker-compose start</b>: inicia os contêineres.</li>
    <li><b>docker-compose stop</b>: paralisa os contêineres.</li>
    <li><b>docker-compose down</b>: paralisa e remove todos os contêineres e seus componentes como rede, imagem e volume.</li>
</ul>
