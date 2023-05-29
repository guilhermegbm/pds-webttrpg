import Game from "./Game";

export default interface GameRepository {
    getByName(name: string): Promise<Game | null>;
    add(game: Game): Promise<void>;
    listAll(): Promise<Game[]>;
    getById(gameId: string): Promise<Game | null>;
}