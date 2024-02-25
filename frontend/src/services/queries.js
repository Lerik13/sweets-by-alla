import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProductDetails, getProducts, getCategories } from "./api";
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

export function useProductsForSearch(category, keyword, sortBy) {
	return useInfiniteQuery(
		{
			queryKey: ["products", category, keyword, sortBy],
			queryFn: ({ pageParam = 1 }) => getProducts(pageParam, category, keyword, sortBy),
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

export function useProduct(id) {
	//const queryClient = useQueryClient();

	return useQuery(
		{
			queryKey: ["product", { id }],
			queryFn: () => getProductDetails(id),
			enabled: !!id,
			placeholderData: () => {
				const cachedProducts = (
					client.getQueryData(["products"])
				)?.pages?.flat(2);

				if (cachedProducts) {
					return cachedProducts.find((item) => item.id === id);
				}
			},
		},
		client
	);
}
