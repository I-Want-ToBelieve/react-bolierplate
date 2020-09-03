// https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript#sort-and-reverse
export const head = <T = any>(array: T[]) => array[0]
export const last = <T = any>(array: T[]) => array[array.length - 1]
export const reverse = <T = any>(array: T[]) => [...array].reverse()
