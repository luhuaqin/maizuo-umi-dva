import { request } from 'umi';

export default {
  namespace: 'cinema',

  state: {
    cinemaList: [],
  },

  reducers: {
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
      console.log(res);

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
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.0","e":"1653096841171377785044993","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list',
      },
    },
  );

  return res.data.cinemas;
}
