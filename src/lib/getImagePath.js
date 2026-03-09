/**
 * Resolves image/asset paths correctly for both local dev and GitHub Pages deployment.
 * Vite's BASE_URL is '/Thalir-Dental-Clinic/' in production and '/' in dev,
 * so we strip any leading slash from `path` and join it with the base.
 *
 * Usage:  src={img('/images/thalir-logo.png')}
 */
export function img(path) {
    const base = import.meta.env.BASE_URL; // e.g. '/Thalir-Dental-Clinic/'
    const clean = path.replace(/^\//, '');  // remove leading slash
    return `${base}${clean}`;
}
