import { createApi, BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import { getToken } from './auth-info';
import { login, logout } from '../store/user-slice/user-slice';
import { APIRoute } from '../const';


const BASE_URL = 'https://8.react.pages.academy/wtw';
const TOKEN_HEADER = 'X-Token';

const TagType = {
  Favorites: 'Favorites',
  Comments: 'Comments',
  Promo: 'Promo',
  Movie: 'Movie',
};


const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set(TOKEN_HEADER, token);
    }
    return headers;
  },
});


const baseQueryCheckAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const auth = await baseQuery(APIRoute.Login, api, extraOptions);
  if (auth.error?.status === 401) {
    api.dispatch(logout());
  } else {
    api.dispatch(login());
  }
  return result;
};


export const queryApi = createApi({

  reducerPath: 'queryApi',

  tagTypes: [TagType.Comments, TagType.Favorites, TagType.Movie, TagType.Promo],

  baseQuery: baseQueryCheckAuth,

  endpoints: (build) => ({

    postStatus: build.mutation({
      query: ({id, status}) => ({
        url: `${APIRoute.Favorite}/${id}/${status}`,
        method: 'POST',
      }),
      invalidatesTags: [{type: TagType.Favorites, id: 'LIST'}, TagType.Movie, TagType.Promo],
    }),


    postReview: build.mutation({
      query: ({body, id}) => ({
        url: `${APIRoute.Comments}/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{type: TagType.Comments, id: 'LIST'}],
    }),

    checkLogin: build.query({
      query: () => APIRoute.Login,
    }),

    postLogin: build.mutation({
      query: (body) => ({
        url: APIRoute.Login,
        method: 'POST',
        body,
      }),
    }),

    getFilms: build.query({
      query: () => APIRoute.Films,
    }),

    getOneFilm: build.query({
      query: (id) => `${APIRoute.Films}/${id}`,
      providesTags: [TagType.Movie],
    }),

    getComments: build.query({
      query: (id) => `${APIRoute.Comments}/${id}`,
      providesTags: (result) => result ?
        [ ...result.map(({ id }: {id: string | number}) => ({ type: TagType.Comments, id } as const)), { type: TagType.Comments, id: 'LIST' } ] :
        [ { type: TagType.Comments, id: 'LIST' } ],
    }),

    getFavorites: build.query({
      query: () => APIRoute.Favorite,
      providesTags: (result) => result ?
        [ ...result.map(({ id }: {id: string | number}) => ({ type: TagType.Favorites, id } as const)), { type: TagType.Favorites, id: 'LIST' } ] :
        [ { type: TagType.Favorites, id: 'LIST' } ],
    }),

    getPromo: build.query({
      query: () => APIRoute.Promo,
      providesTags: [TagType.Promo],
    }),

    getSimilar: build.query({
      query: (id) => `${APIRoute.Films}/${id}${APIRoute.Similar}`,
    }),

  }),
});


export const {
  useGetFilmsQuery,
  useGetCommentsQuery,
  useGetFavoritesQuery,
  useGetOneFilmQuery,
  useGetPromoQuery,
  useGetSimilarQuery,
  usePostLoginMutation,
  useCheckLoginQuery,
  usePostReviewMutation,
  usePostStatusMutation,
} = queryApi;


