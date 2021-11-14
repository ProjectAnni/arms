interface ElectronApi {
  readonly versions: Readonly<NodeJS.ProcessVersions>;
}

interface AnniApi {
  scanFolder(string): Promise<File[]>;

  scanFolderSync(string): File[];
}

interface File {
  name: string;
  isDir: boolean;
  children?: File[];
}

declare interface Window {
  electron: Readonly<ElectronApi>;
  electronRequire?: NodeRequire;

  anni: Readonly<AnniApi>;
}
