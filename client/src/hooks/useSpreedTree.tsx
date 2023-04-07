import { useState } from 'react';
import { RawNodeDatum } from 'react-d3-tree/lib/types/types/common';
import { root } from '@/data/treeInitialData';

interface Group {
  type: string;
  name: string;
}

export interface Level {
  type: string;
}

export interface Resident {
  name: string;
  groups: Group[];
}

export interface TreeOptions {
  level: Level[];
}

const spreedTree = (root: RawNodeDatum, residents: Resident[], levels: Level[]) => {
  residents.map((resident) => {
    let currentNode = root;

    levels.map((level) => {
      const group = resident.groups.find((residentGroup) => residentGroup.type === level.type);

      if (!group) return;

      let node = currentNode.children?.find((node) => node.name === group.name);

      if (!node) {
        node = { name: group.name, attributes: { type: level.type }, children: [] };
        currentNode.children?.push(node);
      }

      currentNode = node;
    });

    const newResident: RawNodeDatum = { name: resident.name };
    currentNode.children?.push(newResident);
  });

  return root;
};

export const useSpreedTree = (treeOptions: TreeOptions) => {
  const { level } = treeOptions;

  const [tree, setTree] = useState<RawNodeDatum>(root);

  const setSpreedTree = (residents: Resident[]) => {
    setTree(spreedTree(tree, residents, level));
  };

  return { tree, setSpreedTree };
};
