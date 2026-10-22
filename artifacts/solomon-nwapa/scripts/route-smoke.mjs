import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectsDir = resolve(appDir, "src/content/projects");
const publicRoutes = [
  "/",
  "/about",
  "/work",
  "/capabilities",
  "/industries",
  "/insights",
  "/contact",
];
const startupTimeoutMs = 90_000;
const requestTimeoutMs = 15_000;

async function getAvailablePort() {
  const server = createServer();
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  const { port } = server.address();
  await new Promise((resolveClose, reject) => {
    server.close((error) => (error ? reject(error) : resolveClose()));
  });
  return port;
}

async function getProjectSlugs() {
  const indexSource = await readFile(resolve(projectsDir, "index.ts"), "utf8");
  const moduleNames = [
    ...indexSource.matchAll(/from\s+["']\.\/([^"']+)["']/g),
  ].map((match) => match[1]);
  const files = await readdir(projectsDir);
  const slugs = [];

  for (const moduleName of moduleNames) {
    const fileName = `${moduleName}.ts`;
    if (!files.includes(fileName)) continue;

    const source = await readFile(resolve(projectsDir, fileName), "utf8");
    const slug = source.match(/\bslug\s*:\s*["']([^"']+)["']/)?.[1];
    if (slug) slugs.push(slug);
  }

  if (slugs.length === 0) {
    throw new Error("No project slugs found in the portfolio project index.");
  }
  return slugs;
}

function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}

async function waitForServer(baseUrl, child) {
  const deadline = Date.now() + startupTimeoutMs;
  let lastError;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Next.js exited early with code ${child.exitCode}.`);
    }

    try {
      await fetch(baseUrl, { signal: AbortSignal.timeout(5_000) });
      return;
    } catch (error) {
      lastError = error;
      await delay(300);
    }
  }

  throw new Error(
    `Next.js did not start within ${startupTimeoutMs / 1_000} seconds: ${lastError}`,
  );
}

async function checkStatus(baseUrl, route, failures) {
  try {
    const response = await fetch(new URL(route, baseUrl), {
      redirect: "manual",
      signal: AbortSignal.timeout(requestTimeoutMs),
    });
    if (response.status !== 200) {
      failures.push(`${route}: expected HTTP 200, received ${response.status}`);
      return;
    }
    console.log(`✓ ${route} (HTTP 200)`);
  } catch (error) {
    failures.push(`${route}: request failed (${error.message})`);
  }
}

async function checkLegacyRedirect(baseUrl, slug, failures) {
  const route = `/projects/${encodeURIComponent(slug)}`;
  const expectedPath = `/work/${slug}`;

  try {
    const response = await fetch(new URL(route, baseUrl), {
      redirect: "manual",
      signal: AbortSignal.timeout(requestTimeoutMs),
    });
    const location = response.headers.get("location");
    const actualPath = location
      ? new URL(location, baseUrl).pathname
      : undefined;

    if (response.status !== 308 || actualPath !== expectedPath) {
      failures.push(
        `${route}: expected HTTP 308 redirect to ${expectedPath}, received HTTP ${response.status}${location ? ` to ${location}` : " without a Location header"}`,
      );
      return;
    }
    console.log(`✓ ${route} → ${expectedPath} (HTTP 308)`);
  } catch (error) {
    failures.push(`${route}: request failed (${error.message})`);
  }
}

const port = await getAvailablePort();
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = resolve(appDir, "node_modules/next/dist/bin/next");
const child = spawn(
  process.execPath,
  [nextBin, "dev", "--hostname", "127.0.0.1", "--port", String(port)],
  {
    cwd: appDir,
    env: {
      ...process.env,
      PORT: String(port),
      NEXT_TELEMETRY_DISABLED: "1",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let serverOutput = "";
for (const stream of [child.stdout, child.stderr]) {
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => {
    serverOutput = `${serverOutput}${chunk}`.slice(-8_000);
  });
}

let exitCode = 0;
try {
  await waitForServer(baseUrl, child);
  const failures = [];
  const projectSlugs = await getProjectSlugs();

  for (const route of publicRoutes) {
    await checkStatus(baseUrl, route, failures);
  }
  for (const slug of projectSlugs) {
    await checkStatus(baseUrl, `/work/${encodeURIComponent(slug)}`, failures);
    await checkLegacyRedirect(baseUrl, slug, failures);
  }

  if (failures.length > 0) {
    exitCode = 1;
    console.error("\nRoute smoke checks failed:");
    for (const failure of failures) console.error(`- ${failure}`);
  } else {
    console.log(`\nAll ${publicRoutes.length + projectSlugs.length * 2} route checks passed.`);
  }
} catch (error) {
  exitCode = 1;
  console.error(`Route smoke check could not run: ${error.message}`);
  if (serverOutput) console.error(`\nNext.js output:\n${serverOutput}`);
} finally {
  if (child.exitCode === null && !child.killed) {
    child.kill("SIGTERM");
    await Promise.race([
      new Promise((resolveExit) => child.once("exit", resolveExit)),
      delay(5_000).then(() => {
        if (child.exitCode === null) child.kill("SIGKILL");
      }),
    ]);
  }
}

process.exitCode = exitCode;
