/**
 *	@author zwubs
 */

import { ShaderLib } from 'three';
import { Types } from "../types";

export const EntityShader: Types.Shader = {

	uniforms: ShaderLib.lambert.uniforms,

	vertex: ShaderLib.lambert.vertexShader,

	fragment: ShaderLib.lambert.fragmentShader

}
