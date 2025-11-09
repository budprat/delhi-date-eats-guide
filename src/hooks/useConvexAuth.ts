import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

/**
 * Custom hook to sync Better Auth session with Convex user
 */
export function useConvexAuth() {
  const { data: session, isPending } = useSession();
  const createOrUpdateUser = useMutation(api.users.createOrUpdateUser);

  useEffect(() => {
    if (!isPending && session?.user) {
      // Sync user with Convex database
      createOrUpdateUser({
        authId: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      }).catch((error) => {
        console.error("Failed to sync user with Convex:", error);
      });
    }
  }, [session, isPending, createOrUpdateUser]);

  return {
    session,
    isPending,
    isAuthenticated: !!session?.user,
    user: session?.user,
  };
}
