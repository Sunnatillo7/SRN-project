<template>
  <div class="chart">
    <Bar
      :data="chartData.data"
      :options="chartData.options"
      :css-classes="css - classes"
      :styles="styles"
      :width="900"
      :height="400"
    />
  </div>
</template>

<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import {Bar} from 'vue-chartjs'
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)
import {computed, defineProps} from 'vue'

const props = defineProps({
    income_total:{
        type:Array
    },
    expense_total:{
        type:Array
    }
})

const chartData = computed(()=>{
    return{
        data:{
            labels:['January','February','March','April','May','June','July','August','September','October','November','December'],
            datasets:[
                {
                    label:'Monthly income',
                    data:props.income_total,
                    fill:false,
                    borderColor:'rgb(75,192,192)',
                    tension:0.1,
                    backgroundColor: [
                        'rgba(67,94190,0.7)',
                        'rgba(87,202,235,0.5)'
                    ]
                },
                {
                    label:'Monthly expence',
                    data:props.expense_total,
                    fill:false,
                    borderColor:'rgb(75,192,192)',
                    tension:0.1,
                    backgroundColor: [
                        'rgba(67,94190,0.7)',
                        'rgba(87,202,235,0.5)'
                    ]
                }
            ]
        }
    }
})
</script>

<style></style>
