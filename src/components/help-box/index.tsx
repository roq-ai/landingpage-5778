import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['App Administrator'];
  const roles = ['Doctor', 'Pharmacist', 'App Administrator', 'Marketing Manager'];
  const applicationName = `Landingpage`;
  const tenantName = `Patient`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `1. As an App Administrator, I want to be able to create and manage a landing page for the app, so that I can promote the app to potential users.

2. As an App Administrator, I want to be able to invite Doctors, Pharmacists, and Marketing Managers to the application, so that they can use the app and contribute to its success.

3. As a Doctor, I want to be able to receive prescription wishes from patients, so that I can review and approve or deny their requests.

4. As a Patient, I want to be able to send my prescription wish to my doctor through the app, so that I can request a prescription without visiting the doctor's office.

5. As a Doctor, I want to be able to send approved prescriptions directly to the patient through the app, so that they can easily forward it to a pharmacy.

6. As a Patient, I want to be able to forward my approved prescription to a pharmacy through the app, so that I can order my medication without visiting the pharmacy.

7. As a Pharmacist, I want to be able to receive and process prescriptions from patients through the app, so that I can prepare their medication for pickup or delivery.

8. As a Patient, I want to be able to receive order updates from the pharmacy through the app, so that I can stay informed about the status of my medication order.

9. As a Marketing Manager, I want to be able to track the number of users who click the download button on the landing page, so that I can measure the effectiveness of our marketing efforts.

10. As a Patient, I want to be prompted with a message when I click the download button on the landing page, so that I know the app is not yet available and can provide my email address to join the waiting list.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
