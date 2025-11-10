import { useParams } from "react-router";
import CardScreen from "./CardScreen";

const ClaimScreen = () => {
  const { id } = useParams();


  return <CardScreen playerLinkId={id || ""} />;
};

export default ClaimScreen;
