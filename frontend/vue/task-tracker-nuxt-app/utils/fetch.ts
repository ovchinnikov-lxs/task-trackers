import defu from 'defu';

export type RequestOptions = Parameters<typeof $fetch>[1];

export function getFetchOptions(options?: RequestOptions) {
    const defaultOptions: RequestOptions = {};

    return defu(defaultOptions, options);
}
