import { Api } from "@/api";
import type { User } from "@/ts";

type UseProfileOptions = {
  prefetch?: boolean
}

/**
 *
 * Используй options.prefetch чтобы актуализировать данные
 */
export function useProfile(options?: UseProfileOptions) {
  const state = useState<{
    profile: User | null,
    isLoading: boolean
  }>('profile', () => ({
    profile: null,
    isLoading: false
  }))


  async function loadProfile() {
    try {
      state.value.isLoading = true
      const response = await Api.profile.getProfile()
      state.value.isLoading = false
      state.value.profile = response
    } catch(err) {
      state.value.isLoading = false
    }
  }

  if (options?.prefetch || !state.value.profile) {
    loadProfile()
  }

  return {
    ...toRefs(state.value),
    loadProfile
  }
}
