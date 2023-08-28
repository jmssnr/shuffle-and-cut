import {
  Group,
  Card,
  Tabs,
  Button,
  Grid,
  rem,
  Text,
  Slider,
  Stack,
} from "@mantine/core";
import { createDeck } from "@/utils";
import { IconPlayCard, IconSquarePlus, IconTrash } from "@tabler/icons-react";
import { BarChart } from "../BarChart";

export const SimulationManager = () => {
  return (
    <Grid style={{ margin: "2px" }}>
      <Grid.Col span={12} md={5} style={{ minHeight: "calc(100vh - 60px)" }}>
        <Card
          withBorder
          shadow="sm"
          padding="xs"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Card.Section inheritPadding py="xs" withBorder>
            <Group position="apart">
              <Button leftIcon={<IconSquarePlus size="1rem" />}>
                Add Model
              </Button>
              <Button
                disabled
                color="pink"
                leftIcon={<IconTrash size="1rem" />}
              >
                Clear Models
              </Button>
            </Group>
          </Card.Section>
          <Card.Section style={{ flex: "1 1 auto" }}>Table</Card.Section>
          <Card.Section withBorder p="xs">
            <Group>
              <Button disabled>Simulate</Button>
            </Group>
          </Card.Section>
        </Card>
      </Grid.Col>
      <Grid.Col span={12} md={7} style={{ minHeight: "calc(100vh - 60px)" }}>
        <Card withBorder shadow="sm" padding="xs" style={{ height: "100%" }}>
          <Card.Section inheritPadding py="lg">
            <Tabs defaultValue={"prob"}>
              <Tabs.List>
                <Tabs.Tab value="prob">Probability</Tabs.Tab>
                <Tabs.Tab value="var">Variability</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="prob">
                <Stack justify="space-between">
                  <Text fw={600}>Initial Location</Text>
                  <Slider
                    thumbChildren={<IconPlayCard size="1rem" />}
                    defaultValue={1}
                    min={1}
                    max={52}
                    step={1}
                    thumbSize={26}
                    styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
                    marks={createDeck(52).map((card) => {
                      return { value: card };
                    })}
                  />
                  <BarChart data={[]} initialPos="1" />
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="var">
                <BarChart data={[]} initialPos="1" />
              </Tabs.Panel>
            </Tabs>
          </Card.Section>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
