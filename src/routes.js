export const HOME = '/';
export const ABOUT = '/about';
export const ART = '/art';
export const BOOKS = '/books';
export const CTF = '/ctf';
export const POSTS = '/posts';
export const PROJECTS = '/projects';
export const RESUME = '/about/resume';

export const TAG_SEARCH_PARAM = 'tag';

export function searchTag(pathname, tag) {
  return `${pathname}?${TAG_SEARCH_PARAM}=${tag}`;
}

export function getGithubLink(resource = '') {
  return `https://github.com/chrisrzhou/${resource.replace(/^\//, '')}`;
}

export function getGithubSourceLink(fileAbsolutePath = '') {
  const fileRelativePath = fileAbsolutePath.replace(/^.*\/(io|repo)\/data/, '');
  return `${getGithubLink('/io/tree/master/data')}${fileRelativePath}`;
}
