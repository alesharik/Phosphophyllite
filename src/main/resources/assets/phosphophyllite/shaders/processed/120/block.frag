       
 #version 120
 #extension GL_EXT_texture_integer : enable
       
uniform sampler2D[10] textures;
varying vec2 atlasCoordinate;
varying flat uint atlasIndex;
vec4 doAtlasTexture(vec4 currentColor){
    vec4 textureColor = vec4(0, 0, 0, 1);
    switch (atlasIndex){
        case 0:{
            textureColor = texture2D(textures[0], atlasCoordinate);
            break;
        }
        case 1:{
            textureColor = texture2D(textures[1], atlasCoordinate);
            break;
        }
        case 2:{
            textureColor = texture2D(textures[2], atlasCoordinate);
            break;
        }
        case 3:{
            textureColor = texture2D(textures[3], atlasCoordinate);
            break;
        }
        case 4:{
            textureColor = texture2D(textures[4], atlasCoordinate);
            break;
        }
        case 5:{
            textureColor = texture2D(textures[5], atlasCoordinate);
            break;
        }
        case 6:{
            textureColor = texture2D(textures[6], atlasCoordinate);
            break;
        }
        case 7:{
            textureColor = texture2D(textures[7], atlasCoordinate);
            break;
        }
        case 8:{
            textureColor = texture2D(textures[8], atlasCoordinate);
            break;
        }
        case 9:{
            textureColor = texture2D(textures[9], atlasCoordinate);
            break;
        }
    }
    return textureColor * currentColor;
}
       
varying float fogCoord;
uniform vec4 fogColor;
uniform vec2 fogScaleEnd;
vec4 doFog(vec4 currentColor){
    float fogFactor = (fogScaleEnd.y - fogCoord) * fogScaleEnd.x;
    fogFactor = clamp(fogFactor, 0.0, 1.0);
    return mix(fogColor, currentColor, fogFactor);
}
       
varying uvec4 lightLevels;
varying vec2 lightPosition;
varying float AOMultiplier;
uniform sampler2D lightmap;
vec4 doLighting(vec4 currentColor){
    vec2 lightmapPos0 = vec2((lightLevels.x >> 6) & 0x3Fu, lightLevels.x & 0x3Fu);
    vec2 lightmapPos1 = vec2((lightLevels.y >> 6) & 0x3Fu, lightLevels.y & 0x3Fu);
    vec2 lightmapPos2 = vec2((lightLevels.z >> 6) & 0x3Fu, lightLevels.z & 0x3Fu);
    vec2 lightmapPos3 = vec2((lightLevels.w >> 6) & 0x3Fu, lightLevels.w & 0x3Fu);
    lightmapPos0 = lightmapPos0 * lightPosition.x + lightmapPos1 * (1 - lightPosition.x);
    lightmapPos2 = lightmapPos2 * lightPosition.x + lightmapPos3 * (1 - lightPosition.x);
    lightmapPos0 = lightmapPos0 * lightPosition.y + lightmapPos2 * (1 - lightPosition.y);
    lightmapPos0 /= 4.0;
    lightmapPos0 = clamp(lightmapPos0, 0.0, 15.0);
    lightmapPos0 += 1.0/2.0;
    lightmapPos0 /= 16.0;
    vec4 lightmapColor = texture(lightmap, lightmapPos0);
    lightmapColor *= AOMultiplier;
    lightmapColor.z = 1;
    return currentColor * lightmapColor;
}
       
void doCutout(vec4 color){
    if(color.w < 0.1){
        discard;
    }
}
void main() {
    vec4 fragColor = vec4(1, 1, 1, 1);
    fragColor = doLighting(fragColor);
    fragColor = doAtlasTexture(fragColor);
    fragColor = doFog(fragColor);
    doCutout(fragColor);
    gl_FragColor = fragColor;
}
