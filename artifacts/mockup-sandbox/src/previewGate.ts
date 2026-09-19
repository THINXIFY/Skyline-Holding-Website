/**
 * /preview/<component> renders a single component for the Replit canvas. It is
 * a development tool: in production builds the route must not exist.
 *
 *  - "none"    : not a preview URL (normal Skyline route)
 *  - "render"  : preview URL, development only
 *  - "blocked" : preview URL in production -> the app shows a plain 404
 */
export type PreviewResolution =
  | { kind: "none" }
  | { kind: "render"; path: string }
  | { kind: "blocked" };

export function resolvePreview(localPath: string, isDev: boolean): PreviewResolution {
  const match = localPath.match(/^\/preview\/(.+)$/);
  if (!match) return { kind: "none" };
  return isDev ? { kind: "render", path: match[1] } : { kind: "blocked" };
}
