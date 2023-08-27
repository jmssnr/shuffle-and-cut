import { Container, Text, Button, Group } from "@mantine/core";
import useStyles from "./HeroSection.styles";
import { useRouter } from "next/router";

export const HeroSection = () => {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Model. Simulate. Analyze.
          </Text>
        </h1>

        <Text className={classes.description} color="dimmed">
          With shuffl you can build complex playing card shuffling sequences,
          simulate them within seconds and interactively analyze the resulting
          probability distributions.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            onClick={() => router.push("/simulation")}
          >
            Get started
          </Button>
        </Group>
      </Container>
    </div>
  );
};
