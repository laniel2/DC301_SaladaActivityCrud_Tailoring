<script setup>
import { ref } from 'vue'

defineProps({
  orders: Array
})

const emit = defineEmits([
  'add-order',
  'update-order',
  'delete-order'
])

const customer = ref('')
const clothing = ref('')
const measurement = ref('')
const price = ref('')
const status = ref('Pending')
const editingId = ref(null)

function saveOrder() {
  if (!customer.value || !clothing.value) return

  const order = {
    id: editingId.value ?? null,
    customer: customer.value,
    clothing: clothing.value,
    measurement: measurement.value,
    price: Number(price.value),
    status: status.value
  }

  if (editingId.value) {
    emit('update-order', order)
  } else {
    emit('add-order', order)
  }

  clearForm()
}

function editOrder(order) {
  editingId.value = order.id
  customer.value = order.customer
  clothing.value = order.clothing
  measurement.value = order.measurement
  price.value = order.price
  status.value = order.status
}

function clearForm() {
  editingId.value = null
  customer.value = ''
  clothing.value = ''
  measurement.value = ''
  price.value = ''
  status.value = 'Pending'
}
</script>

<template>
  <div class="form">
    <input v-model="customer" placeholder="Customer name">
    <input v-model="clothing" placeholder="Clothing type">
    <input v-model="measurement" placeholder="Measurement">
    <input v-model="price" type="number" placeholder="Price">

    <select v-model="status">
      <option>Pending</option>
      <option>In Progress</option>
      <option>Finished</option>
    </select>

    <button @click="saveOrder">
      {{ editingId ? 'Update Order' : 'Add Order' }}
    </button>

    <button v-if="editingId" class="cancel" @click="clearForm">
      Cancel
    </button>
  </div>

  <p v-if="orders.length === 0" class="empty">
    No tailoring orders.
  </p>

  <div v-for="order in orders" :key="order.id" class="order">
    <div>
      <h3>{{ order.customer }}</h3>
      <p>Clothing: {{ order.clothing }}</p>
      <p>Measurement: {{ order.measurement }}</p>
      <p>Price: ₱{{ order.price }}</p>
      <p>Status: {{ order.status }}</p>
    </div>

    <div>
      <button @click="editOrder(order)">Edit</button>
      <button
        class="delete"
        @click="emit('delete-order', order.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>