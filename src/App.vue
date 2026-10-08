<script setup>
import { ref, watch } from 'vue'
import TailoringOrders from './components/TailoringOrders.vue'

const STORAGE_KEY = 'tailoring-orders'

const orders = ref([])

const savedOrders = localStorage.getItem(STORAGE_KEY)
if (savedOrders) {
  try {
    orders.value = JSON.parse(savedOrders)
  } catch {
    orders.value = []
  }
}

watch(
  orders,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }
)

function addOrder(order) {
  orders.value.push({
    ...order,
    id: Date.now() + Math.random()
  })
}

function updateOrder(order) {
  const index = orders.value.findIndex(item => item.id === order.id)

  if (index !== -1) {
    orders.value[index] = order
  }
}

function deleteOrder(id) {
  orders.value = orders.value.filter(order => order.id !== id)
}
</script>

<template>
  <div class="app">
    <h1>Tailoring Orders</h1>

    <TailoringOrders
      :orders="orders"
      @add-order="addOrder"
      @update-order="updateOrder"
      @delete-order="deleteOrder"
    />
  </div>
</template>