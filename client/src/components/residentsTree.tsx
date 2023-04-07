import { Box, Tooltip } from '@chakra-ui/react';
import type { RenderCustomNodeElementFn } from 'react-d3-tree/lib/types/types/common';
import dynamic from 'next/dynamic';
import { Level, useSpreedTree } from '@/hooks/useSpreedTree';
import residents from '@/data/residents.json';
import { useEffect } from 'react';

const Tree = dynamic(() => import('react-d3-tree'), {
  ssr: false,
});

interface ResidentsTreeProps {
  levels: Level[];
}

const ResidentsTree = ({ levels }: ResidentsTreeProps) => {
  const { tree, setSpreedTree } = useSpreedTree({
    level: levels,
  });

  useEffect(() => {
    setSpreedTree(residents);
  }, [setSpreedTree]);

  const RenderCustomNodeElementFn: RenderCustomNodeElementFn = ({ nodeDatum, toggleNode }) => (
    <Tooltip
      label={`${nodeDatum.name}${
        nodeDatum.attributes?.type ? `, население: ${nodeDatum.attributes?.type}` : ''
      }`}
    >
      <g>
        <rect width='20' height='20' x='-10' onClick={toggleNode} />
        <text fill='black' strokeWidth='1' x='20'>
          {nodeDatum.name}
        </text>
      </g>
    </Tooltip>
  );

  return (
    <Box style={{ width: '100vw', height: '100vh' }}>
      <Tree
        data={tree}
        initialDepth={1}
        orientation='vertical'
        pathFunc='step'
        renderCustomNodeElement={RenderCustomNodeElementFn}
      />
    </Box>
  );
};

export default ResidentsTree;
