const Parser = require("rss-parser");
const fs = require("fs/promises");

const parser = new Parser({
  customFields: {
    item: ["description"],
  },
});

let output = ["<ul>"];
(async () => {
  const feed = await parser.parseURL("https://soyilai.vercel.app/rss");
  const rss = feed.items.slice(0, 5);

  rss.forEach((item) => {
    output.push(`<li><a href="${item.link}">${item.title}</a></li>`);
    output.push(item.description);
  });

  output.push("</ul>");

  const original = await fs.readFile("README.md", "utf-8");
  const newly = original.replace(
    /(<!--feedstart--->)([\s\S]*?)(<!--feedend--->)/g,
    (match, startTag, content, endTag) => {
      return startTag + "\n" + output.join("") + "\n" + endTag;
    }
  );

  await fs.writeFile("README.md", newly);
})();
