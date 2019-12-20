export const HOME = '/';
export const ABOUT = '/about';
export const ART = '/art';
export const CTF = '/ctf';
export const PROJECTS = '/projects';
export const POSTS = '/posts';

export const TAG_SEARCH_PARAM = 'tag';

export function searchTag(pathname, tag) {
  return `${pathname}?${TAG_SEARCH_PARAM}=${tag}`;
}
