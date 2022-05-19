import React, { useEffect, useRef } from "react";
import {
  Box,
  Center,
  forwardRef,
  HStack,
  useMergeRefs,
} from "@chakra-ui/react";
import { applyTheme, Theme } from "@material/material-color-utilities";

export interface PreviewMDThemeProps {
  theme: Theme;
}

const sharedStyles = {
  w: "100px",
  h: "100px",
  borderWidth: "2px",
  borderStyle: "solid",
  borerColor: "white",
  fontSize: "xs",
  textAlign: "center",
};

const Primary = () => (
  <Center
    sx={{
      ...sharedStyles,
      backgroundColor: "var(--md-sys-color-primary)",
      color: "var(--md-sys-color-on-primary)",
    }}
  >
    Primary + onPrimary
  </Center>
);
const PrimaryContainer = () => (
  <Center
    sx={{
      ...sharedStyles,
      backgroundColor: "var(--md-sys-color-primary-container)",
      color: "var(--md-sys-color-on-primary-container)",
    }}
  >
    Primary Container + onPrimary Container
  </Center>
);
const Secondary = () => (
  <Center
    sx={{
      ...sharedStyles,
      backgroundColor: "var(--md-sys-color-secondary)",
      color: "var(--md-sys-color-on-secondary)",
    }}
  >
    Secondary + onSecondary
  </Center>
);
const SecondaryContainer = () => (
  <Center
    sx={{
      ...sharedStyles,
      backgroundColor: "var(--md-sys-color-secondary-container)",
      color: "var(--md-sys-color-on-secondary-container)",
    }}
  >
    Secondary Container + onSecondary Container
  </Center>
);
const Tertiary = () => (
  <Center
    sx={{
      ...sharedStyles,
      backgroundColor: "var(--md-sys-color-tertiary)",
      color: "var(--md-sys-color-on-tertiary)",
    }}
  >
    Tertiary + onTertiary
  </Center>
);
const TertiaryContainer = () => (
  <Center
    sx={{
      ...sharedStyles,
      backgroundColor: "var(--md-sys-color-tertiary-container)",
      color: "var(--md-sys-color-on-tertiary-container)",
    }}
  >
    Tertiary Container + onTertiary Container
  </Center>
);

export const PreviewMDTheme = forwardRef<PreviewMDThemeProps, "div">(
  ({ theme, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement | null>(null);
    const refs = useMergeRefs(internalRef, ref);

    useEffect(() => {
      if (!refs || !internalRef.current || !theme) {
        return;
      }

      applyTheme(theme, { target: internalRef.current });
    }, [refs, theme]);

    return (
      <Box ref={refs}>
        <HStack spacing={4}>
          <Primary />
          <PrimaryContainer />
          <Secondary />
          <SecondaryContainer />
          <Tertiary />
          <TertiaryContainer />
        </HStack>
      </Box>
    );
  }
);
