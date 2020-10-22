<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  data() {
    return {
      datacollection: {
        labels: ['True 64%', 'False 36%'],
        datasets: [
          {
            label: ['Option 1', 'Option 2'],
            backgroundColor: ['blue', 'orange'],
            borderAlign: 'center',
            borderWidth: 3,
            borderColor: 'white',
            hoverBorderColor: 'grey',
            hoverBorderWidth: 4,
            data: [245, 137],
          },
        ],
      },
      options: {
        cutoutPercentage: 30,
      },
    };
  },
  mounted() {
    this.renderChart(this.datacollection, this.options);
  },
};
</script>
