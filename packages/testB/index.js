import testB from './src/index.vue'

testB.install = function (Vue) {
  Vue.component(testB.name, testB)
}
export default testB
