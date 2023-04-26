import { getSetting } from '@/Api/setting';
import { titleController } from '@/utils';
export default {
  namespaced: true,
  state: {
    loading: false,
    data: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    }
  },
  actions: {
    async fetchSetting(ctx) {
      ctx.commit('setLoading', true);
      const resp = await getSetting();
      resp.avatar = 'http://localhost:7001' + resp.avatar;
      resp.qqQrCode = 'http://localhost:7001' + resp.qqQrCode;
      resp.weixinQrCode = 'http://localhost:7001' + resp.weixinQrCode;
      ctx.commit('setData', resp);
      ctx.commit('setLoading', false);

      if (resp.favicon) {
        let link = document.querySelector('link[rel=icon]');
        if (link) {
          return;
        }
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = resp.favicon;
        document.querySelector('head').appendChild(link);
      }

      if (resp.siteTitle) {
        titleController.setSiteTitle(resp.siteTitle);
      }
    }
  }
};
