export const objMap = (obj, cb) =>
	Object.keys(obj).reduce(
		(acc, key) => ({
			...acc,
			[key]: cb(key, obj[key]),
		}),
		{},
	);

export const printObj = obj => JSON.stringify(obj, null, "  ");

export const sentenceCase = str => str.slice(0, 1).toUpperCase() + str.slice(1);