import {
  Group,
  Card,
  Button,
  rem,
  Text,
  Slider,
  Stack,
  ScrollArea,
  useMantineTheme,
  LoadingOverlay,
} from "@mantine/core";
import { createDeck } from "@/utils";
import {
  IconPlayCard,
  IconSquarePlus,
  IconTrash,
  IconChartHistogram,
} from "@tabler/icons-react";
import { BarChart } from "../BarChart";
import { AddModelDrawer } from "./AddModelDrawer";
import { useDisclosure, useListState } from "@mantine/hooks";
import { Model } from "./types";
import { useState } from "react";
import { ModelTable } from "./ModelTable";
import { ContentCard } from "./ContentCard";
import { InitialPosSlider } from "./InitialPosSlider";

export const SimulationManager = () => {
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const [models, modelsHandlers] = useListState<Model>([]);
  const [initialPos, setInitialPos] = useState(1);
  const [simResult, setSimResult] = useState([]);
  const [firstClick, setFirstClick] = useState(0);
  const [firstSim, setFirstSim] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleDisableSimulate = () => {
    return models.filter((model) => model.isSelected == true).length == 0;
  };

  const handleClearModels = () => {
    modelsHandlers.setState([]);
    setFirstSim(0);
  };

  const handleSimulate = () => {
    setIsLoading(true);
    setFirstSim(1);
    const promises = models
      .filter((model) => model.isSelected == true)
      .map((model) => {
        return fetch("/api/simulate-shuffle-sequence", {
          method: "POST",
          body: JSON.stringify({
            id: model.id.toString(),
            repeats: 1000,
            steps: model.steps,
          }),
          headers: {
            // ***
            "Content-Type": "application/json", // ***
          },
        }).then((res) => res.json());
      });
    Promise.all(promises)
      //@ts-ignore
      .then((res) => setSimResult(res))
      .then(() => setIsLoading(false));
  };

  console.log(isLoading);

  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        margin: "10px",
        gap: "10px",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      }}
    >
      <ContentCard
        topBar={
          firstClick != 0 && (
            <Group position="apart">
              <Button onClick={open}>Add Model</Button>
              <Button onClick={handleClearModels}>Clear Models</Button>
            </Group>
          )
        }
        bottomBar={
          firstClick != 0 && (
            <Button onClick={handleSimulate} disabled={handleDisableSimulate()}>
              Simulate
            </Button>
          )
        }
      >
        {firstClick == 0 ? (
          <Stack align="center" justify="center" h={"100%"}>
            <Text color="dimmed" p="sm">
              Start by creating your first shuffle model
            </Text>
            <Button leftIcon={<IconSquarePlus size="1rem" />} onClick={open}>
              Create Model
            </Button>
          </Stack>
        ) : (
          <ScrollArea>
            <ModelTable models={models} modelsHandlers={modelsHandlers} />
          </ScrollArea>
        )}
      </ContentCard>
      <ContentCard
        topBar={
          firstSim != 0 && (
            <InitialPosSlider
              initialPos={initialPos}
              setInitialPos={setInitialPos}
            />
          )
        }
      >
        {firstSim == 0 ? (
          <Stack align="center" justify="center" h={"100%"}>
            <IconChartHistogram
              size="150"
              stroke="0.8"
              color={theme.colors.gray[4]}
            />
          </Stack>
        ) : (
          <>
            <LoadingOverlay visible={isLoading} />
            <BarChart
              xLabel="Card Location"
              yLabel="Probability Density"
              //@ts-ignore
              data={simResult}
              initialPos={initialPos}
            />
          </>
        )}
      </ContentCard>
      <AddModelDrawer
        opened={opened}
        close={close}
        models={models}
        modelsHandlers={modelsHandlers}
        firstClick={firstClick}
        setFirstClick={setFirstClick}
      />
    </div>
  );
};
