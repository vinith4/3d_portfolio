export interface TechNode {
  name: string;
  icon: string;
}

export interface PositionedTechNode extends TechNode {
  x: number;
  y: number;
  ring: "inner" | "outer";
}