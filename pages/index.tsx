import { MouseEvent, useEffect, useRef } from "react";
import type { NextPage } from "next";
import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  applyTheme,
  Hct,
  sourceColorFromImage,
  Theme,
  themeFromImage,
  themeFromSourceColor,
} from "@material/material-color-utilities";

import data from "./data.json";
import { useState } from "react";
import { ARGBtoHEX } from "../utils/ARGBtoHEX";
import { PreviewMDTheme } from "../components/PreviewMDTheme";
import { AddIcon } from "@chakra-ui/icons";
import { FileUpload, useFileUpload } from "use-file-upload";

const Home: NextPage = () => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const themeRef = useRef<HTMLDivElement | null>(null);

  const [imageList, setImageList] = useState<string[]>([]);

  const [selectedImg, setSelectedImg] = useState<HTMLImageElement>();
  const [computedColor, setComputedColor] = useState<string>();
  const [computedTheme, setComputedTheme] = useState<Theme | null>(null);

  const [files, selectFiles] = useFileUpload();

  const selectImage = async (e: MouseEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;

    setSelectedImg(img);
  };

  const uploadImage = () => {
    selectFiles({ accept: "image/*", multiple: false }, (outcome) => {
      setImageList((l) => {
        return [...l, (outcome as FileUpload).source as unknown as string];
      });
    });
  };

  useEffect(() => {
    (async () => {
      if (imageRef.current && selectedImg) {
        const result = await sourceColorFromImage(imageRef.current);
        const computed = ARGBtoHEX(result);
        setComputedColor(computed);

        const theme = themeFromSourceColor(result);
        setComputedTheme(theme);
        if (themeRef.current) {
          applyTheme(theme, { target: themeRef.current });
        }
      }
    })();
  }, [selectedImg]);

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex height="full" bg="gray.100">
        <Flex w={64} height="full" justify="center" direction="column">
          <Box overflow="auto">
            <VStack spacing={10} py={4}>
              {data.map((d, i) => (
                <Box bg="white" p={4} key={i} cursor="pointer">
                  <Image src={d} alt={d} w={20} h={20} onClick={selectImage} />
                </Box>
              ))}
            </VStack>
            <Text align="center">Uploaded Images:</Text>
            <VStack spacing={10} py={4}>
              {imageList &&
                imageList.map((d, i) => (
                  <Box bg="white" p={4} key={i} cursor="pointer">
                    <Image
                      src={d}
                      alt={d}
                      w={20}
                      h={20}
                      onClick={selectImage}
                    />
                  </Box>
                ))}
            </VStack>
          </Box>
          <Spacer />
          <VStack p={4} height="200px" bg="gray.200">
            <Text>Upload Image</Text>
            <Button
              w="100px"
              h="100px"
              colorScheme="blue"
              variant="outline"
              onClick={uploadImage}
            >
              <AddIcon />
            </Button>
          </VStack>
        </Flex>
        <Flex bg="white" flex={1} height="full">
          <Center flex={1} ref={themeRef}>
            {selectedImg && (
              <Box
                position="relative"
                p={4}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    w: "33.3333%",
                    h: "50%",
                    left: 0,
                    top: 0,
                    position: "absolute",
                    zIndex: 0,
                    bg: "var(--md-sys-color-primary)",
                  }}
                />
                <Box
                  sx={{
                    w: "33.3333%",
                    h: "50%",
                    left: 0,
                    top: "50%",
                    position: "absolute",
                    zIndex: 0,
                    bg: "var(--md-sys-color-primary-container)",
                  }}
                />
                <Box
                  sx={{
                    w: "33.3333%",
                    h: "50%",
                    left: "33.3333%",
                    top: 0,
                    position: "absolute",
                    zIndex: 0,
                    bg: "var(--md-sys-color-secondary)",
                  }}
                />
                <Box
                  sx={{
                    w: "33.3333%",
                    h: "50%",
                    left: "33.3333%",
                    top: "50%",
                    position: "absolute",
                    zIndex: 0,
                    bg: "var(--md-sys-color-secondary-container)",
                  }}
                />
                <Box
                  sx={{
                    w: "33.3333%",
                    h: "50%",
                    left: "66.6666%",
                    top: 0,
                    position: "absolute",
                    zIndex: 0,
                    bg: "var(--md-sys-color-tertiary)",
                  }}
                />
                <Box
                  sx={{
                    w: "33.3333%",
                    h: "50%",
                    left: "66.6666%",
                    top: "50%",
                    position: "absolute",
                    zIndex: 0,
                    bg: "var(--md-sys-color-tertiary-container)",
                  }}
                />
                <Image
                  position="relative"
                  zIndex={1}
                  ref={imageRef}
                  src={selectedImg.src}
                  w="500px"
                  h="500px"
                  alt="selected image"
                  mx="auto"
                />
                {computedTheme && (
                  <Box position="relative" zIndex={1}>
                    <PreviewMDTheme theme={computedTheme} />
                  </Box>
                )}
              </Box>
            )}
          </Center>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
