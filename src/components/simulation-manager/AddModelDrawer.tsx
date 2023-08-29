import { Drawer, Text, Button, Group, Stack } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";
import { Model, Shuffle } from "./types";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createStyles, rem } from "@mantine/core";
import { IconGripVertical } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
    paddingLeft: `calc(${theme.spacing.xl} - ${theme.spacing.md})`, // to offset drag handle
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    zIndex: 1000,
    top: "auto !important",
    left: "auto !important",
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: rem(30),
    fontWeight: 700,
    width: rem(60),
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

type AddModelDrawerProps = {
  opened: boolean;
  close: () => void;
  models: Model[];
  modelsHandlers: UseListStateHandlers<Model>;
  firstClick: number;
  setFirstClick: (n: number) => void;
};

export const AddModelDrawer = ({
  opened,
  close,
  models,
  modelsHandlers,
  firstClick,
  setFirstClick,
}: AddModelDrawerProps) => {
  const [steps, stepsHandlers] = useListState<Shuffle>([]);
  const { classes, cx } = useStyles();

  const items = steps.map((item, index) => (
    <Draggable
      key={`${item.id}-${index}`}
      index={index}
      draggableId={`${item.id}-${index}`}
    >
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical size="1.05rem" stroke={1.5} />
          </div>
          <div>
            <Text>{item.name}</Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <Drawer
      position="right"
      withCloseButton={false}
      opened={opened}
      onClose={close}
      title={
        <Text fw={700} fz="xl" color="blue">
          Create Model
        </Text>
      }
    >
      <Stack justify="space-between">
        <Text color="dimmed">
          Your model can consist of three different shuffle types: Riffle, Strip
          or Cut. Start by adding a few different steps and use the drag handles
          to change the step position if necessary.
        </Text>

        <Group position="apart">
          <Button.Group>
            <Button
              variant="outline"
              onClick={() => {
                stepsHandlers.append({ id: "riffle", name: "Riffle" });
              }}
            >
              Riffle
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                stepsHandlers.append({ id: "strip", name: "Strip" });
              }}
            >
              Strip
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                stepsHandlers.append({ id: "cut", name: "Cut" });
              }}
            >
              Cut
            </Button>
          </Button.Group>
          <Button
            onClick={() => stepsHandlers.setState([])}
            disabled={steps.length == 0 ? true : false}
          >
            Clear
          </Button>
        </Group>
        {steps.length == 0 ? (
          <div
            style={{
              height: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text color="dimmed">
              Start creating your model by adding a shuffle
            </Text>
          </div>
        ) : (
          <DragDropContext
            onDragEnd={({ destination, source }) =>
              stepsHandlers.reorder({
                from: source.index,
                to: destination?.index || 0,
              })
            }
          >
            <Droppable droppableId="dnd-list" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {items}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        <Group position="right">
          <Button
            onClick={() => {
              modelsHandlers.append({
                id: models.length + 1,
                steps: steps,
                isSelected: true,
              });
              firstClick == 0 && setFirstClick(1);
              close();
              stepsHandlers.setState([]);
            }}
            disabled={steps.length == 0 && true}
          >
            Save
          </Button>
          <Button onClick={close}>Cancel</Button>
        </Group>
      </Stack>
    </Drawer>
  );
};
