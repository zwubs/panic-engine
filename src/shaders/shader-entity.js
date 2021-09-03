/**
 *	@namespace PANIC.Shaders.Entity
 *	@author zwubs
 */
PANIC.Shaders.Entity = {

	uniforms: THREE.ShaderLib.lambert.uniforms,

	vertex: `

		varying vec3 vLightFront;
		varying vec3 vIndirectFront;

		#ifdef DOUBLE_SIDED
			varying vec3 vLightBack;
			varying vec3 vIndirectBack;
		#endif

		#include <common>
		#include <uv_pars_vertex>
		#include <lights_pars_begin>
		#include <fog_pars_vertex>

		#include <skinning_pars_vertex>

		#include <shadowmap_pars_vertex>

		void main() {

			#include <uv_vertex>

			#include <beginnormal_vertex>

			#include <skinbase_vertex>
			#include <skinnormal_vertex>

			#include <defaultnormal_vertex>
			#include <begin_vertex>

			#include <skinning_vertex>

			#include <project_vertex>

			#include <worldpos_vertex>

			#include <lights_lambert_vertex>

			#include <shadowmap_vertex>
			#include <fog_vertex>

		}

	`,

	fragment: `
		uniform vec3 diffuse;
		uniform vec3 emissive;
		uniform float opacity;

		varying vec3 vLightFront;
		varying vec3 vIndirectFront;

		#ifdef DOUBLE_SIDED
			varying vec3 vLightBack;
			varying vec3 vIndirectBack;
		#endif

		#include <common>
		#include <packing>
		#include <dithering_pars_fragment>
		#include <color_pars_fragment>
		#include <uv_pars_fragment>
		#include <map_pars_fragment>
		#include <alphamap_pars_fragment>
		#include <aomap_pars_fragment>
		#include <lightmap_pars_fragment>
		#include <emissivemap_pars_fragment>
		#include <envmap_common_pars_fragment>
		#include <envmap_pars_fragment>
		#include <cube_uv_reflection_fragment>
		#include <bsdfs>
		#include <lights_pars_begin>
		#include <fog_pars_fragment>
		#include <shadowmap_pars_fragment>
		#include <shadowmask_pars_fragment>
		#include <specularmap_pars_fragment>

		void main() {

			#include <clipping_planes_fragment>

			vec4 diffuseColor = vec4( diffuse, opacity );
			ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
			vec3 totalEmissiveRadiance = emissive;

			#include <logdepthbuf_fragment>
			#include <map_fragment>
			#include <color_fragment>
			#include <alphamap_fragment>
			#include <alphatest_fragment>
			#include <specularmap_fragment>
			#include <emissivemap_fragment>

			// accumulation
			#ifdef DOUBLE_SIDED
				reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
			#else
				reflectedLight.indirectDiffuse += vIndirectFront;
			#endif
			reflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor ) + vIndirectFront;

			#include <lightmap_fragment>

			reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );

			#ifdef DOUBLE_SIDED
				reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
			#else
				reflectedLight.directDiffuse = vLightFront;
			#endif

			reflectedLight.directDiffuse = vLightFront;

			reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();

			// modulation
			#include <aomap_fragment>

			vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

			#include <envmap_fragment>

			gl_FragColor = vec4( outgoingLight, diffuseColor.a );

			#include <tonemapping_fragment>
			#include <encodings_fragment>

			#include <fog_fragment>

			#include <premultiplied_alpha_fragment>
			#include <dithering_fragment>

		}

	`

}
