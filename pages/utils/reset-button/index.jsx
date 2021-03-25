import { useStore } from "./utils";

export function useResetButton() {
  const { filtered, filter } = useStore();

  return !filtered ? (
    <></>
  ) : (
    <button type="button" onClick={filter.bind(null, null)}>
      reset
    </button>
  );
}
