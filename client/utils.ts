export const flatted2DArray = (array:Array<Array<any>>) => {
  return [].concat.apply([], array as any)
}