import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nord as codeTheme } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import accountStoreContext from '../utils/account-store-context';

export const SmPanel = ({ children, ...props }) => (
  <VStack className="sm_panel" alignItems="flex-start" {...props}>
    {children}
  </VStack>
);

export const PageHeaderLabel = ({ children }) => (
  <Text fontFamily="RMNeue-Bold" fontSize="2.2em" mt="2em">
    {children}
  </Text>
);

export const PageIntroduction = ({ children }) => (
  <Text fontFamily="RMNeue-Regular" fontSize="1.1em" color="smNavy.400">
    {children}
  </Text>
);

export const HeaderLabel = ({ children }) => (
  <Text fontFamily="Matter-Bold" fontSize="1.4em" mb="0.3em">
    {children}
  </Text>
);

export const DescriptionLabel = ({ children }) => (
  <Text fontFamily="Matter-SemiBold" fontSize="1em" mb="1em" color="smBlack.300">
    {children}
  </Text>
);

export const PageHeader = ({ headerLabel, introduction }) => {
  return (
    <>
      <PageHeaderLabel>{headerLabel}</PageHeaderLabel>
      <PageIntroduction>{introduction}</PageIntroduction>
      <hr
        style={{
          marginTop: '2em',
          width: '800px',
          marginBottom: '3em',
          borderColor: 'var(--chakra-colors-smNavy-270)',
        }}
      />
    </>
  );
};
export const CodeExamples = ({ }) => {

  const { accountStore } = useContext(accountStoreContext);

  return (
    <Tabs size="lg" variant="speechmatics" mt="1em">
      <TabList marginBottom="-1px">
        <Tab>Windows</Tab>
        <Tab>Mac</Tab>
        <Tab>Linux</Tab>
      </TabList>
      <TabPanels>
        <TabPanel width="750px">
          <CodeHighlight
            code={`curl -L -X POST ${accountStore.getRuntimeURL() || '$HOST'}/v2/jobs/ -H "Authorization: Bearer NDFjOTE3NGEtOWVm" -F data_file=@example.wav -F config="$(cat config.json)" | jq`}
          />
        </TabPanel>
        <TabPanel width="750px">
          <CodeHighlight
            code={`/* mac */ curl -L -X POST ${accountStore.getRuntimeURL()}/v2/jobs/ -H "Authorization: Bearer NDFjOTE3NGEtOWVm" -F data_file=@example.wav -F config="$(cat config.json)" | jq`}
          />
        </TabPanel>
        <TabPanel width="750px">
          <CodeHighlight
            code={`/* linux */ curl -L -X POST ${accountStore.getRuntimeURL()}/jobs/ -H "Authorization: Bearer NDFjOTE3NGEtOWVm" -F data_file=@example.wav -F config="$(cat config.json)" | jq`}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const CodeHighlight = ({ code }) => {
  return (
    <Box position="relative">
      <Button
        top="6px"
        right="6px"
        position="absolute"
        alignSelf="flex-start"
        fontSize="0.8em"
        aria-label="copy"
        color="smNavy.500"
        backgroundColor="#fff"
        size="sm"
        borderRadius="2px"
        onClick={() => {
          navigator?.clipboard?.writeText(code);
        }}
        _hover={{ color: '#fff', backgroundColor: 'smNavy.400' }}
      >
        COPY
      </Button>
      <SyntaxHighlighter language="bash" style={{ ...codeTheme }} className="code_block">
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export const SimplePanel = ({ children }) => (
  <VStack
    width="800px"
    p="1em 1em 1.5em 1.5em"
    alignItems="flex-start"
    backgroundColor="smWhite.500"
    border="1px solid"
    borderColor="smBlack.200"
    borderRadius="3px"
  >
    {children}
  </VStack>
);
