import * as esbuild from "esbuild";
import { execSync } from "node:child_process";
import path from "node:path";

const swaggerSpecFileRegExp = /\.swagger\.(ya?ml|json)$/;

export const SwaggerSpecParser: esbuild.Plugin = {
  name: "SwaggerSpecParser",
  setup(build) {
    build.onResolve({ filter: swaggerSpecFileRegExp }, (args) => {
      if (args.resolveDir === "") return;

      return {
        path: path.isAbsolute(args.path)
          ? args.path
          : path.join(args.resolveDir, args.path),
        namespace: "swagger-spec-parser",
      };
    });

    build.onLoad(
      { filter: swaggerSpecFileRegExp, namespace: "swagger-spec-parser" },
      (args) => {
        const command = `
      temp_file=$(mktemp)  >/dev/null 2>&1 &&
      swagger-cli bundle -o $temp_file ${args.path} >/dev/null 2>&1 
      cat $temp_file`;

        return {
          loader: "json",
          contents: execSync(command, { stdio: "pipe" }).toString(),
        };
      }
    );
  },
};
