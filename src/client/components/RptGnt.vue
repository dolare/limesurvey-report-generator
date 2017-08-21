<template>
  <div>
    <div class='row'>
      <h1 class="text-center push-30-t">Report Generator</h1>
      <div class='col-lg-5 col-lg-offset-1'>
        <label class='btn btn-block btn-default'>
          <i class='fa fa-superpowers' aria-hidden='true'></i>
          <input type='file' @change='onFileChange'>
          {{ fileName }}
        </label>
      </div>
      <div class='col-lg-5'>
        <button class='btn btn-block btn-success' :disabled="tableData == ''">Generate!</button>
      </div>
      <div class='col-lg-4'>
        <button class='btn btn-block btn-success' @click="downloadFormServer" >downloadFormServer!</button>
      </div>
      <div class='col-lg-4'>
        <button class='btn btn-block btn-success' @click="generateFormServer" >generateFormServer!</button>
      </div>
      <div class='col-lg-4'>
        <button class='btn btn-block btn-success' @click="getChart">report chart generate</button>
      </div>
      <div class='col-lg-12 table-ctn' v-if="tableData !== ''">
        <table class="table table-bordered table-hover table-striped table-header-bg">
          <thead>
            <tr>
              <th class="text-center">First Name</th>
              <th class="text-center">Last Name</th>
              <th class="text-center">Email</th>
              <th class="text-center">Attribute 1</th>
              <th class="text-center">Attribute 2</th>
              <th class="text-center">Attribute 3</th>
              <th class="text-center">Attribute 4</th>
              <th class="text-center">Attribute 5</th>
              <th class="text-center">Attribute 6</th>
              <th class="text-center">Attribute 7</th>
              <th class="text-center">Attribute 8</th>
              <th class="text-center">Attribute 9</th>
              <th class="text-center">Attribute 10</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rowData in tableData">
              <td class="text-center">{{ rowData.firstname }}</td>
              <td class="text-center">{{ rowData.lastname }}</td>
              <td class="text-center">{{ rowData.email }}</td>
              <td class="text-center">{{ rowData.attribute_1 }}</td>
              <td class="text-center">{{ rowData.attribute_2 }}</td>
              <td class="text-center">{{ rowData.attribute_3 }}</td>
              <td class="text-center">{{ rowData.attribute_4 }}</td>
              <td class="text-center">{{ rowData.attribute_5 }}</td>
              <td class="text-center">{{ rowData.attribute_6 }}</td>
              <td class="text-center">{{ rowData.attribute_7 }}</td>
              <td class="text-center">{{ rowData.attribute_8 }}</td>
              <td class="text-center">{{ rowData.attribute_9 }}</td>
              <td class="text-center">{{ rowData.attribute_10 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="echarts" ref="myEchart">

    </div>
  </div>
</template>

<script>
import Babyparse from 'babyparse'
import Jspdf from 'jspdf'
import echarts from 'echarts'

export default {
  data () {
    return {
      fileName: 'Upload CSV File',
      fileinput: '',
      tableData: '',
      dataURL: '',
      chart: null
    }
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.fileName = files[0].name
      this.createInput(files[0])
    },
    createInput(file) {
      var reader = new FileReader()
      var vm = this
      reader.onload = (e) => {
        vm.fileinput = Babyparse.parse(reader.result, { header: true })
      }
      reader.readAsText(file)
    },
    generateFormServer: function() {
      this.$http.post('/pdf/generate').then(response => {
        console.log('download ' + response.data)
        console.log('')
      })
    },
    downloadFormServer: function() {
      window.open('/pdf/download')
    },
    generateFormBrowser: function() {
      var doc = new Jspdf()
      doc.text('hello world!', 10, 10)
      doc.save('output.pdf')
    },
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart)
      this.chart.setOption({
        title: {
          text: 'ECharts Hello World'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011']
        },
        grid: {
          left: '%3',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: [1, 2, 3, 4, 5, 6]
        },
        series: [{
          name: '2011',
          type: 'bar',
          data: [5000, 23220, 43236, 54310, 12350, 20521],
          markLine: {
            data: [{name: 'abc', value: '100%', yAxis: 1, xAxis: 40000}, {yAxis: 6, xAxis: 40000}]
          }
        }]
      })
    },
    loadDataURL: function() {
      this.dataURL = this.chart.getDataURL()
      console.log(1)
      console.log(this.chart)
      console.log(this.dataURL)
    },
    getChart: function() {
      this.initChart()
      this.loadDataURL()
      this.$http.post('/pdf/chart', {data: this.dataURL}).then(response => {
        console.log('download ' + response.data)
        console.log('')
      })
    }
  },
  watch: {
    fileinput: function(value) {
      this.tableData = value.data
      this.tableData.pop()
      console.log(this.tableData)
    }
  }
}
</script>

<style scoped>
  .echarts{
    height:400px;
    width:600px;
  }
  div.row {
    margin: 0 0;
    height: 100%;
  }

  label {
    position: relative;
    margin: 20px auto;
  }

  button {
    margin: 20px auto;
  }

  input {
    position: absolute;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  div.table-ctn {
    padding: 0 0;
    overflow-x: auto;
    overflow-y: auto;
  }

</style>
