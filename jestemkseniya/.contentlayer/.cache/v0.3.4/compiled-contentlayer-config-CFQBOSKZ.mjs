// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: false },
    cover: { type: "string", required: false }
  },
  computedFields: {
    slug: { type: "string", resolve: (doc) => doc._raw.flattenedPath.replace(/^posts\//, "") },
    url: { type: "string", resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace(/^posts\//, "")}` }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: "github-light" }]]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-CFQBOSKZ.mjs.map
