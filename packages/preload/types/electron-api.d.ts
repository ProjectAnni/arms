interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>;
}

interface AnniApi {
  scanFolder(base: string): Promise<ArmsFile[]>;

  scanFolderSync(base: string): ArmsFile[];

  version: Promise<string | undefined>;

  onigasmUrl: string;
}

interface ArmsFile {
  name: string;
  isDir: boolean;
  children?: ArmsFile[];
}

declare interface Window {
  electron: Readonly<ElectronApi>;
  electronRequire?: NodeRequire;

  anni: Readonly<AnniApi>;
}
