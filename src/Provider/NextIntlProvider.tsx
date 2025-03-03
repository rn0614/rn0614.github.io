import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React, { ReactNode } from "react";

export default async function NextIntlProvider({
  children,
}: {
  children: ReactNode;
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
