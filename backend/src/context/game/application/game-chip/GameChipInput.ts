export default class GameChipInput {

    constructor(
        readonly id: string | null,
        readonly gameId: string,
        readonly name: string,
        readonly level: number,
        readonly clazz: string,
        readonly imageURL: string,
        readonly ownerPlayerId: string,
        readonly stats: GameChipStatsInput[],
        readonly inventorys: GameChipInventoryInput[],
        readonly skills: GameChipSkillsInput[],
        readonly enchantments: GameChipEnchantmentsInput[], 
        readonly playersEditPermission: string[]
    ) {}
}

type GameChipStatsInput = {
    name: string,
    value: number
};

type GameChipInventoryInput = {
    name: string,
    quantity: number
};

type GameChipSkillsInput = {
    name: string,
    description: string
};

type GameChipEnchantmentsInput = {
    name: string,
    castingTime: string,
    range: string,
    duration: string,
    concentration: boolean,
    description: string,
    level: number
};