import { request } from 'umi';

export default {
  namespace: 'cinema',

  state: {
    cinemaList: [],
  },

  reducers: {
    getCinemaOldList(prevState: any) {
      return {
        ...prevState,
      };
    },
    clearList(prevState: any, action: any) {
      return {
        ...prevState,
        cinemaList: [],
      };
    },
    changeCinemaList(prevState: any, action: any) {
      return {
        ...prevState,
        cinemaList: action.payload,
      };
    },
  },

  effects: {
    *getCinemaList(action: any, sagaObj: any): any {
      const { call, put } = sagaObj;
      const res = yield call(getCinemaListApi, action.payload.cityId);

      yield put({
        type: 'changeCinemaList',
        payload: res,
      });
    },
  },
};

async function getCinemaListApi(cityId: any) {
  let res = await request(
    `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=456074`,
    {
      headers: {
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.0","e":"1653096841171377785044993","bc":${cityId}}`,
        'X-Host': 'mall.film-ticket.cinema.list',
      },
    },
  );
  const optCinemaList = [...res.data.cinemas];
  let backToNum = '';
  let frontToNum = '';
  optCinemaList.forEach((item) => {
    frontToNum = item.lowPrice.toString().slice(0, 2);
    backToNum = item.lowPrice.toString().slice(2);
    item.lowPrice = frontToNum + '.' + backToNum;

    item.Distance = item.Distance.toFixed(2);
  });
  return optCinemaList;
}
