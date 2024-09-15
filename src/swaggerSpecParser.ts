import * as esbuild from "esbuild";
import * as path from "node:path";
import SwaggerParser from "@apidevtools/swagger-parser";

const swaggerSpecFileRegExp = /\.swagger\.(ya?ml|json)$/;
const PLUGIN_NAME = "SwaggerSpecParser";

export const SwaggerSpecParser: esbuild.Plugin = {
  name: PLUGIN_NAME,
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
      async (args) => {
        try {
          const api = await SwaggerParser.dereference(args.path);

          return {
            loader: "json",
            contents: JSON.stringify(api),
          };
        } catch (e) {
          if (e instanceof Error) {
            return {
              errors: [
                { detail: e.message, id: e.name, pluginName: PLUGIN_NAME },
              ],
            };
          } else {
            return {
              errors: [
                {
                  detail: "Error parsing Swagger specs.",
                  pluginName: PLUGIN_NAME,
                },
              ],
            };
          }
        }
      }
    );
  },
};
