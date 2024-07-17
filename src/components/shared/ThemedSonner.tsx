'use client'
import { useTheme } from "next-themes";
import { Toaster, ToasterProps } from "sonner";

type Props = {};
const ThemedSonner = (props: Props) => {
  const { resolvedTheme } = useTheme();
  return <Toaster  theme={resolvedTheme as ToasterProps["theme"]} />;
};
export default ThemedSonner;
