
const StyleDictionary = require("style-dictionary").extend({
    source: ["json/**/*.json"],
    platforms: {
        scss: {
            transformGroup: "scss",
            buildPath: "_scss/",
            files: [
                {
                    destination: "_variables.scss",
                    format: "scss/variables"
                }
            ]
        },
        css: {
            transformGroup: "css",
            buildPath: "css/",
            files: [
                {
                    destination: "variables.css",
                    format: "css/variables"
                }
            ]
        }
    }
});

StyleDictionary.buildAllPlatforms();

console.log("Done!");
