import { defineConfig } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
    input: "src/index.ts",
    output: [
        {
            format: "umd",
            file: "dist/petal-fall.dist.js",
        },
    ],
    plugins: [
        nodeResolve(),
        typescript({
            compilerOptions: {
                lib: ["es5", "es2016", "dom"],
            },
        }),
        commonjs(),
        babel({
            babelHelpers: "runtime",
            extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"],
            exclude: "node_modules/**",
        }),
    ],
});
