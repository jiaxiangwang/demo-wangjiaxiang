import testA from './src/index.vue'

testA.install = function (Vue) {
  Vue.component(testA.name, testA)
}
export default testA
