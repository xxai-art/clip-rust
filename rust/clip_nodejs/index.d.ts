/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

export function clsImg(txtFeature: Arr, imgFeature: Arr): Array<number>
export class Arr {
  raw(): any
  width(): bigint
  shape(): any
}
export class Model {
  constructor(dir: string)
  txt(onnx: string, contextLength: number): Txt
  img(onnx: string, dim: number): Img
}
export class Txt {
  encode(txt: Array<string> | string): Arr
}
export class Img {
  encode(ext: string | undefined | null, bin: Buffer): Arr
}
