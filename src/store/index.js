import { createStore } from "vuex";
import http from "../plugins/axios";
export default createStore({
  state: {
    me: {},
    suppliers: [],
    brands: [],
    groups: [],
    invoiceItem: [],
    product: [],
    clients: [],
    returned:[],
    income:[],
    expence:[],
  },
  getters: {},
  mutations: {
    getMe(state, data) {
      state.me = data;
    },
    getReturnedInvoice(state, data){
      state.returned = data
    },
    getSuppliers(state, data) {
      state.suppliers = data;
    },
    getBrands(state, data) {
      state.brands = data;
    },
    getGroups(state, data) {
      state.groups = data;
    },
    getInvoiceItem(state, data) {
      state.getInvoiceItem = data;
    },
    getProduct(state, data) {
      state.product = data;
    },
    getClient(state, data) {
      state.clients = data;
    },
    getIncome(state, data) {
      state.income = data;
    },
    getExpence(state, data) {
      state.expence = data;
    },
  },
  actions: {
    getMe({ commit }) {
      http.get("/api/user/me/").then((res) => {
        commit("getMe", res.data);
      });
    },
    getSuppliers({ commit }) {
      http
        .get("/api/warehouse/supplier/")
        .then((res) => {
          console.log(res.data.results);
          commit("getSuppliers", res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getGroups({ commit }, param) {
      http
        .get("/api/warehouse/group/", {
          params: {
            per_page: param?.value?.per_page,
            page: param?.value?.page,
          },
        })
        .then((res) => {
          res.data.results.forEach((item, index) => {
            item.index =
              param?.page * param?.per_page - (param?.per_page - 1) + index;
          });
          commit("getGroups", res?.data?.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBrands({ commit }, param) {
      http
        .get("/api/warehouse/brand/", {
          params: {
            per_page: param?.value?.per_page,
            page: param?.value?.page,
          },
        })
        .then((res) => {
          res.data.results.forEach((item, index) => {
            item.index =
              param?.page * param?.per_page - (param?.per_page - 1) + index;
          });
          commit("getBrands", res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getInvoiceItem({ commit }, param) {
      http
        .get("/api/warehouse/input-invoice-item/", {
          params: {
            per_page: param?.value?.per_page,
            page: param?.value?.page,
          },
        })
        .then((res) => {
          res.data.results.forEach((item, index) => {
            item.index =
              param?.page * param?.per_page - (param?.per_page - 1) + index;
          });
          commit("getInvoiceItem", res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProduct({ commit }, param) {
      http
        .get("/api/warehouse/product/", {
          params: {
            per_page: param?.value?.per_page,
            page: param?.value?.page,
          },
        })
        .then((res) => {
          res.data.results.forEach((item, index) => {
            item.index =
              param?.page * param?.per_page - (param?.per_page - 1) + index;
          });
          commit("getProduct", res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getClient({ commit }, param) {
      http
        .get("/api/sales/client/", {
          params: {
            per_page: param?.value?.per_page,
            page: param?.value?.page,
          },
        })
        .then((res) => {
          res.data.results.forEach((item, index) => {
            item.index =
              param?.page * param?.per_page - (param?.per_page - 1) + index;
          });
          param.last_page = Math.ceil(res?.data?.count / param.per_page);

          commit("getClient", res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getReturnedInvoice({ commit }, param) {
      http
        .get("/api/warehouse/returned-invoice/", {
          params: {
            per_page: param?.value?.per_page,
            page: param?.value?.page,
          },
        })
        .then((res) => {
          res.data.results.forEach((item, index) => {
            item.index =
              param?.page * param?.per_page - (param?.per_page - 1) + index;
          });
          param.last_page = Math.ceil(res?.data?.count / param.per_page);

          commit("getReturnedInvoice", res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getIncome({ commit }, param) {
      http
        .get("/api/finance/income/", {
          params: {
            per_page: param?.value?.per_page,
            page: param?.value?.page,
          },
        })
        .then((res) => {
          res.data.results.forEach((item, index) => {
            item.index =
              param?.page * param?.per_page - (param?.per_page - 1) + index;
          });
          param.last_page = Math.ceil(res?.data?.count / param.per_page);
           
          commit("getIncome", res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getExpence({ commit }, param) {
      http
        .get("/api/finance/expense/", {
          params: {
            per_page: param?.value?.per_page,
            page: param?.value?.page,
          },
        })
        .then((res) => {
          res.data.results.forEach((item, index) => {
            item.index =
              param?.page * param?.per_page - (param?.per_page - 1) + index;
          });
          param.last_page = Math.ceil(res?.data?.count / param.per_page);
          console.log(res.data.results,'results')
           
          commit("getExpence", res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  modules: {},
});
