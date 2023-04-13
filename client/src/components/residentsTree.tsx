import type { RawNodeDatum, RenderCustomNodeElementFn } from 'react-d3-tree/lib/types/types/common';
import { Box, Tooltip } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Resident, GroupType } from '@/interfaces/resident.interface';
import { ResidentsContext } from '@/context/residentsContext';
import clone from 'clone';

const Tree = dynamic(() => import('react-d3-tree'), {
  ssr: false,
});

export const initialRoot: RawNodeDatum = {
  name: 'Жители',
  children: [],
};

const ResidentsTree = () => {
  const { residents } = useContext(ResidentsContext);
  const [tree, setTree] = useState<RawNodeDatum | RawNodeDatum[] | null>(null);

  useEffect(() => {
    const spreadTree = residents.reduce<RawNodeDatum>(
      (acc, resident) => {
        return addResident(acc, resident);
      },
      { ...initialRoot },
    );

    setTree(spreadTree);
  }, [residents]);

  const RenderCustomNodeElementFn: RenderCustomNodeElementFn = ({ nodeDatum, toggleNode }) => (
    <Tooltip
      label={
        nodeDatum.attributes?.city
          ? `${nodeDatum.attributes.city}, население: ${nodeDatum.attributes?.data}`
          : nodeDatum.name
      }
    >
      <g>
        <rect width='20' height='20' x='-10' onClick={toggleNode} />
        <text fill='black' strokeWidth='1' x='20'>
          {nodeDatum.name}
        </text>
      </g>
    </Tooltip>
  );

  if (!tree) return null;

  return (
    <Tree
      data={tree}
      orientation='vertical'
      pathFunc='step'
      renderCustomNodeElement={RenderCustomNodeElementFn}
    />
  );
};

export default ResidentsTree;

export function addResident(tree: RawNodeDatum, resident: Resident) {
  const { city, groups, name } = resident;
  let currentNode = tree;

  Object.values(GroupType).forEach((level) => {
    const group = groups.find((residentGroup) => residentGroup.type === level);

    if (!group) throw new Error('Invalid groups');

    let node = currentNode.children?.find((node) => node.name === group.name);

    if (!node) {
      node = { name: group.name, attributes: { type: level }, children: [] };
      currentNode.children?.push(node);
    }

    currentNode = node;
  });

  const newResident: RawNodeDatum = {
    name,
    attributes: {
      city: city.name,
      data: city.data,
    },
  };
  currentNode.children?.push(newResident);

  return tree;
}
