import { Text, Slider, Stack, rem } from "@mantine/core";
import { createDeck } from "@/utils";
import { IconPlayCard } from "@tabler/icons-react";

type InitialPosSliderProps = {
  initialPos: number;
  setInitialPos: (n: number) => void;
};

export const InitialPosSlider = ({
  initialPos,
  setInitialPos,
}: InitialPosSliderProps) => {
  return (
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
  );
};
