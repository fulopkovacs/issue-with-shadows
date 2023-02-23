/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 public/Barracks_SecondAge_Level3.gltf -i -s -t
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube003: THREE.Mesh
    Cube003_1: THREE.Mesh
    Cube003_2: THREE.Mesh
    Cube003_3: THREE.Mesh
    Cube003_4: THREE.Mesh
    Cube003_5: THREE.Mesh
    Cube003_6: THREE.Mesh
    Cube003_7: THREE.Mesh
    Cube003_8: THREE.Mesh
  }
  materials: {
    Wood: THREE.MeshStandardMaterial
    Wood_Light: THREE.MeshStandardMaterial
    Stone: THREE.MeshStandardMaterial
    Walls: THREE.MeshStandardMaterial
    Stone_Light: THREE.MeshStandardMaterial
    Main: THREE.MeshStandardMaterial
    Gold: THREE.MeshStandardMaterial
    Metal_Light: THREE.MeshStandardMaterial
    White: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/Barracks_SecondAge_Level3-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Cube003.geometry} material={materials.Wood} />
      <mesh castShadow receiveShadow geometry={nodes.Cube003_1.geometry} material={materials.Wood_Light} />
      <mesh castShadow receiveShadow geometry={nodes.Cube003_2.geometry} material={materials.Stone} />
      <mesh castShadow receiveShadow geometry={nodes.Cube003_3.geometry} material={materials.Walls} />
      <mesh castShadow receiveShadow geometry={nodes.Cube003_4.geometry} material={materials.Stone_Light} />
      <mesh castShadow receiveShadow geometry={nodes.Cube003_5.geometry} material={materials.Main} />
      <mesh castShadow receiveShadow geometry={nodes.Cube003_6.geometry} material={materials.Gold} />
      <mesh castShadow receiveShadow geometry={nodes.Cube003_7.geometry} material={materials.Metal_Light} />
      <mesh castShadow receiveShadow geometry={nodes.Cube003_8.geometry} material={materials.White} />
    </group>
  )
}

useGLTF.preload('/Barracks_SecondAge_Level3-transformed.glb')