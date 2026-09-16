import { createServer } from "node:http";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const MIME_TYPES = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".mjs": "text/javascript; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".svg": "image/svg+xml",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".woff": "font/woff",
	".woff2": "font/woff2",
	".ttf": "font/ttf",
	".ico": "image/x-icon",
};

function startStaticServer(rootDir) {
	return new Promise((resolve) => {
		const server = createServer(async (req, res) => {
			try {
				let filePath = path.join(rootDir, decodeURIComponent(req.url.split("?")[0]));
				if (filePath.endsWith(path.sep) || !path.extname(filePath)) {
					filePath = path.join(filePath, "index.html");
				}
				const data = await readFile(filePath);
				const ext = path.extname(filePath);
				res.writeHead(200, { "Content-Type": MIME_TYPES[ext] ?? "application/octet-stream" });
				res.end(data);
			} catch {
				res.writeHead(404);
				res.end("Not found");
			}
		});
		server.listen(0, "127.0.0.1", () => resolve(server));
	});
}

const TARGETS = [
	{ route: "/resume-print/", out: "resume.pdf", printDir: "resume-print" },
	{ route: "/en/resume-print/", out: path.join("en", "resume.pdf"), printDir: path.join("en", "resume-print") },
];

export default function resumePdf() {
	return {
		name: "resume-pdf",
		hooks: {
			"astro:build:done": async ({ dir, logger }) => {
				const outDir = fileURLToPath(dir);
				const server = await startStaticServer(outDir);
				const { port } = server.address();
				const baseUrl = `http://127.0.0.1:${port}`;

				const browser = await chromium.launch();
				try {
					for (const { route, out } of TARGETS) {
						const page = await browser.newPage();
						await page.emulateMedia({ media: "print" });
						await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
						await page.pdf({
							path: path.join(outDir, out),
							format: "A4",
							printBackground: true,
						});
						await page.close();
						logger.info(`Generated ${out}`);
					}
				} finally {
					await browser.close();
					await new Promise((resolve) => server.close(resolve));
				}

				for (const { printDir } of TARGETS) {
					await rm(path.join(outDir, printDir), { recursive: true, force: true });
				}
			},
		},
	};
}
