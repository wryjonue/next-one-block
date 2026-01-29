import { world, system, Block, BlockType, BlockTypes, Dimension } from "@minecraft/server";

let overworld: Dimension;
let blockTypes: BlockType[];
const EX_LIST: string[] = [
	"minecraft:bedrock",
	"minecraft:barrier",
	"minecraft:allow",
	"minecraft:deny",
	"minecraft:portal",
	"minecraft:end_portal",
	"minecraftend_portal_frame",
	"minecraft:structure_void",
	"minecraft:structure_block",
	"minecraft:air"
];
const EX_LIST_INC: string[] = [
	"light_block",
	"element_",
	"command_block"
];
function main() {
	const leZero: Block | undefined = overworld.getBlock({x:0,y:0,z:0});
	if (!leZero) {
		while (true) {
			const blockType: BlockType = blockTypes[random(blockTypes.length)];
			if (EX_LIST.includes(blockType.id)) continue;
			if (EX_LIST_INC.some(p => blockType.id.includes(p))) continue;
			try {
				overworld.setBlockType({x:0,y:0,z:0},blockType);
			} catch (err) {
				console.log("Unable to place the block.");
			}
			break;
		}
	} 
	system.run(main);
}


world.afterEvents.worldLoad.subscribe(() => {
	overworld = world.getDimension("overworld");
	blockTypes = BlockTypes.getAll();
	system.run(main);
});

const random = (max: number) => Math.floor(Math.random() * max);