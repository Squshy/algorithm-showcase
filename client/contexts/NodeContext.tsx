import React, { useState, useContext } from "react";
import { Node } from "../classes/Node";

export const NodeContext = React.createContext<Array<Array<Node>>>([[]]);
export const NodeUpdateContext = React.createContext<
  (nodes: Array<Array<Node>>) => void
>(() => {});

export const useNodeContext = () => {
  return useContext(NodeContext);
};

export const useNodeUpdateContext = () => {
  return useContext(NodeUpdateContext);
};

export const NodeProvider: React.FC = ({ children }) => {
  const [nodes, setNodes] = useState<Array<Array<Node>>>([[]]);

  const addNodes = (nodes: Array<Array<Node>>) => {
    setNodes(nodes);
  };

  return (
    <NodeContext.Provider value={nodes}>
      <NodeUpdateContext.Provider value={addNodes}>
        {children}
      </NodeUpdateContext.Provider>
    </NodeContext.Provider>
  );
};
