const fs = require("fs");

const files = fs
  .readdirSync(".")
  .filter((f) => /^\d-.*\.html$/.test(f))
  .sort();

const heads = [];
const bodies = [];

for (const f of files) {
  const t = fs.readFileSync(f, "utf-8");

  const tags = t.match(/<style[^>]*>[\s\S]*?<\/style>|<link[^>]*>/g) || [];
  for (const tag of tags) {
    if (!heads.includes(tag)) heads.push(tag);
  }

  const m = t.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  bodies.push(`<!-- ${f} -->\n` + (m ? m[1] : t));
}

const html = `<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sayt</title>
${heads.join("\n")}
</head>
<body>
${bodies.join("\n")}
</body>
</html>`;

fs.writeFileSync("index.html", html, "utf-8");
console.log("Tayyor:", files);
