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
        <button class='btn btn-block btn-info' :disabled="tableData == ''">Generate!</button>
      </div>
      <div class='col-lg-12 table-ctn' v-if="tableData !== ''">
        <table class="table table-bordered table-hover table-striped table-header-bg">
          <thead>
            <tr>
              <th class="text-center">First Name</th>
              <th class="text-center">Last Name</th>
              <th class="text-center">Email</th>
              <th class="text-center">cid</th>
              <th class="text-center">province</th>
              <th class="text-center">city</th>
              <th class="text-center">region</th>
              <th class="text-center">school</th>
              <th class="text-center">ts</th>
              <th class="text-center">gender</th>
              <th class="text-center">nation</th>
              <th class="text-center">id</th>
              <th class="text-center">ct</th>
              <th class="text-center">dowoload report</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rowData, index) in tableData">
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
              <td class="text-center"><button class="btn btn-info" @click="download(index)">Download</button></td>
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
import _ from 'underscore'

export default {
  data () {
    return {
      fileName: 'Upload CSV File',
      fileinput: '',
      tableData: '',
      dataURL: '',
      chart: null,
      answer: {

      }
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
          text: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          axisTick: {show: false},
          axisLabel: {
            textStyle: {
              fontSize: 18,
              color: '#000'
            }
          },
          data: ['压力应对', '角色定位', '群体管理策略', '情绪成熟度', '情绪调控', '重要他人', '理性自我认知', '主体意识引导策略']
        },
        series: [{
          name: '',
          type: 'bar',
          barWidth: 30,
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#000',
                fontSize: 16
              },
              formatter: function(data) {
                return data.data.toFixed(2) * 100 + '%'
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#3498db'
            },
            emphasis: '#2980b9'
          },
          markLine: {
            symbolSize: '',
            label: {
              normal: {
                show: true,
                formatter: '100%'
              }
            },
            lineStyle: {
              normal: {
                color: '#e74c3c',
                width: 3,
                type: 'solid'
              }
            },
            data: [{
              name: 'Y 轴值为 100 的水平线',
              xAxis: 1
            }]
          },
          data: [this.answer.A / 5, this.answer.B / 3, this.answer.C / 5, this.answer.D / 3, this.answer.E / 4, this.answer.F / 4, this.answer.G / 3, this.answer.H / 5]
        }]
      })
    },
    loadDataURL: function() {
      this.dataURL = this.chart.getDataURL()
      console.log(1)
      console.log(this.chart)
      console.log(this.dataURL)
    },
    download: function(index) {
      var answer = this.answer
      answer.A = 0
      answer.B = 0
      answer.C = 0
      answer.D = 0
      answer.E = 0
      answer.F = 0
      answer.G = 0
      answer.H = 0

      var info = {}
      info.name = this.tableData[index].lastname + this.tableData[index].firstname
      info.school = this.tableData[index].attribute_5
      info.id = this.tableData[index].id
      info.email = this.tableData[index].email
      info.time = this.tableData[index].interviewtime

      _.each(this.tableData[index], function(res) {
        if (res === 'A') {
          answer.A++
        }
        if (res === 'B') {
          answer.B++
        }
        if (res === 'C') {
          answer.C++
        }
        if (res === 'D') {
          answer.D++
        }
        if (res === 'E') {
          answer.E++
        }
        if (res === 'F') {
          answer.F++
        }
        if (res === 'G') {
          answer.G++
        }
        if (res === 'H') {
          answer.H++
        }
      })
      this.answer = answer
      this.initChart()
      this.loadDataURL()
      console.log(this.tableData[index])
      this.$http.post('/pdf/chart', {data: {
        dataURL: this.dataURL,
        answer: answer
      }
      }).then(response => {
        console.log('generate chart ')
        this.$http.post('/pdf/generate', {
          userInfo: info,
          answer: this.answer
        }).then(response => {
          console.log('generate pdf ')
          window.open('/pdf/download/' + info.email)
        })
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
    height:600px;
    width:800px;
    margin:auto;
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
