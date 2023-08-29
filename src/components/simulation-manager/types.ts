export type Shuffle = {
  id: string;
  name: string;
  url?: string;
};

export type Model = {
  id: number;
  steps: Shuffle[];
  isSelected: boolean;
  url?: string;
};
