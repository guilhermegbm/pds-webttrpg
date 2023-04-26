create schema webttrpg;

create table webttrpg.user (
    id varchar(100) primary key not null,
    username varchar(100) not null unique,
    password varchar(100) not null
);

create table webttrpg.authentication_token (
    token varchar(100) primary key not null,
    user_id varchar(100) not null,
    created_at timestamp not null,
    expiration_time_in_hours int not null,
    constraint authentication_token_user_fk foreign key (user_id) references webttrpg.user(id)
);

create table webttrpg.game (
    id varchar(100) primary key not null,
    name varchar(100) not null unique,
    maximum_players int not null,
    description varchar(200) not null,
    user_id varchar(100) not null,
    constraint game_user_fk foreign key (user_id) references webttrpg.user(id)
);
