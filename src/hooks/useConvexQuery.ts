import { useQuery as useConvexReactQuery } from "convex/react";
import { FunctionReference, FunctionArgs } from "convex/server";

/**
 * Wrapper around Convex's useQuery hook
 * This provides a consistent interface and can be extended with additional features
 */
export function useConvexQuery<Query extends FunctionReference<"query">>(
  query: Query,
  ...args: FunctionArgs<Query> extends Record<string, never>
    ? []
    : [FunctionArgs<Query>]
) {
  return useConvexReactQuery(query, ...(args as any));
}
