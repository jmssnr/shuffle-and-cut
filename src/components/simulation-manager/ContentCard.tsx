import { Card, Group } from "@mantine/core";

type ContentCardProps = {
  topBar?: React.ReactNode;
  children: React.ReactNode;
  bottomBar?: React.ReactNode;
};

export const ContentCard = ({
  topBar,
  bottomBar,
  children,
}: ContentCardProps) => {
  return (
    <Card
      withBorder
      shadow="sm"
      style={{
        minHeight: "100px",
        height: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {topBar && (
        <Card.Section inheritPadding py="xs" withBorder>
          {topBar}
        </Card.Section>
      )}
      <Card.Section
        inheritPadding
        py="xs"
        withBorder
        style={{ flex: "1 1 auto", overflow: "auto" }}
      >
        {children}
      </Card.Section>
      {bottomBar && (
        <Card.Section inheritPadding py="xs" withBorder>
          {bottomBar}
        </Card.Section>
      )}
    </Card>
  );
};
