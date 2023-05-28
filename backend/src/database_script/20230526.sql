-- Define estruturas para a ficha do jogo

create table webttrpg.game_chip (
	id varchar(100) primary key not null,
	name varchar(100) not null,
	level varchar(100) null,
	class varchar(100) null,
	game_id varchar(100) not null,
	user_id varchar(100) not null,
	constraint game_chip_game_fk foreign key (game_id) references webttrpg.game(id),
	constraint game_chip_user_fk foreign key (user_id) references webttrpg.user(id)
);

create table webttrpg.game_chip_stat (
	id varchar(100) primary key not null,
	name varchar(100) not null,
	value int null,
	game_chip_id varchar(100) not null,
	constraint game_chip_stat_game_chip_fk foreign key (game_chip_id) references webttrpg.game_chip(id)
);

create table webttrpg.game_chip_skill (
	id varchar(100) primary key not null,
	name varchar(100) not null,
	description varchar null,
	game_chip_id varchar(100) not null,
	constraint game_chip_skill_game_chip_fk foreign key (game_chip_id) references webttrpg.game_chip(id)
);

create table webttrpg.game_chip_inventory (
	id varchar(100) primary key not null,
	name varchar(100) not null,
	quantity int null,
	game_chip_id varchar(100) not null,
	constraint game_chip_inventory_game_chip_fk foreign key (game_chip_id) references webttrpg.game_chip(id)
);

create table webttrpg.game_chip_enchantment (
	id varchar(100) primary key not null,
	name varchar(100) not null,
	castingTime varchar null, 
	range varchar null,
	duration varchar null,
	concentration bool null,
	description varchar null,
	level int null,
	game_chip_id varchar(100) not null,
	constraint game_chip_enchantment_game_chip_fk foreign key (game_chip_id) references webttrpg.game_chip(id)
);

create table webttrpg.game_chip_user (
	user_id varchar(100) not null,
    game_chip_id varchar(100) not null,
    created_at timestamp not null,
    constraint game_chip_user_user_fk foreign key (user_id) references webttrpg.user(id),
    constraint game_chip_user_game_chip_fk foreign key (game_chip_id) references webttrpg.game_chip(id),
    unique(user_id, game_chip_id)
);

-- drop table webttrpg.game_chip_enchantment;
-- drop table webttrpg.game_chip_inventory;
-- drop table webttrpg.game_chip_skill;
-- drop table webttrpg.game_chip_stat;
-- drop table webttrpg.game_chip;