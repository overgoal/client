import { Connector } from "@starknet-react/core";
import { ControllerConnector } from "@cartridge/connector";
import { ControllerOptions } from "@cartridge/controller";
import { constants } from "starknet";
import { manifest } from "./manifest";

const { VITE_PUBLIC_DEPLOY_TYPE } = import.meta.env;

console.log("VITE_PUBLIC_DEPLOY_TYPE", VITE_PUBLIC_DEPLOY_TYPE);

const getRpcUrl = () => {
  switch (VITE_PUBLIC_DEPLOY_TYPE) {
    case "localhost":
      return "http://localhost:5050"; // Katana localhost default port
    case "mainnet":
      return "https://api.cartridge.gg/x/starknet/mainnet";
    case "sepolia":
      return "https://api.cartridge.gg/x/starknet/sepolia";
    default:
      return "https://api.cartridge.gg/x/starknet/sepolia";
  }
};

const getDefaultChainId = () => {
  switch (VITE_PUBLIC_DEPLOY_TYPE) {
    case "localhost":
      return "0x4b4154414e41"; // KATANA in ASCII
    case "mainnet":
      return constants.StarknetChainId.SN_MAIN;
    case "sepolia":
      return constants.StarknetChainId.SN_SEPOLIA;
    default:
      return constants.StarknetChainId.SN_SEPOLIA;
  }
};

const getGameContractAddress = () => {
  return manifest.contracts[0].address;
};

const CONTRACT_ADDRESS_GAME = getGameContractAddress();

const policies = {
  contracts: {
    [CONTRACT_ADDRESS_GAME]: {
      methods: [
        { name: "create_player", entrypoint: "create_player" },
        { name: "update_attributes", entrypoint: "update_attributes" },
        { name: "add_currency", entrypoint: "add_currency" },
        { name: "spend_currency", entrypoint: "spend_currency" },
        { name: "record_login", entrypoint: "record_login" },
      ],
    },
  },
};

const options: ControllerOptions = {
  chains: [{ rpcUrl: getRpcUrl() }],
  defaultChainId: getDefaultChainId(),
  policies,
  namespace: "full_starter_react",
  slot: "full-starter-react",
};

const cartridgeConnector = new ControllerConnector(
  options,
) as never as Connector;

export default cartridgeConnector;
