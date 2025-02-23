// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addProducts POST /api/products/add */
export async function addProductsUsingPost(
  body: API.ProductsRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/products/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteProducts POST /api/products/delete */
export async function deleteProductsUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/products/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editProducts POST /api/products/edit */
export async function editProductsUsingPost(
  body: API.ProductsRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/products/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listProducts POST /api/products/list */
export async function listProductsUsingPost(
  body: API.ProductsSearchRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListProducts_>('/api/products/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
