const path = require("path")
const fs = require("fs")
const merge = require("deepmerge")
const prettier = require("prettier")

const ALLOWED_FRAMEWORKS = ["shopify"]
const FALLBACK_FRAMEWORK = "shopify"

function withFrameworkConfig(defaultConfig = {}) {
    let framework = defaultConfig.framework.name;

    if (!framework) {
        throw new Error("The API framework is missing.")
    }

    if (!ALLOWED_FRAMEWORKS.includes(framework)) {
        throw new Error(`The API framework: ${framework} isn't found.`)
    }

    if (framework === "shopify_local") {
        framework = FALLBACK_FRAMEWORK
    }

    const frameworkNextConfig =
        require(path.join("../", framework, "next.config"))

    const tsPath =
        path.join(process.cwd(), "tsconfig.json")
    const tsConfig = require(tsPath)

    tsConfig
        .compilerOptions
        .paths["@framework"] = [`framework/${framework}`]
    tsConfig
        .compilerOptions
        .paths["@framework/*"] = [`framework/${framework}/*`]

    fs.writeFileSync(
        tsPath,
        prettier.format(
            JSON.stringify(tsConfig), { parser: "json" }
        )
    )

    return merge(defaultConfig, frameworkNextConfig)
}

module.exports = { withFrameworkConfig }
