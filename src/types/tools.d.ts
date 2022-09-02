import { Tools } from '../tools'

export namespace Tools {

    export type Directions = typeof Tools.Directions[number]

    export type Uniforms = { [uniform: string]: IUniform<any> }

}
