export default function Lights() {
  return (
    <>
      <ambientLight intensity={1} />
      {/* <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={2} /> */}
    </>
  );
}
