import { PerspectiveCamera, Sky, View } from "@react-three/drei";
import Stadium from "../../components/models/in-game/Stadium";

const BallScene = ({
  track,
}: {
  track: React.MutableRefObject<HTMLElement | null>;
}) => {
  return (
    <View index={1} track={track as React.MutableRefObject<HTMLElement>}>
      <Sky sunPosition={[-20, 10, 0]} />

      <PerspectiveCamera
        makeDefault
        position={[-5, -1, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        fov={45}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stadium position={[0, -13.363, 0]} />
      <mesh position={[0, -2, 0]} rotation={[0, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>
    </View>
  );
};

export default BallScene;
