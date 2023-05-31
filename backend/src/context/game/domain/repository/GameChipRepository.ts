import GameChip from "../entity/GameChip/GameChip";

export default interface GameChipRepository {
    
    add(gameChip: GameChip): Promise<void>;
    exist(gameChipName: string, ownerPlayerId: string, gameId: string): Promise<boolean>;
    getByGameIdAndPlayerId(gameId: string, playerId: string): Promise<GameChip[]>;
    delete(gameChipId: string): Promise<void>;
    getById(gameChipId: string): Promise<GameChip | null>;
    update(gameChip: GameChip): Promise<GameChip>;
}