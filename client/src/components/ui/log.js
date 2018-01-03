export function log (content, path) {
  content = !path ? content : get(content, path);
  
  if (typeof content !== 'object') {
    return content;
  }
  let ret = '',
      lineBreak = '\n',
      key = null;
  
  for(key in content) {
    if (content.hasOwnProperty(key)) {
      ret += key + ': ' + content[key] + lineBreak;
    }
  }
  
  return ret;
}

function get(object, path) {
  if (typeof path === 'string') {
    path = path.split('.');
  }
  
  if (!(path instanceof Array) || path.length === 0) {
    return;
  }
  
  path = path.slice();
  const key = path.shift();
  
  if (typeof object !== 'object' || object == null) {
    return;
  }
  
  if (path.length === 0) {
    return object[key];
  }
  
  if (path.length) {
    return get(object[key], path);
  }
}

export default log;
