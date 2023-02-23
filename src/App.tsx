import {
  Environment,
  OrbitControls,
  useAnimations,
  useGLTF,
} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {folder, useControls, button} from 'leva'
import {Schema} from 'leva/dist/declarations/src/types'
import {useCallback, useEffect, useRef} from 'react'
import {Color, MeshBasicMaterial, MeshStandardMaterial, Object3D} from 'three'
import {GLTFExporter} from 'three/examples/jsm/exporters/GLTFExporter'
import {saveAs} from 'file-saver'
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader'

function* colorGenerator(): Generator<string> {
  let i = -1
  const colors = ['ff99c8', 'fcf6bd', 'd0f4de', 'a9def9', 'e4c1f9']
  while (true) {
    // yield i > colors.length ? colors[i] : colors[0]
    i = i < colors.length - 1 ? i + 1 : 0
    yield `#${colors[i]}`
  }
}

function ModelViewer() {
  const {nodes, scene, materials, animations} = useGLTF(
    '/animated-simple-figure-with-sword.gltf',
    // '/animated-simple-figure.gltf',
    // '/wooden_crate_02_4k.gltf',
  )

  const gltfExporter = new GLTFExporter()

  const {ref: modelRef, actions} = useAnimations(animations, scene)

  const actionControls = Object.keys(actions)
    .map((name) => {
      return {
        [name]: {
          value: false,
          onChange: (newValue: boolean) => {
            newValue ? actions[name]?.play() : actions[name]?.stop().reset()
          },
        },
      }
    })
    .reduce((final, c) => ({...c, ...final}), {})

  useControls({
    animations: folder(actionControls, {color: 'yellow'}),
  })

  const colorsIterator = colorGenerator()

  const materialControls = Object.keys(materials)
    .map((name) => {
      const material = materials[name]

      if (material instanceof MeshStandardMaterial) {
        return {
          [name]: folder(
            {
              [`${name}-color`]: {
                label: 'color',
                value: `#${material.color.getHexString()}`,
                onChange: (newValue: string) => {
                  material.color = new Color(newValue)
                },
              },
            },
            {color: colorsIterator.next().value},
          ),
        }
      }
    })
    .reduce((final, c) => ({...c, ...final}))

  useControls({
    materials: folder(
      {
        ...materialControls,
      },
      {color: 'cyan'},
    ),
  })

  useControls({
    saveGLTF: button(() => {
      if (modelRef.current) {
        gltfExporter.parse(
          modelRef.current,
          function (gltfOrGlb) {
            let dataToSave: ArrayBuffer[] | string[]
            let mimeType = 'model/gltf+json; charset=us-ascii'
            let extension = 'gltf'

            if (gltfOrGlb instanceof ArrayBuffer) {
              dataToSave = [gltfOrGlb]
              extension = 'glb'
              mimeType = 'model/gltf-binary'
            } else {
              dataToSave = [JSON.stringify(gltfOrGlb, null, 2)]
            }

            const blob = new Blob(dataToSave, {type: mimeType})

            console.log(blob)
            saveAs(blob, `model.${extension}`)
          },
          console.error,
          {
            animations: animations,
            onlyVisible: true,
            // TODO: Let the user to modify the `binary` option
            binary: false,
          },
        )
      } else {
        throw new Error("Cannot export model: it's undefined.")
      }
    }),
  })

  // TODO: dispose everything from the scene to avoid memory leaks
  // `primitive` will not get disposed automaticallY: https://docs.pmnd.rs/react-three-fiber/api/objects#putting-already-existing-objects-into-the-scene-graph
  // dispose of objects in Three.js: https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects
  return (
    <>
      <primitive object={scene} ref={modelRef}></primitive>
    </>
  )
}

const environmentOptions = [
  'sunset',
  'dawn',
  'night',
  'warehouse',
  'forest',
  'apartment',
  'studio',
  'city',
  'park',
  'lobby',
] as const
type EnvironmentOptionType = typeof environmentOptions[number]

function App() {
  const {environment} = useControls({
    environment: {
      label: 'Environment',
      value: 'apartment',
      options: environmentOptions,
    },
  }) as {environment: EnvironmentOptionType}

  return (
    <div className="App">
      <Canvas>
        <Environment preset={environment} />
        <OrbitControls />
        <ModelViewer />
      </Canvas>
    </div>
  )
}

export default App
