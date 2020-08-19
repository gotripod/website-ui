import deepMapKeys from 'deep-map-keys'

const snakeToCamel = (key: string) => key.replace(/_(\w)/g, (match, char) => char.toUpperCase())

const keysToCamelDeep = <T, R>(data: T): R => deepMapKeys<R>(data, snakeToCamel)

export { keysToCamelDeep }
