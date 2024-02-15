import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "./api";
import { client } from "./store";

export const useCategories = () => {
	return useQuery(
		{
			queryKey: ["categories"],
			queryFn: getCategories,
		},
		client
	)
}

export function useProductsForCatalog(category) {
	return useInfiniteQuery(
		{
			queryKey: ["products", category],
			queryFn: ({ pageParam = 0}) => getProducts(pageParam, category),
			initialPageParam: 0,
			getNextPageParam: (lastPage, _, lastPageParam) => {
				if (lastPage.length === 0) {
					return undefined;
				}
				return lastPageParam + 1;
			},
			getPreviousPageParam: (_, __, firstPageParam) => {
				if (firstPageParam <= 1) {
					return undefined;
				}
				return firstPageParam - 1;
			},
		},
		client
	);
}

export function useProductsForSearch(category, keyword) {
	return useInfiniteQuery(
		{
			queryKey: ["products", category, keyword],
			queryFn: ({ pageParam = 1 }) => getProducts(pageParam, category, keyword),
			initialPageParam: 0,
			getNextPageParam: (lastPage, _, lastPageParam) => {
				if (lastPage.length === 0) {
					return undefined;
				}
				return lastPageParam + 1;
			},
			getPreviousPageParam: (_, __, firstPageParam) => {
				if (firstPageParam <= 1) {
					return undefined;
				}
				return firstPageParam - 1;
			},
		},
		client
	);
}

