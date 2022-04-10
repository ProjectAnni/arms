import { Classes, Icon, Intent, TreeNodeInfo, Tree } from "@blueprintjs/core";

export default function () {
  return (
    <Tree
      contents={[{ id: "1", label: "2" }]}
      // onNodeClick={handleNodeClick}
      // onNodeCollapse={handleNodeCollapse}
      // onNodeExpand={handleNodeExpand}
      className={Classes.ELEVATION_0}
    />
  );
}
