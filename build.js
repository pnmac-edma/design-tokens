
const StyleDictionary = require("style-dictionary").extend({
    source: ["json/**/*.json"],
    platforms: {
        scss: {
            transforms: ["attribute/cti", "name/cti/kebab", "time/seconds", "content/icon", "size/rem"],
            buildPath: "_scss/",
            files: [
                {
                    destination: "_variables.scss",
                    format: "scss/variables"
                }
            ]
        },
        css: {
            transforms: ["attribute/cti", "name/cti/kebab", "time/seconds", "content/icon", "size/rem"],
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
