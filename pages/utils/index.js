import styles from "./style.module.scss";

const { home } = styles;

export function useStore() {
  return {
    home,
  };
}
