import { QueryClient } from "@tanstack/react-query";
import { atom } from "nanostores";

export const userInfo = atom(null);

export const client = new QueryClient();
