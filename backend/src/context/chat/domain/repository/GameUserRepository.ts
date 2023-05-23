export default interface GameUserRepository {
    userIsInTheGame(userId: string, gameId: string): Promise<boolean>;
}
