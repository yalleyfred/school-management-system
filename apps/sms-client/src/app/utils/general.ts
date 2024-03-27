export const getCurrentPage = (url: string):string => url.split('/').pop()??'';
