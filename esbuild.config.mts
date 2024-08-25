import * as esbuild from "esbuild";

const isDev = process.argv.includes("--dev");

const buildConfiguration: esbuild.BuildOptions = {
  entryPoints: ["./src/swaggerSpecParser.ts"],
  bundle: true,
  outdir: "dist",
  platform: "node",
  minify: !isDev
};

if (isDev) {
  const context = await esbuild.context(buildConfiguration);
  const serverResult = await context.serve();
  console.log(`Serving on: http://${serverResult.host}:${serverResult.port}`);
} else {
  await esbuild.build(buildConfiguration);
}
