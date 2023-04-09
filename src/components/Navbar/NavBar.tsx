import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/Logo/logo.webp";
import SearchInput from "../Search/SearchInput";
import ColorModeSwitch from "../Theme/ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Image src={logo} boxSize="60px" />
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
