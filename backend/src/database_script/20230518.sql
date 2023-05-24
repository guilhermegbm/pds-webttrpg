-- Define estruturas para o chat
create table webttrpg.message (
    id varchar(100) primary key not null,
    message varchar not null,
    user_id varchar(100) not null,
    game_id varchar(100) not null,
    created_at timestamp not null,
    constraint message_user_fk foreign key (user_id) references webttrpg.user(id),
    constraint message_game_fk foreign key (game_id) references webttrpg.game(id)
);

create table webttrpg.game_user (
    user_id varchar(100) not null,
    game_id varchar(100) not null,
    created_at timestamp not null,
    constraint game_user_user_fk foreign key (user_id) references webttrpg.user(id),
    constraint game_user_game_fk foreign key (game_id) references webttrpg.game(id),
    unique(user_id, game_id)
);

-- Insere dados para teste do chat
insert into webttrpg.user (id, username, password) values ('fbd5c2c3-d733-4d2e-9d31-253f9efcfed5', 'lucas', '$2b$10$qYSQMLvZGEhVzBSMekVZyuuLEsHmv2551f1/J8vDOrhWwcoYlS.Jy');
insert into webttrpg.user (id, username, password) values ('62ca2512-2f78-4bb2-84a5-e5d8bca0d660', 'camila', '$2b$10$6C7RgblXokef69B7TXvMN.H4J9m78ooRb6moKhHVfKl16whD9rrlS');
insert into webttrpg.game (id, name, maximum_players, description, user_id) values ('bb927da9-b9db-4c90-a0b8-1dfb4420d32e', 'jogo chat', 10, 'descrição jogo chat', 'fbd5c2c3-d733-4d2e-9d31-253f9efcfed5');
insert into webttrpg.game_user (user_id, game_id, created_at) values ('fbd5c2c3-d733-4d2e-9d31-253f9efcfed5', 'bb927da9-b9db-4c90-a0b8-1dfb4420d32e', '2023-05-23 03:09:05.216');
insert into webttrpg.game_user (user_id, game_id, created_at) values ('62ca2512-2f78-4bb2-84a5-e5d8bca0d660', 'bb927da9-b9db-4c90-a0b8-1dfb4420d32e', '2023-05-23 03:09:05.216');
