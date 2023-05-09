create schema webttrpg;

create table webttrpg.user (
    id varchar(100) primary key not null,
    username varchar(100) not null unique,
    password varchar(100) not null
);

create table webttrpg.authentication_token (
    token varchar(100) primary key not null,
    user_id varchar (100) not null,
    created_at timestamp not null,
    expiration_time_in_hours int not null,
    constraint authentication_token_user_fk foreign key (user_id) references webttrpg.user(id)
);
