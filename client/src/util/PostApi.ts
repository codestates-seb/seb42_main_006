import { requestAuth } from '../function/request';

export interface IYoutubeInfo {
  id?: number;
  title: string;
  thumbnail: string;
  url: string;
}

export interface IItemDetail {
  id: number;
  title: string;
  category: string;
  content: string;
  memberId: number;
  memberName: string;
  createAt: string;
  modifiedAt: string;
  tags: string;
  urls: IYoutubeInfo[];
  imageKey?: string;
  likeCount?: number;
  liked?: boolean;
}

export interface IPostSubmitData {
  title: string;
  category: string;
  urls: IYoutubeInfo[];
  content: string;
  tags: string;
  imageKey?: string;
}

export interface IEditData {
  title?: string;
  category?: string;
  newUrls?: IYoutubeInfo[];
  deletedUrls?: { urlId: number }[];
  content?: string;
  tags?: string;
  imageKey?: string;
}

export const UploadImg = async (file: File | undefined) => {
  if (file !== undefined) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const imgRes = await requestAuth.post('/files/images', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      if (imgRes.status !== 201) throw Error(imgRes.data.message || '문제발생');

      return imgRes.data;
    } catch (err) {
      console.error(err);
    }
  }
};

export const UpdateImg = async (file: File | undefined, fileKey: string) => {
  if (file !== undefined) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('fileKey', fileKey);

      const imgRes = await requestAuth.post('/files/images', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      if (imgRes.status !== 201) throw Error(imgRes.data.message || '문제발생');

      return imgRes.data;
    } catch (err) {
      console.error(err);
    }
  }
};

export const getPostList = async (page: number, sort: number, category: string, keyword: string) => {
  const URL = `/prf-posts?page=${page}&size=10&sorting=${sort}${category !== '전체' ? `&category=${category}` : ''}${
    keyword !== '' ? `&keyword=${keyword}` : ''
  }`;

  const res = await requestAuth.get(URL);
  if (res.status !== 200) throw new Error('검색 실패');
  return res;
};

export const likeBtnRequest = async (state: boolean, URL: string) => {
  if (state) {
    const res = await requestAuth.delete(URL);
    if (res.status !== 204) throw new Error(res.data.message || 'unlike error');
    return res;
  } else {
    const res = await requestAuth.post(URL, {});
    if (res.status !== 201) throw new Error(res.data.message || 'like error');
    return res;
  }
};

export const submitComment = async (URL: string, data: { content: string }) => {
  const res = await requestAuth.post(URL, data);
  if (res.status !== 201) throw new Error(res.data.message || 'comment error');
  return res;
};

export const submitUrl = (
  mode: 'create' | 'edit',
  curCategory: string,
  urls: IYoutubeInfo[],
  latLon: { lat: string; lon: string },
  origin?: any
): any => {
  if (mode === 'create') {
    const postUrl: { [key: string]: any } = {
      영화: () => [urls[0]],
      음악: () => urls,
      맛집: () => [{ title: '', url: latLon.lat, thumbnail: latLon.lon }],
    };
    return postUrl[curCategory]();
  } else if (mode === 'edit') {
    const editUrl: { [key: string]: any } = {
      영화: {
        new: () => urls[0].url !== origin.urls[0]?.url && [urls[0]],
        del: () => urls[0].url !== origin.urls[0]?.url && [{ urlId: origin.urls[0]?.id }],
      },
      음악: {
        new: () => {
          const result = [...urls.filter((x) => !x.id)];
          return result.length !== 0 && result;
        },
        del: () => {
          const result = [
            ...origin.urls
              .filter((x: IYoutubeInfo): boolean => {
                return !urls.some((other) => other.title === x.title);
              })
              .map((x: IYoutubeInfo) => {
                return { urlId: x.id };
              }),
          ];
          return result.length !== 0 && result;
        },
      },
      맛집: {
        new: () => {
          if (latLon.lat !== origin.urls[0]?.url && latLon.lon !== origin.urls[0]?.thumbnail) {
            return [{ title: '', url: latLon.lat, thumbnail: latLon.lon }];
          }
        },
        del: () => {
          if (latLon.lat !== origin.urls[0]?.url && latLon.lon !== origin.urls[0]?.thumbnail) {
            return [{ urlId: origin.urls[0].id }];
          }
        },
      },
    };
    const newUrl = editUrl[curCategory].new();
    const delUrl = editUrl[curCategory].del();
    return [newUrl, delUrl];
  }
};

export const createPatchData = (origin: any, data: { [key: string]: any }) => {
  const result: { [key: string]: any } = {};
  for (let key in data) {
    if (data[key] !== origin[key]) {
      key !== 'urls' && (result[key] = data[key]);
    }
  }
  return result;
};
