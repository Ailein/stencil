import * as d from '.';


export interface ScreenshotConnector {
  initBuild(opts: d.ScreenshotConnectorOptions): Promise<void>;
  completeBuild(masterBuild: d.ScreenshotBuild): Promise<ScreenshotBuildResults>;
  getMasterBuild(): Promise<d.ScreenshotBuild>;
  pullMasterBuild(): Promise<void>;
  publishBuild(buildResults: d.ScreenshotBuildResults): Promise<d.ScreenshotBuildResults>;
  generateJsonpDataUris(build: d.ScreenshotBuild): Promise<void>;
  sortScreenshots(screenshots: d.Screenshot[]): d.Screenshot[];
  toJson(masterBuild: d.ScreenshotBuild): string;
}


export interface ScreenshotBuildResults {
  masterBuild: d.ScreenshotBuild;
  currentBuild: d.ScreenshotBuild;
  compare: ScreenshotCompareResults;
}


export interface ScreenshotCompareResults {
  id: string;
  a: {
    id: string;
    message: string;
    author: string;
    url: string;
  };
  b: {
    id: string;
    message: string;
    author: string;
    url: string;
  };
  timestamp: number;
  url: string;
  diffs: d.ScreenshotDiff[];
}


export interface ScreenshotConnectorOptions {
  buildId: string;
  buildMessage: string;
  buildAuthor?: string;
  buildUrl?: string;
  buildTimestamp: number;
  logger: d.Logger;
  rootDir: string;
  cacheDir: string;
  packageDir: string;
  screenshotDirName?: string;
  imagesDirName?: string;
  buildsDirName?: string;
  currentBuildDir?: string;
  updateMaster?: boolean;
  allowableMismatchedPixels?: number;
  allowableMismatchedRatio?: number;
  pixelmatchThreshold?: number;
}


export interface ScreenshotBuildData {
  buildId: string;
  rootDir: string;
  cacheDir: string;
  screenshotDir: string;
  imagesDir: string;
  buildsDir: string;
  currentBuildDir: string;
  updateMaster: boolean;
  allowableMismatchedPixels: number;
  allowableMismatchedRatio: number;
  pixelmatchThreshold: number;
  masterScreenshots: {[screenshotId: string]: string};
}


export interface ScreenshotBuild {
  id: string;
  message: string;
  author?: string;
  url?: string;
  timestamp: number;
  screenshots: Screenshot[];
}


export interface Screenshot {
  id: string;
  desc?: string;
  image: string;
  device?: string;
  userAgent?: string;
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
  hasTouch?: boolean;
  isLandscape?: boolean;
  isMobile?: boolean;
  testPath?: string;
  diff?: ScreenshotDiff;
}


export interface ScreenshotDiff {
  mismatchedPixels: number;
  id?: string;
  desc?: string;
  imageA?: string;
  imageB?: string;
  device?: string;
  userAgent?: string;
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
  hasTouch?: boolean;
  isLandscape?: boolean;
  isMobile?: boolean;
  allowableMismatchedPixels: number;
  allowableMismatchedRatio: number;
  testPath?: string;
}


export interface ScreenshotOptions {
  /**
   * When true, takes a screenshot of the full scrollable page.
   * Default: `false`
   */
  fullPage?: boolean;

  /**
   * An object which specifies clipping region of the page.
   */
  clip?: ScreenshotBoundingBox;

  /**
   * Hides default white background and allows capturing screenshots with transparency.
   * Default: `false`
   */
  omitBackground?: boolean;

  /**
   * Matching threshold, ranges from `0` to 1. Smaller values make the comparison
   * more sensitive. Defaults to the testing config `pixelmatchThreshold` value;
   */
  pixelmatchThreshold?: number;
}


export interface ScreenshotBoundingBox {
  /**
   * The x-coordinate of top-left corner.
   */
  x: number;

  /**
   * The y-coordinate of top-left corner.
   */
  y: number;

  /**
   * The width in pixels.
   */
  width: number;

  /**
   * The height in pixels.
   */
  height: number;
}
