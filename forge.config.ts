import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { VitePlugin } from '@electron-forge/plugin-vite';
import type { ForgeConfig } from '@electron-forge/shared-types';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

const getExtraResources = () => {
  const resources = ['./resources/bot-template'];

  const platform = process.platform; // win32, darwin, linux
  const arch = process.arch;
  // Windows
  if (platform === 'win32') {
    if (arch === 'x64') {
      resources.push('./resources/bin/win-x64');
    } else if (arch === 'arm64') {
      resources.push('./resources/bin/win-arm64');
    }
  }
  // macOS
  if (platform === 'darwin') {
    if (arch === 'arm64') {
      resources.push('./resources/bin/darwin-arm64');
    } else if (arch === 'x64') {
      resources.push('./resources/bin/darwin-x64');
    }
  }
  // Linux
  if (platform === 'linux') {
    if (arch === 'x64') {
      resources.push('./resources/bin/linux-x64');
    } else if (arch === 'arm64') {
      resources.push('./resources/bin/linux-arm64');
    }
  }

  return resources;
};

console.log(getExtraResources());

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    extraResource: getExtraResources(),
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
