import React from 'react';

import { useEnvironment } from '../contexts';
import { Col, descriptors } from '../customizables';
import { Header } from '../elements';
import { ActiveDevicesSection } from './ActiveDevicesSection';
import { ConnectedAccountsSection } from './ConnectedAccountsSection';
import { EmailsSection } from './EmailSection';
import { MfaSection } from './MfaSection';
import { NavbarMenuButtonRow } from './Navbar';
import { PasswordSection } from './PasswordSection';
import { PhoneSection } from './PhoneSection';
import { UsernameSection } from './UsernameSection';
import { UserProfileSection } from './UserProfileSection';
import { getSecondFactors } from './utils';
import { Web3Section } from './Web3Section';

export const RootPage = () => {
  const { attributes, social } = useEnvironment().userSettings;
  const showUsername = attributes.username.enabled;
  const showEmail = attributes.email_address.enabled;
  const showPhone = attributes.phone_number.enabled;
  const showConnectedAccounts = social && Object.values(social).filter(p => p.enabled).length > 0;
  const showWeb3 = attributes.web3_wallet.enabled;
  const showPassword = attributes.password.enabled && attributes.password.required;
  const showMfa = getSecondFactors(attributes).length > 0;

  return (
    <Col
      elementDescriptor={descriptors.page}
      gap={8}
    >
      <NavbarMenuButtonRow />
      <Col
        elementDescriptor={descriptors.profilePage}
        elementId={descriptors.profilePage.setId('account')}
        gap={8}
      >
        <Header.Root id='cl-userProfile-section-account'>
          <Header.Title textVariant='xxlargeMedium'>Account</Header.Title>
          <Header.Subtitle>Manage your account information</Header.Subtitle>
        </Header.Root>
        <UserProfileSection />
        {showUsername && <UsernameSection />}
        {showEmail && <EmailsSection />}
        {showPhone && <PhoneSection />}
        {showConnectedAccounts && <ConnectedAccountsSection />}
        {showWeb3 && <Web3Section />}
      </Col>
      <Col
        elementDescriptor={descriptors.profilePage}
        elementId={descriptors.profilePage.setId('security')}
        gap={8}
      >
        <Header.Root id='cl-userProfile-section-security'>
          <Header.Title textVariant='xxlargeMedium'>Security</Header.Title>
          <Header.Subtitle>Manage your security preferences</Header.Subtitle>
        </Header.Root>
        {showPassword && <PasswordSection />}
        {showMfa && <MfaSection />}
        <ActiveDevicesSection />
      </Col>
    </Col>
  );
};