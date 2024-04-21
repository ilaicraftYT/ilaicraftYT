const Parser = require("rss-parser");
const parser = new Parser({
  customFields: {
    item: ["description"],
  },
});

let output = [];

parser.parseURL("https://soyilai.vercel.app/rss").then((feed) => {
  const rss = feed.slice(0, 5);
  rss.items.forEach((item) => {
    output.push(`* [${item.title}](${item.link})`);
    output.push(item.description);
  });
  console.log(output.join("\n"));
});
