import { Cloud } from "@react-three/drei";

export function Fog() {
  return (
    <>
      <Cloud fade={true} growth={5} position={[0, 0, -12]} speed={0.4} opacity={0.2} seed={1} scale={[2, 2, 2]} />
      <Cloud fade={true} growth={5} position={[7, -1, 5]} segments={80} speed={0.6} opacity={0} seed={2} scale={[1, 0.5, 10]} />
      <Cloud fade={true} growth={5} position={[0, -1, 12]} speed={0.8} opacity={0.1} seed={3} scale={[1, 0.5, 1]} />
      <Cloud fade={true} growth={5} position={[-7, -1, 5]} segments={80} speed={0.6} opacity={0.1} seed={4} scale={[1, 0.5, 8]} />
    </>
  );
}
