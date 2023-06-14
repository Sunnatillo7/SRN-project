<template>
  <section class="product__list">
    <addProductModal ref="product"/>
    <div v-if="role !== 'director'" class="main_brand__div">
      <router-link class="main_group__link" to="/groups">
        <span class="groups_link">Groups and Brands</span>
      </router-link>
      <button  @click="openModal">
        Add product
      </button>
    </div>
    <div class="product__list-table">
      <appTable :headers="headers" :body="productItems">
        <template #body_group="{ item }">
          <span>{{ item?.group?.title }}</span>
        </template>
        <template #body_brand="{ item }">
          <span>{{ item?.brand?.title }}</span>
        </template>
        <template #body_description="{ item }">
          <span class="product__list-table-text">{{ item?.description }}</span>
        </template>
        <template #body_title="{ item }">
          <span class="product__list-table-text">{{ item?.title }}</span>
        </template>
        <template v-if="role !== 'director'" #body_action="{ item }">
          <router-link :to="{ name: 'singleProduct', params: { id: item?.id } }">
            <span class="product__list-table-text"><i class="fa-solid fa-eye"></i></span>
          </router-link>
        </template>
      </appTable>
    </div>
    <div class="pagination">
      <VPagination
        v-model="params.page"
        :pages="params.last_page"
        :range-size="1"
        active-color="#eaf5ff"
        @update:modelValue="getProducts"
      />
    </div>
  </section>
</template>

<script setup>
import appTable from "@/components/ui/app-table";
import { ref } from "vue";
import http from "../../plugins/axios";
import VPagination from "@hennge/vue3-pagination";
import addProductModal from "../../components/pages/addProductModal.vue"


let role = ''
const getStore =()=>{
 role = sessionStorage.getItem('role')
}
getStore()
console.log(role , 'role');
const product = ref('')

const productItems = ref([]);
const headers = ref([
  { title: "No", value: "index" },
  { title: "Name", value: "title" },
  { title: "Code", value: "code" },
  { title: "Brand", value: "brand" },
  { title: "Group", value: "group" },
  { title: "Arrival price", value: "current_arrival_price" },
  { title: "Selling price", value: "current_selling_price" },
  { title: "Description", value: "description" },
  { title: "Action", value: "action" },
]);
const params = ref({
  per_page: 10,
  page: 1,
  last_page: null,
});
params;

const getProducts = () => {
  http
    .get("/api/warehouse/product/", {
      params: {
        per_page: params?.value?.per_page,
        page: params?.value?.page,
      },
    })
    .then((res) => {
      console.log(res.data.count);
      productItems.value = res.data.results;
      productItems.value.forEach((item, index) => {
        item.index =
          params.value.page * params.value.per_page - (params.value.per_page - 1) + index;
      });
      params.value.last_page = Math.ceil(res.data.count / params.value.per_page);
    })
    .catch((err) => {
      console.log(err);
    });
};
getProducts();

const openModal =()=>{
  product.value.openModal()
}

</script>

<style lang="scss" scoped>
$blue-color: #435ebe;
$white-color: #fff;

.product__list {
  .product__list-action {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    gap: 15px;

    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      background: $blue-color;
      color: #fff;
      cursor: pointer;
      display: flex;
      gap: 8px;
      align-items: center;

      &:hover .right {
        transform: translateX(5px);
      }
      .right {
        font-size: 14px;
        transition: all 0.3s linear;
      }
    }
  }
  .main_brand__div{
    display: flex;
    justify-content: space-between;
    align-items: center;

    button{
     width: 120px;
     height: 40px;
     border: none;
     border-radius: 5px;
     color: white;
     background: $blue-color ;
    margin-right: 20px;
}
  }
  .main_group__link {
    margin: 25px 0 20px 20px;
    display: block;

    .groups_link {
      padding: 7px 12px;
      border: none;
      border-radius: 5px;
      color: white;
      background: $blue-color;
      text-decoration: none;
      list-style: none;
    }
  }

  .product__list-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: scroll;

    .product__list-table-text {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #000;
      &:hover {
        color: $blue-color;
        font-size: 13.5px;
      }
    }
  }

  .pagination {
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 10px 0;
  }
}
</style>
