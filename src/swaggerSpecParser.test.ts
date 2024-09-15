import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as esbuild from "esbuild";
import * as path from "path";
import { SwaggerSpecParser } from "./swaggerSpecParser";
import SwaggerParser from "@apidevtools/swagger-parser";

vi.mock("@apidevtools/swagger-parser");

describe("SwaggerSpecParser Plugin", () => {
  const mockApi = {
    openapi: "3.0.0",
    info: {
      title: "Sample API",
      version: "1.0.0",
    },
    paths: {},
    components: {},
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should resolve swagger files with the correct path", async () => {
    vi.mocked(SwaggerParser.dereference).mockResolvedValue(mockApi);

    const result = await esbuild.build({
      entryPoints: ["input.swagger.yaml"],
      bundle: false,
      write: false,
      plugins: [SwaggerSpecParser],
      absWorkingDir: path.resolve(__dirname),
    });

    expect(result.errors.length).toBe(0);
    expect(SwaggerParser.dereference).toHaveBeenCalledTimes(1);
    expect(SwaggerParser.dereference).toHaveBeenCalledWith(
      path.resolve(__dirname, "input.swagger.yaml")
    );
  });

  it("should load and transform swagger files to JSON", async () => {
    vi.mocked(SwaggerParser.dereference).mockResolvedValue(mockApi);

    const result = await esbuild.build({
      entryPoints: ["input.swagger.yaml"],
      bundle: false,
      write: false,
      plugins: [SwaggerSpecParser],
      absWorkingDir: path.resolve(__dirname),
    });

    const outputText = result.outputFiles[0]?.text || "";
    const receivedLiteral =
      outputText.match(/module\.exports = (.*);/)?.[1] || "";

    const evaluatedObject = eval(`(${receivedLiteral})`);

    expect(evaluatedObject).toEqual(mockApi);
    expect(result.errors.length).toBe(0);
  });

  it("should throw an error it can't parse the yaml", async () => {
    vi.clearAllMocks();
    const errorMessage = "Failed to parse YAML file";
    vi.mocked(SwaggerParser.dereference).mockRejectedValue(
      new Error(errorMessage)
    );

    // Expect the esbuild process to throw an error
    await expect(
      esbuild.build({
        entryPoints: ["input.swagger.yaml"],
        bundle: false,
        write: false,
        plugins: [SwaggerSpecParser],
        absWorkingDir: path.resolve(__dirname),
      })
    ).rejects.toThrowError();
  });
});
