import Game from "./Game";

export default interface GameRepository {
    getByName(name: string): Promise<Game | null>;
    add(game: Game): Promise<void>;
    getById(gameId: string): Promise<Game | null>;
}