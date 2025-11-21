import { ApolloWrapper } from "@/lib/apollo-provider";

function layout({ children }: { children: React.ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
export default layout;
