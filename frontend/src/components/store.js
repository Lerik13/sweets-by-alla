//import { QueryClient } from "@tanstack/query-core";
import { QueryClient } from "@tanstack/react-query";
import { atom } from "nanostores";

export const productsList = atom([]);
export const categoryy = atom("");
export const pageNumber = atom(1);
export const keywordSearch = atom("");

export const client = new QueryClient();
