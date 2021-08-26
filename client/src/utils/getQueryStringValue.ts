export const getQueryStringValue = (key: string) => new URLSearchParams(location.search).get(key);
