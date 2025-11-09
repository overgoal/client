import { useEffect } from "react";
import { useParams } from "react-router";

const ClaimScreen = () => {
  const { id } = useParams();
  useEffect(() => {
    console.log(id, "id");
  }, [id]);

  return <div>{id}</div>;
};

export default ClaimScreen;
