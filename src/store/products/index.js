import { defineStore } from 'pinia'
import axios from 'axios'
import swal from 'sweetalert'
import { ref } from 'vue'

export const useProductStore = defineStore(
  'products',
  () => {
    const catalog = ref([])
    const category = ref([])
    const product = ref(null)

    const setCategory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/category')
        category.value = response.data.data
      } catch (error) {
        console.log(error)
      }
    }

    const setCatalog = async (url) => {
      try {
        const response = await axios.get(`http://localhost:8000/${url}`)
        catalog.value = response.data.data
      } catch (error) {
        console.log(error)
      }
    }

    const getPriceProduct = (item) => {
      return item.toLocaleString('id-ID')
    }

    const setCatalogByCategory = async (url) => {
      try {
        const response = await axios.get(`http://localhost:8000/products?category=${url}`)
        catalog.value = response.data.data
        console.log(url)
        console.log(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    const updateProduct = async (payload) => {
      try {
        await axios.put(`http://localhost:8000/products/${payload.id}`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    const deleteData = async (payload) => {
      try {
        swal('Apakah anda ingin menghapus ?', {
          icon: 'warning',
          buttons: {
            cancel: 'Batal',
            confirm: 'Hapus'
          }
        }).then(async (bayar) => {
          if (bayar) {
            await axios.delete(`http://localhost:8000/products/${payload.id}`).then(() => {
              setCatalog('products')
            })
            let deletedItem = catalog.value.data.find((item) => item.id === payload.id)
            if (deletedItem) {
              const index = catalog.value.data.indexOf(deletedItem)
              catalog.value.splice(index, 1)
            }
          } else {
            swal('batal')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    const getDetailProduct = async (productId) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/products/detail/${productId.params.productId}`
        )
        product.value = response.data.data
      } catch (error) {
        console.log(error)
      }
    }

    const searchDataProduct = async (payload) => {
      try {
        const response = await axios.get(`http://localhost:8000/products/search?keyword=${payload}`)
        catalog.value = response.data.data
      } catch (error) {
        console.log(error)
      }
    }

    return {
      catalog,
      category,
      product,
      setCategory,
      updateProduct,
      getPriceProduct,
      getDetailProduct,
      setCatalog,
      setCatalogByCategory,
      searchDataProduct,
      deleteData
    }
  },
  {
    persist: true
  }
)
