import { AnchorButton, Button, ButtonGroup } from "@blueprintjs/core";

export default function ToolBar() {
    return <ButtonGroup className={"bp4-fill"} >
        <Button icon="database" text={"Queries"} />
        <Button icon="function" text={"Functions"} />
        <AnchorButton
            icon="cog"
            rightIcon="settings"
            text={"Options"}
        />
    </ButtonGroup>
}