<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  data() {
    return {
      datacollection: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
          {
            label: ['Summary'],
            barPercentage: 0.8,
            backgroundColor: ['orange', 'blue', 'green', 'red', 'purple'],
            data: [2.5, 3, 2, 1, 4, 0],
          },
        ],
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              offsetGridLines: true,
            },
          }],
        },
        maintainAspectRatio: false,
        responsive: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.datacollection, this.options);
  },
};
</script>
