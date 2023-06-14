<template>
  <section>
        <section class="header_box">
      <div>
        <h3>Current month profit</h3>
        <p>{{ dashboard?.profit }}</p>
      </div>
      <div>
        <h3>Current month income</h3>
        <p>{{ dashboard?.total_income }}</p>
      </div>
      <div>
        <h3>Current month expense</h3>
        <p>{{ dashboard?.total_expense }}</p>
      </div>
    </section>
    <section>
        <BarChart/>
    </section>
        <section class="top_things">
      <div class="top_clients">
        <h2>Top clients</h2>
        <appTable :headers="headers" :body="body"> </appTable>
        <div class="pagination">
          <VPagination
            v-model="param.page"
            :pages="param.last_page"
            :range-size="1"
            active-color="#eaf5ff"
            @update:modelValue="getTopClients"
          />
        </div>
      </div>
      <aside class="top_products">
        <h2>Top products</h2>
        <appTable :headers="headers2" :body='body2' > </appTable>
        <div class="pagination">
          <VPagination
            v-model="param.page"
            :pages="param.last_page"
            :range-size="1"
            active-color="#eaf5ff"
            @update:modelValue="getTopProducts"
          />
        </div>
      </aside>
    </section>
  </section>
</template>

<script setup>
import { ref } from "vue";
import http from "../../plugins/axios";
import BarChart from "@/components/layout/BarChartDemo";
import appTable from "@/components/ui/app-table";
import VPagination from "@hennge/vue3-pagination";
const dashboard = ref({})
const param = ref({
  per_page: 10,
  page: 1,
  last_page: null,
});
const body = ref([]);
const body2 = ref([]);
const headers = ref([
  { title: "No", value: "index" },
  { title: "Client name", value: "title" },
  { title: "Phone number", value: "phone_number" },
  { title: "Total sale", value: "total_sales" },
]);
const headers2 = ref([
  { title: "No", value: "index" },
  { title: "Product name", value: "title" },
  { title: "Code", value: "code" },
  { title: "Total sale", value: "total_sales" },
]);


const getProfit = () => {
  http.get("/api/dashboard/monthly-profit/").then((res) => {
    dashboard.value = res.data;
  });
};
getProfit()

const getTopClients = () => {
  http
    .get(`api/dashboard/top-clients/`, {
      params: {
        per_page: param?.value?.per_page,
        page: param?.value?.page,
      },
    })
    .then((res) => {
      console.log(res.data, "dashboard");
      body.value = res.data.results;
      body.value.forEach((item, index) => {
        item.index =
          param?.value.page * param?.value.per_page - (param?.value.per_page - 1) + index;
      });
      param.value.last_page = Math.ceil(res?.data?.count / param.value.per_page);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getTopProducts = () => {
  http
    .get(`api/dashboard/top-products/`, {
      params: {
        per_page: param?.value?.per_page,
        page: param?.value?.page,
      },
    })
    .then((res) => {
      console.log(res.data, "dashboard");
      body2.value = res.data.results;
      body2.value.forEach((item, index) => {
        item.index =
          param?.value.page * param?.value.per_page - (param?.value.per_page - 1) + index;
      });
      param.value.last_page = Math.ceil(res?.data?.count / param.value.per_page);
    })
    .catch((err) => {
      console.log(err);
    });
};
getTopClients()
getTopProducts()
</script>

<style scoped lang='scss'>

.header_box {
  margin: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  div {
    background: #57caeb;
    text-align: center;
    padding: 15px;
    border: none;
    border-radius: 10px;
    color: white;
  }
}
.top_things{
    display: flex;
}
.pagination {
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
}
.top_clients {
  width: 580px;
  margin-top: 35px;
    text-align: center;

}
.top_products{
    margin-top: 35px;
    text-align: center;
}
</style>