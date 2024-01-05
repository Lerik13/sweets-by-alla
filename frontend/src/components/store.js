//import { QueryClient } from "@tanstack/query-core";
import { QueryClient } from "@tanstack/react-query";
import { atom } from "nanostores";

export const productsList = atom([]);
export const categoryy = atom("cake");
export const pageNumber = atom(1);
export const client = new QueryClient();
