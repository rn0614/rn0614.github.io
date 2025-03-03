import { asideState } from "@/store/recoilState";
import { useRecoilState } from "recoil";

type AsideState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export function useAside(): AsideState {
  const [isOpen, setIsOpen] = useRecoilState(asideState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return { isOpen, open, close, toggle };
}