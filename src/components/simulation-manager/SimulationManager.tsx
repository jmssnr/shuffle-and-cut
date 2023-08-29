import { Group, Card, Button, rem, Text, Slider, Stack } from "@mantine/core";
import { createDeck } from "@/utils";
import { IconPlayCard, IconSquarePlus, IconTrash } from "@tabler/icons-react";
import { BarChart } from "../BarChart";
import { AddModelDrawer } from "./AddModelDrawer";
import { useDisclosure, useListState } from "@mantine/hooks";
import { Model } from "./types";
import { useState } from "react";
import { ModelTable } from "./ModelTable";

export const SimulationManager = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [models, modelsHandlers] = useListState<Model>([]);
  const [initialPos, setInitialPos] = useState(1);
  const [simResult, setSimResult] = useState([]);
  const [firstClick, setFirstClick] = useState(0);
  const [firstSim, setFirstSim] = useState(0);

  const disableSimulateButton = () => {
    return models
      .map((model) => model.isSelected == true && model.id)
      .filter(Boolean).length == 0
      ? true
      : false;
  };

  const runSimulation = () => {
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
    //@ts-ignore
    Promise.all(promises).then((res) => setSimResult(res));
  };

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
      <Card
        withBorder
        shadow="sm"
        padding="xs"
        style={{
          minHeight: "500px",
          height: "calc(100vh - 70px)",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {firstClick == 0 ? (
          <div style={{ margin: "auto", textAlign: "center" }}>
            <Text color="dimmed" p="sm">
              Start by creating your first shuffle model
            </Text>
            <Button leftIcon={<IconSquarePlus size="1rem" />} onClick={open}>
              Create Model
            </Button>
          </div>
        ) : (
          <>
            <Card.Section inheritPadding py="xs" withBorder>
              <Group position="apart">
                <Button
                  onClick={open}
                  leftIcon={<IconSquarePlus size="1rem" />}
                >
                  Add Model
                </Button>
                <Button
                  disabled={models.length == 0}
                  onClick={() => modelsHandlers.setState([])}
                  color="pink"
                  leftIcon={<IconTrash size="1rem" />}
                >
                  Clear Models
                </Button>
              </Group>
            </Card.Section>
            <Card.Section style={{ flex: "1 1 auto" }}>
              <ModelTable models={models} modelsHandlers={modelsHandlers} />
            </Card.Section>
            <Card.Section withBorder p="xs">
              <Group>
                <Button
                  onClick={runSimulation}
                  disabled={disableSimulateButton()}
                >
                  Simulate
                </Button>
              </Group>
            </Card.Section>{" "}
          </>
        )}
      </Card>
      <Card
        withBorder
        shadow="sm"
        style={{ minHeight: "500px", height: "calc(100vh - 70px)" }}
      >
        {firstSim == 0 ? (
          <div
            style={{
              minHeight: "500px",
              height: "calc(100vh - 70px)",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              margin: "auto",
            }}
          >
            <Text color="dimmed">
              Create a model and then start your simulation to visualize the
              results
            </Text>
          </div>
        ) : (
          <>
            <Stack>
              <Text>Initial Card Location</Text>
              <Slider
                thumbChildren={<IconPlayCard size="1rem" />}
                defaultValue={1}
                min={1}
                max={52}
                step={1}
                value={initialPos}
                onChange={setInitialPos}
                thumbSize={26}
                styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
                marks={createDeck(52).map((card) => {
                  return { value: card };
                })}
              />
            </Stack>
            <div style={{ marginTop: "25px", height: "80%" }}>
              <BarChart
                xLabel="Card Location"
                yLabel="Probability Density"
                //@ts-ignore
                data={simResult}
                initialPos={initialPos}
              />
            </div>
          </>
        )}
      </Card>
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

  //   return (
  //     <Grid style={{ margin: "2px" }}>
  //       <Grid.Col span={12} md={5} style={{ minHeight: "calc(100vh - 60px)" }}>
  //         <Card withBorder shadow="sm" style={{ height: "100%" }}>
  //           Left
  //         </Card>
  //       </Grid.Col>
  //       <Grid.Col span={12} md={7} style={{ minHeight: "calc(100vh - 60px)" }}>
  //         <Card withBorder shadow="sm">
  //           <div style={{ height: "100%" }}>
  //             <BarChart xLabel="Prob" yLabel="Pos" data={[]} initialPos="1" />
  //           </div>
  //         </Card>
  //       </Grid.Col>
  //     </Grid>
  //   );
};
// export const SimulationManager = () => {
//   return (
//     <Grid style={{ margin: "2px" }}>
//       <Grid.Col span={12} md={5} style={{ minHeight: "calc(100vh - 60px)" }}>
//         <Card
//           withBorder
//           shadow="sm"
//           padding="xs"
//           style={{
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//             width: "100%",
//           }}
//         >
//           <Card.Section inheritPadding py="xs" withBorder>
//             <Group position="apart">
//               <Button leftIcon={<IconSquarePlus size="1rem" />}>
//                 Add Model
//               </Button>
//               <Button
//                 disabled
//                 color="pink"
//                 leftIcon={<IconTrash size="1rem" />}
//               >
//                 Clear Models
//               </Button>
//             </Group>
//           </Card.Section>
//           <Card.Section style={{ flex: "1 1 auto" }}>Table</Card.Section>
//           <Card.Section withBorder p="xs">
//             <Group>
//               <Button disabled>Simulate</Button>
//             </Group>
//           </Card.Section>
//         </Card>
//       </Grid.Col>
//       <Grid.Col span={12} md={7} style={{ minHeight: "calc(100vh - 60px)" }}>
//         <Card withBorder shadow="sm" padding="xs" style={{ height: "100%" }}>
//           <Card.Section inheritPadding py="lg">
//             <Tabs defaultValue={"prob"}>
//               <Tabs.List>
//                 <Tabs.Tab value="prob">Probability</Tabs.Tab>
//                 <Tabs.Tab value="var">Variability</Tabs.Tab>
//               </Tabs.List>

//               <Tabs.Panel value="prob">
//                 <Stack justify="space-between">
//                   <Text fw={600}>Initial Location</Text>
//                   <Slider
//                     thumbChildren={<IconPlayCard size="1rem" />}
//                     defaultValue={1}
//                     min={1}
//                     max={52}
//                     step={1}
//                     thumbSize={26}
//                     styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
//                     marks={createDeck(52).map((card) => {
//                       return { value: card };
//                     })}
//                   />
//                   <BarChart data={[]} initialPos="1" />
//                 </Stack>
//               </Tabs.Panel>

//               <Tabs.Panel value="var">
//                 <BarChart data={[]} initialPos="1" />
//               </Tabs.Panel>
//             </Tabs>
//           </Card.Section>
//         </Card>
//       </Grid.Col>
//     </Grid>
//   );
// };
