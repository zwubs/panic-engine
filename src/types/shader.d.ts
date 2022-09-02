export type Shader = {
    uniforms: { [uniform: string]: IUniform<any> };
    vertex: string,
    fragment: string
}