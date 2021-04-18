<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  data () {
    return {
      options: {
        cutoutPercentage: 30,
        rotation: 1 * Math.PI,
        animation: {
          animateScale: true
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
