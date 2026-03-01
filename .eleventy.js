const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {
  // Markdown config
  const md = markdownIt({ html: true, linkify: true, typographer: true });
  md.use(markdownItAttrs);
  eleventyConfig.setLibrary("md", md);

  // Date filter
  eleventyConfig.addFilter("date", function (dateObj, format) {
    const d = new Date(dateObj);
    if (format === "yyyy-MM-dd") {
      return d.toISOString().split("T")[0];
    }
    return d.toLocaleDateString();
  });

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
