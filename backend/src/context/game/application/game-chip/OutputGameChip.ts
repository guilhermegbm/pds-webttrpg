export default class OutputGameChip {

    constructor(
        readonly id: string,
        readonly name: string,
        readonly level: number,
        readonly clazz: string,
        readonly imageURL: string,
        readonly stats: GameChipStatsOutput[],
        readonly inventorys: GameChipInventoryOutput[],
        readonly skills: GameChipSkillsOutput[],
        readonly enchantments: GameChipEnchantmentsOutput[], 
        readonly playersEditPermission: string[]
    ) {}
}

export class GameChipStatsOutput {
    constructor(
        readonly name: string,
        readonly value: number
    ) {}
};

export class GameChipInventoryOutput {
    constructor(
        readonly name: string,
        readonly quantity: number
    ) {}
};

export class GameChipSkillsOutput {
    constructor(
        readonly name: string,
        readonly description: string
    ) {}
};

export class GameChipEnchantmentsOutput {
    constructor(
        readonly name: string,
        readonly castingTime: string,
        readonly range: string,
        readonly duration: string,
        readonly concentration: boolean,
        readonly description: string,
        readonly level: number
    ) {}
};