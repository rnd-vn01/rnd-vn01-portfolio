export const objectToQuery = (obj: any): string => {
  if (!obj) return '';

  var query = [];

  for (var prop in obj) {
    query.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
  }

  return '?' + query.join('&');
};

export const objectToFormData = (object: any): FormData => {
  let fd = new FormData();
  for (const key in object) {
    if (Array.isArray(object[key])) {
      fd.append(key, JSON.stringify(object[key]));
    } else {
      fd.append(key, object[key]);
    }
  }

  return fd;
};
