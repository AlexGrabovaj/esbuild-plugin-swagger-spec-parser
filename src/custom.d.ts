declare module "*.swagger.yaml" {
    const value: Record<string, unknown>;
    export default value;
  }

declare module "*.swagger.yml" {
    const value: Record<string, unknown>;
    export default value;
}

declare module "*.swagger.json" {
    const value: Record<string, unknown>;
    export default value;
}