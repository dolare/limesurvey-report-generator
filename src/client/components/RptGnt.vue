<template>
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
    <div class='col-lg-6'>
      <button class='btn btn-block btn-success' @click="generateFormBrowser" >generateFormBrowser!</button>
    </div>
    <div class='col-lg-6'>
      <button class='btn btn-block btn-success' @click="generateFormServer" >generateFormServer!</button>
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
</template>

<script>
import Babyparse from 'babyparse'
import filesaver from 'file-saver'
import Jspdf from 'jspdf'

export default {
  data () {
    return {
      fileName: 'Upload CSV File',
      fileinput: '',
      tableData: ''
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
      this.$http.post('/pdf').then(response => {
        this.sources = response.data
        console.log(this.sources)
        var blob = new Blob([this.sources], {type: 'application/pdf'})
        filesaver.saveAs(blob, 'AwesomePDF')
      })
    },
    generateFormBrowser: function() {
      var doc = new Jspdf()
      doc.text('hello world!', 10, 10)
      doc.save('output.pdf')
    }
  },
  watch: {
    fileinput: function(value) {
      this.tableData = value.data
      console.log(this.tableData)
    }
  }
}
</script>

<style scoped>
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
