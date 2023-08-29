import { Paper, Group, Anchor, ActionIcon } from "@mantine/core";
import { useRouter } from "next/router";
import { IconBrandGithub, IconBrandInstagram } from "@tabler/icons-react";
export const Header = () => {
  const router = useRouter();

  return (
    <Paper p="xs" style={{ height: 50 }} shadow="sm">
      <Group align="center" position="apart">
        <Anchor
          underline={false}
          variant="gradient"
          gradient={{ from: "indigo", to: "blue", deg: 45 }}
          sx={{ fontFamily: "Greycliff CF, sans-serif" }}
          fz="xl"
          fw={700}
          onClick={() => router.push("/")}
        >
          shuffl.
        </Anchor>
        <Group>
          <ActionIcon>
            <IconBrandGithub
              href="https://github.com/jmssnr/shuffle-and-cut"
              size="1.1rem"
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon>
            <IconBrandInstagram
              href="https://www.instagram.com/the_phantom_at_the_card_table"
              size="1.1rem"
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
};
