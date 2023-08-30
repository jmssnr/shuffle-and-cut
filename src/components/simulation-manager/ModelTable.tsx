import { Table, Checkbox, Group, Button } from "@mantine/core";
import { Model } from "./types";
import { UseListStateHandlers } from "@mantine/hooks";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor: theme.colors[theme.primaryColor][0],
  },
}));

type ModelTableProps = {
  models: Model[];
  modelsHandlers: UseListStateHandlers<Model>;
};

const countShuffleTypes = (model: Model) => {
  const shuffleTypeCounts: { [shuffleType: string]: number } = {
    riffle: 0,
    strip: 0,
    cut: 0,
  };

  model.steps.forEach((step) => {
    if (step.id in shuffleTypeCounts) {
      shuffleTypeCounts[step.id]++;
    }
  });

  return shuffleTypeCounts;
};

export const ModelTable = ({ models, modelsHandlers }: ModelTableProps) => {
  const { classes, cx } = useStyles();

  const toggleRow = (id: number) => {
    modelsHandlers.setItemProp(id, "isSelected", !models[id].isSelected);
  };

  return (
    <Table verticalSpacing="sm" sx={{ minWidth: 500 }}>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th># Riffles</th>
          <th># Strips</th>
          <th># Cuts</th>
        </tr>
      </thead>
      <tbody>
        {models.map(function (d, idx) {
          const counts = countShuffleTypes(d);

          return (
            <tr
              key={idx}
              className={d.isSelected ? classes.rowSelected : undefined}
            >
              <th>
                <Checkbox
                  checked={d.isSelected}
                  onChange={() => toggleRow(d.id - 1)}
                />
              </th>
              <th>Model-{d.id}</th>
              <th>{counts.riffle}</th>
              <th>{counts.strip}</th>
              <th>{counts.cut}</th>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
