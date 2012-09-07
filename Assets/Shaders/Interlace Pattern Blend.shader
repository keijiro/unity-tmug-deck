Shader "Custom/Interlace Pattern Blend" {
    Properties {
        _MainTex ("Base", 2D) = "white" {}
        _InterlacePattern ("Interlace Pattern", 2D) = "white" {}
        _ScrollSpeed ("Scroll Speed", Float) = 1.0
        _PatternMix ("Pattern Mix", Float) = 1.0
    }
    Subshader {
        Tags { "Queue" = "Geometry" }
        Pass {
            GLSLPROGRAM

            uniform sampler2D _MainTex;
            uniform sampler2D _InterlacePattern;
            uniform vec4 _MainTex_ST;
            uniform vec4 _InterlacePattern_ST;
            uniform mediump float _ScrollSpeed;
            uniform mediump float _PatternMix;
            uniform vec4 _Time;

            varying mediump vec2 uv[2];

            #ifdef VERTEX
            void main() {
                vec2 offs = _Time.xx * _ScrollSpeed;
                gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
                uv[0] = gl_MultiTexCoord0.xy * _MainTex_ST.xy + _MainTex_ST.zw;
                uv[1] = gl_MultiTexCoord0.xy * _InterlacePattern_ST.xy + _InterlacePattern_ST.zw + offs;
            }
            #endif

            #ifdef FRAGMENT
            void main() {
                lowp vec4 source = texture2D(_MainTex, uv[0]);
                lowp vec4 pattern = texture2D(_InterlacePattern, uv[1]);
                gl_FragColor = mix(source, source * pattern, _PatternMix);
            }
            #endif

            ENDGLSL
        }
    } 
    FallBack Off
}

