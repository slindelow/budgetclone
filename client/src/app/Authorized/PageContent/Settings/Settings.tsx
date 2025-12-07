import { Stack, Paper, Title, Text, TextInput, Select, Grid, Button, Group, Checkbox } from "@mantine/core";
import { User, Bell, Shield, Palette, Globe, Mail, Smartphone } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle/DarkModeToggle";
import LinkSimpleFin from "./LinkSimpleFin/LinkSimpleFin";
import React, { useState } from "react";
import ResetPassword from "./ResetPassword/ResetPassword";
import UserSettings from "./UserSettings/UserSettings";
import TwoFactorAuth from "./TwoFactorAuth/TwoFactorAuth";
import AdvancedSettings from "./AdvancedSettings/AdvancedSettings";
import OidcSettings from "./OidcSettings/OidcSettings";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "~/providers/AuthProvider/AuthProvider";
import { IApplicationUser } from "~/models/applicationUser";
import { AxiosResponse } from "axios";
import CreatePassword from "./CreatePassword/CreatePassword";

const Settings = (): React.ReactNode => {
  const { request } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<IApplicationUser | undefined> => {
      const res: AxiosResponse = await request({
        url: "/api/applicationUser",
        method: "GET",
      });

      if (res.status === 200) {
        return res.data as IApplicationUser;
      }

      return undefined;
    },
  });

  return (
    <Stack w="100%" gap="xl" p="md">
      <div>
        <Title order={1} size="h2" mb="xs">Settings</Title>
        <Text c="dimmed">Manage your account and preferences</Text>
      </div>

      {/* Profile Section */}
      <Paper p="xl" radius="lg" withBorder>
        <Group gap="md" mb="lg">
          <User size={20} style={{ color: '#666' }} />
          <Title order={2} size="h4">Profile Information</Title>
        </Group>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Full Name"
              placeholder="Your name"
              defaultValue="User"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Email Address"
              placeholder="email@example.com"
              type="email"
              defaultValue=""
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              type="tel"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              label="Currency"
              placeholder="Select currency"
              defaultValue="USD"
              data={[
                { value: "USD", label: "USD - US Dollar" },
                { value: "EUR", label: "EUR - Euro" },
                { value: "GBP", label: "GBP - British Pound" },
                { value: "JPY", label: "JPY - Japanese Yen" },
              ]}
            />
          </Grid.Col>
        </Grid>
        <Button mt="lg" color="teal">
          Save Changes
        </Button>
      </Paper>

      {/* Notifications */}
      <Paper p="xl" radius="lg" withBorder>
        <Group gap="md" mb="lg">
          <Bell size={20} style={{ color: '#666' }} />
          <Title order={2} size="h4">Notifications</Title>
        </Group>
        <Stack gap="md">
          <Paper p="md" bg="gray.0" radius="md" withBorder>
            <Group justify="space-between">
              <Group gap="md">
                <Mail size={20} style={{ color: '#666' }} />
                <div>
                  <Text fw={600}>Email Notifications</Text>
                  <Text size="sm" c="dimmed">Receive updates via email</Text>
                </div>
              </Group>
              <Checkbox
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.currentTarget.checked)}
              />
            </Group>
          </Paper>

          <Paper p="md" bg="gray.0" radius="md" withBorder>
            <Group justify="space-between">
              <Group gap="md">
                <Smartphone size={20} style={{ color: '#666' }} />
                <div>
                  <Text fw={600}>Push Notifications</Text>
                  <Text size="sm" c="dimmed">Get alerts on your device</Text>
                </div>
              </Group>
              <Checkbox
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.currentTarget.checked)}
              />
            </Group>
          </Paper>

          <Paper p="md" bg="gray.0" radius="md" withBorder>
            <Group justify="space-between">
              <Group gap="md">
                <Bell size={20} style={{ color: '#666' }} />
                <div>
                  <Text fw={600}>Budget Alerts</Text>
                  <Text size="sm" c="dimmed">Notify when exceeding budget</Text>
                </div>
              </Group>
              <Checkbox
                checked={budgetAlerts}
                onChange={(e) => setBudgetAlerts(e.currentTarget.checked)}
              />
            </Group>
          </Paper>
        </Stack>
      </Paper>

      {/* Appearance and Language */}
      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper p="xl" radius="lg" withBorder h="100%">
            <Group gap="md" mb="lg">
              <Palette size={20} style={{ color: '#666' }} />
              <Title order={2} size="h4">Appearance</Title>
            </Group>
            <div>
              <Text mb="md" fw={600}>Theme</Text>
              <DarkModeToggle />
            </div>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Paper p="xl" radius="lg" withBorder h="100%">
            <Group gap="md" mb="lg">
              <Globe size={20} style={{ color: '#666' }} />
              <Title order={2} size="h4">Language & Region</Title>
            </Group>
            <Select
              label="Language"
              placeholder="Select language"
              defaultValue="en"
              data={[
                { value: "en", label: "English (US)" },
                { value: "es", label: "Spanish" },
                { value: "fr", label: "French" },
                { value: "de", label: "German" },
              ]}
            />
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Security */}
      <Paper p="xl" radius="lg" withBorder>
        <Group gap="md" mb="lg">
          <Shield size={20} style={{ color: '#666' }} />
          <Title order={2} size="h4">Security</Title>
        </Group>
        <Stack gap="md">
          <Button fullWidth justify="flex-start" variant="light" color="gray">
            <Stack gap={0}>
              <Text fw={600} size="sm">Change Password</Text>
              <Text size="xs" c="dimmed">Update your account password</Text>
            </Stack>
          </Button>
          <TwoFactorAuth />
          <LinkSimpleFin />
        </Stack>
      </Paper>

      {/* Additional Settings */}
      <Stack gap="md">
        <UserSettings />
        <OidcSettings />
        {userQuery.data?.hasLocalLogin ?? true ? (
          <ResetPassword />
        ) : (
          <CreatePassword />
        )}
        <AdvancedSettings />
      </Stack>

      {/* Danger Zone */}
      <Paper p="xl" radius="lg" withBorder bg="rgba(250, 82, 82, 0.1)" style={{ borderColor: '#ffa8a8' }}>
        <Title order={2} size="h4" c="red" mb="lg">Danger Zone</Title>
        <Stack gap="md">
          <Button fullWidth justify="flex-start" variant="light" color="red">
            <Stack gap={0}>
              <Text fw={600} size="sm">Export All Data</Text>
              <Text size="xs" c="dimmed">Download a copy of your data</Text>
            </Stack>
          </Button>
          <Button fullWidth justify="flex-start" variant="light" color="red">
            <Stack gap={0}>
              <Text fw={600} size="sm">Delete Account</Text>
              <Text size="xs" c="dimmed">Permanently delete your account and all data</Text>
            </Stack>
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Settings;
