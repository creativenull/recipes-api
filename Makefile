all:
	deno run --allow-net --allow-read --allow-env --import-map=import_map.json --watch --unstable src/index.ts
