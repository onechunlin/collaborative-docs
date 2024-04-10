import { CustomElement, ParagraphElement } from '@/typings/editor';
import {
  Descendant,
  Editor,
  Node,
  Path,
  Element as SlateElement,
  Transforms,
} from 'slate';

export interface EnforceTypeConfig {
  child: Descendant;
  childPath: Path;
  type: CustomElement['type'];
}

export const withLayout = (e: Editor): Editor => {
  const { normalizeNode } = e;

  const enforceType = (config: EnforceTypeConfig) => {
    const { child, childPath, type } = config;
    if (SlateElement.isElement(child) && child.type !== type) {
      const newProperties: Partial<SlateElement> = { type };
      Transforms.setNodes<SlateElement>(e, newProperties, {
        at: childPath,
      });
    }
  };

  e.normalizeNode = ([node, path]) => {
    const isTopLevel = path.length === 0;
    if (isTopLevel) {
      if (e.children.length === 1) {
        // 如果只有一个 title 节点，则在其后插入一个 paragraph 节点
        const paragraph: ParagraphElement = {
          type: 'paragraph',
          children: [{ text: '' }],
        };
        Transforms.insertNodes(e, paragraph, { at: path.concat(1) });
      }

      // 遍历子节点，确保第一个节点是 title，其他的不是
      for (const [child, childPath] of Node.children(e, path)) {
        const slateIndex = childPath[0];
        switch (slateIndex) {
          case 0:
            enforceType({
              child,
              childPath,
              type: 'title',
            });
            break;
          default:
            // 除了第一个节点外，其他节点都不应该是 title
            if (SlateElement.isElement(child) && child.type === 'title') {
              enforceType({
                child,
                childPath,
                type: 'paragraph',
              });
            }
            break;
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return e;
};
