import { visit } from "unist-util-visit";
import { SKIP } from "unist-util-visit";

export function addFootnotesHeading() {
  return (tree: any) => {
    let inserted = false;

    visit(tree, "footnoteDefinition", (node, index, parent) => {
      if (!inserted && parent && typeof index === "number") {
        // Insert the heading immediately before the first footnote definition
        parent.children.splice(index, 0, {
          type: "heading",
          depth: 3, // This makes it an H3 heading
          children: [
            {
              type: "text",
              value: "Footnotes",
            },
          ],
        });
        inserted = true; // Ensure we only insert the heading once
        return SKIP; // Stop further traversal
      }
    });
  };
}
