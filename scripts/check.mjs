import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import * as tar from 'tar';
import { fileURLToPath } from 'url';

// Get the absolute path of the current script and project root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '..');

// 1. Configuration: Define the target Node.js version
const NODE_VERSION = 'v24.16.0';

// 2. Map system platforms and architectures to official Node.js naming conventions
const PLATFORM_MAP = { win32: 'win', darwin: 'darwin', linux: 'linux' };
const ARCH_MAP = { x64: 'x64', arm64: 'arm64' };

async function main() {
  const platform = process.platform;
  const arch = process.arch;

  const nodePlatform = PLATFORM_MAP[platform];
  const nodeArch = ARCH_MAP[arch];

  if (!nodePlatform || !nodeArch) {
    console.error(
      `❌ Unsupported platform or architecture: ${platform}-${arch}`,
    );
    process.exit(1);
  }

  // Define your target output directory: e.g., resources/bin/win-x64
  const targetDirName = `${nodePlatform === 'win' ? 'win' : nodePlatform}-${nodeArch}`;
  const targetDir = path.join(PROJECT_ROOT, 'resources', 'bin', targetDirName);

  // Determine the expected executable path to check for prior initialization
  const expectedBinaryPath =
    platform === 'win32'
      ? path.join(targetDir, 'node.exe')
      : path.join(targetDir, 'bin', 'node');

  // Early exit if the environment is already fully set up
  if (fs.existsSync(expectedBinaryPath)) {
    console.log(
      `✅ Complete Node.js environment for [${targetDirName}] is already initialized. Skipping.`,
    );
    process.exit(0);
  }

  // 3. Construct the official download URL based on the platform extension
  const extension = platform === 'win32' ? 'zip' : 'tar.gz';
  const archiveName = `node-${NODE_VERSION}-${nodePlatform}-${nodeArch}.${extension}`;

  const mirrorUrl = process.env.NODEJS_MIRROR || 'https://nodejs.org/dist';
  const downloadUrl = `${mirrorUrl.replace(/\/$/, '')}/${NODE_VERSION}/${archiveName}`;

  const tmpDownloadPath = path.join(
    PROJECT_ROOT,
    'resources',
    'bin',
    `tmp_${archiveName}`,
  );

  // Ensure the parent directory structure exists
  fs.mkdirSync(path.dirname(targetDir), { recursive: true });

  console.log(
    `🚀 Downloading full Node.js package straight into [${targetDirName}]...`,
  );
  console.log(`🔗 URL: ${downloadUrl}`);

  try {
    // 4. Stream download using native fetch (Node 18+)
    const response = await fetch(downloadUrl);
    if (!response.ok)
      throw new Error(`HTTP Request Failed: ${response.statusText}`);

    const fileStream = fs.createWriteStream(tmpDownloadPath);
    await finished(Readable.fromWeb(response.body).pipe(fileStream));
    console.log('📦 Download complete. Extracting archive...');

    // 5. Clean target directory before extraction
    if (fs.existsSync(targetDir))
      fs.rmSync(targetDir, { recursive: true, force: true });
    fs.mkdirSync(targetDir, { recursive: true });

    // 6. Handle cross-platform extraction
    if (platform === 'win32') {
      await extractZipWindows(
        tmpDownloadPath,
        targetDir,
        archiveName.replace('.zip', ''),
      );
    } else {
      await extractTarPosix(tmpDownloadPath, targetDir);
    }

    // 7. Cleanup the temporary archive file
    fs.unlinkSync(tmpDownloadPath);
    console.log(
      `🎉 Node.js environment initialized successfully under: ${targetDir}`,
    );
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    if (fs.existsSync(tmpDownloadPath)) fs.unlinkSync(tmpDownloadPath);
    process.exit(1);
  }
}

/**
 * Windows Extraction Logic (.zip)
 */
async function extractZipWindows(zipPath, targetDir, expectedSubDir) {
  const zip = new AdmZip(zipPath);
  const tempExtractPath = path.join(path.dirname(targetDir), 'tmp_unzip');

  // Extract everything to a temporary directory first
  zip.extractAllTo(tempExtractPath, true);

  // The official zip wraps files inside a root folder (e.g., "node-v20.11.0-win-x64")
  // We move its contents directly to our target output directory
  const innerPath = path.join(tempExtractPath, expectedSubDir);
  fs.renameSync(innerPath, targetDir);

  // Clean up the temporary unzip folder
  fs.rmSync(tempExtractPath, { recursive: true, force: true });
}

/**
 * macOS / Linux Extraction Logic (.tar.gz)
 */
async function extractTarPosix(tarPath, targetDir) {
  // Using the built-in 'strip' option of the tar library
  // This automatically strips away the first leading directory component (the redundant outer folder)
  await tar.x({
    file: tarPath,
    cwd: targetDir,
    strip: 1,
  });

  // Fix executable permissions on POSIX systems
  const binaryPath = path.join(targetDir, 'bin', 'node');
  const npmPath = path.join(targetDir, 'bin', 'npm');

  if (fs.existsSync(binaryPath)) fs.chmodSync(binaryPath, 0o755);
  if (fs.existsSync(npmPath)) fs.chmodSync(npmPath, 0o755);
}

main();
