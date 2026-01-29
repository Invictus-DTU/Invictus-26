
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Lion(props) {
  const { nodes, materials } = useGLTF('/model/lion.glb')
  const greyMaterial = materials.mh_1993_10_6b.clone();
  greyMaterial.color.set('#6b7280');
  
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={greyMaterial} rotation={[-Math.PI/2, -0.1, 1.4]} />
      {/* <mesh geometry={nodes.Object_4.geometry} material={materials.mh_1993_10_6b} rotation={[-Math.PI/2, -0.1, 1.4]} /> */}
    </group>
  )
}

useGLTF.preload('/model/lion.glb')
