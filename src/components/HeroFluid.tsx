import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'
import * as THREE from 'three'

import fluidVertexShader from '@/shaders/fluid.vert.glsl'
import fluidFragmentShader from '@/shaders/fluid.frag.glsl'
import displayFragmentShader from '@/shaders/display.frag.glsl'

function FluidSim() {
  const meshRef = useRef<THREE.Mesh>(null)
  const fluidMaterialRef = useRef<THREE.ShaderMaterial>(null)
  const displayMaterialRef = useRef<THREE.ShaderMaterial>(null)
  const fluidSceneRef = useRef<THREE.Scene>(new THREE.Scene())
  const fluidCameraRef = useRef<THREE.OrthographicCamera>(
    new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  )

  const iMouse = useRef(new THREE.Vector4(0.5, 0.5, 0.5, 0.5))
  const smoothMouse = useRef({ x: 0.5, y: 0.5 })
  const lastMouse = useRef({ x: 0.5, y: 0.5 })
  const pointerActive = useRef(false)
  const pointerTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const uBrushSize = 1.0
  const uBrushStrength = 1.0
  const uFluidDecay = 0.98
  const uTrailLength = 0.8
  const uStopDecay = 0.84

  const fluidA = useFBO({
    type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  })

  const fluidB = useFBO({
    type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
  })

  const fluidMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: fluidVertexShader,
        fragmentShader: fluidFragmentShader,
        uniforms: {
          uFluidPrev: { value: null },
          iMouse: { value: new THREE.Vector4(0.5, 0.5, 0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uBrushSize: { value: uBrushSize },
          uBrushStrength: { value: uBrushStrength },
          uFluidDecay: { value: uFluidDecay },
          uTrailLength: { value: uTrailLength },
          uStopDecay: { value: uStopDecay },
        },
      }),
    []
  )

  const displayMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: fluidVertexShader,
        fragmentShader: displayFragmentShader,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(1, 1) },
          u_fluid: { value: null },
        },
      }),
    []
  )

  // Fluid mesh for offscreen rendering
  const fluidMesh = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geo, fluidMaterial)
    return mesh
  }, [fluidMaterial])

  useMemo(() => {
    fluidSceneRef.current.add(fluidMesh)
  }, [fluidMesh])

  let aPtr = fluidA
  let bPtr = fluidB

  useFrame((state) => {
    const { width, height } = state.size
    const clock = state.clock

    if (fluidMaterialRef.current) {
      fluidMaterialRef.current.uniforms.uResolution.value.set(width, height)
      fluidMaterialRef.current.uniforms.uBrushSize.value = uBrushSize
      fluidMaterialRef.current.uniforms.uBrushStrength.value = uBrushStrength
      fluidMaterialRef.current.uniforms.uFluidDecay.value = uFluidDecay
      fluidMaterialRef.current.uniforms.uTrailLength.value = uTrailLength
      fluidMaterialRef.current.uniforms.uStopDecay.value = uStopDecay
    }

    // Update fluid uniforms
    fluidMaterial.uniforms.uResolution.value.set(width, height)
    fluidMaterial.uniforms.uBrushSize.value = uBrushSize
    fluidMaterial.uniforms.uBrushStrength.value = uBrushStrength
    fluidMaterial.uniforms.uFluidDecay.value = uFluidDecay
    fluidMaterial.uniforms.uTrailLength.value = uTrailLength
    fluidMaterial.uniforms.uStopDecay.value = uStopDecay

    fluidMaterial.uniforms.uFluidPrev.value = aPtr.texture
    displayMaterial.uniforms.u_fluid.value = bPtr.texture
    displayMaterial.uniforms.u_time.value = clock.elapsedTime
    displayMaterial.uniforms.u_resolution.value.set(width, height)

    state.gl.setRenderTarget(bPtr)
    state.gl.render(fluidSceneRef.current, fluidCameraRef.current)
    state.gl.setRenderTarget(null)

    // Swap
    const temp = aPtr
    aPtr = bPtr
    bPtr = temp
  })

  const handlePointerMove = (e: THREE.Event & { uv: THREE.Vector2 }) => {
    const x = e.uv.x
    const y = e.uv.y

    lastMouse.current = { ...smoothMouse.current }
    smoothMouse.current = { x, y }

    if (!pointerActive.current) {
      iMouse.current.set(x, y, x, y)
      pointerActive.current = true
      if (pointerTimer.current) clearTimeout(pointerTimer.current)
      pointerTimer.current = setTimeout(() => {
        pointerActive.current = false
      }, 100)
    } else {
      iMouse.current.set(x, y, iMouse.current.z, iMouse.current.w)
    }

    fluidMaterial.uniforms.iMouse.value.set(x, y, lastMouse.current.x, lastMouse.current.y)
  }

  return (
    <mesh
      ref={meshRef}
      scale={[2, 2, 1]}
      onPointerMove={handlePointerMove as unknown as (e: any) => void}
    >
      <planeGeometry args={[1, 1]} />
      <primitive object={displayMaterial} attach="material" ref={displayMaterialRef} />
    </mesh>
  )
}

export default function HeroFluid() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: false, alpha: false }}
      >
        <FluidSim />
      </Canvas>
    </div>
  )
}
