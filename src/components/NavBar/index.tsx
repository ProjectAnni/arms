import {
  Classes,
  Navbar,
  NavbarHeading,
  NavbarGroup,
  AnchorButton,
  NavbarDivider,
  Alignment,
} from "@blueprintjs/core";

export default function NavBar() {
  return (
    <Navbar className={Classes.DARK}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>ARMS</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <NavbarDivider />
        <AnchorButton
          href="http://blueprintjs.com/docs"
          text="Docs"
          target="_blank"
          minimal
          rightIcon="share"
        />
        <AnchorButton
          href="http://github.com/palantir/blueprint"
          text="Github"
          target="_blank"
          minimal
          rightIcon="code"
        />
      </NavbarGroup>
    </Navbar>
  );
}
